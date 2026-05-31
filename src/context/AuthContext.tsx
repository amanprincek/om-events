import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export enum UserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF',
  VIEWER = 'VIEWER',
}

export type Permission =
  | 'VIEW_DASHBOARD'
  | 'MANAGE_INVENTORY'
  | 'MANAGE_BOOKINGS'
  | 'PROCESS_LOGISTICS'
  | 'PERFORM_MAINTENANCE'
  | 'ACCESS_STAFF_APP';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (roles: UserRole[]) => boolean;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define permissions for each role
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.OWNER]: [
    'VIEW_DASHBOARD',
    'MANAGE_INVENTORY',
    'MANAGE_BOOKINGS',
    'PROCESS_LOGISTICS',
    'PERFORM_MAINTENANCE',
    'ACCESS_STAFF_APP',
  ],
  [UserRole.MANAGER]: [
    'VIEW_DASHBOARD',
    'MANAGE_INVENTORY',
    'MANAGE_BOOKINGS',
    'PROCESS_LOGISTICS',
    'PERFORM_MAINTENANCE',
  ],
  [UserRole.STAFF]: [
    'ACCESS_STAFF_APP',
    'PROCESS_LOGISTICS',
  ],
  [UserRole.VIEWER]: [
    'VIEW_DASHBOARD',
  ],
};

// Preset mock users for offline simulation fallback
const MOCK_USERS: Record<string, { user: User; pass: string }> = {
  'owner@omtent.com': {
    user: {
      id: 'usr_owner_1',
      name: 'Pawan K.',
      email: 'owner@omtent.com',
      role: UserRole.OWNER,
      phone: '+91 98765 43210',
    },
    pass: 'admin123',
  },
  'manager@omtent.com': {
    user: {
      id: 'usr_manager_1',
      name: 'Aarav Sharma',
      email: 'manager@omtent.com',
      role: UserRole.MANAGER,
      phone: '+91 87654 32109',
    },
    pass: 'admin123',
  },
  'staff@omtent.com': {
    user: {
      id: 'usr_staff_1',
      name: 'Rohan Mishr',
      email: 'staff@omtent.com',
      role: UserRole.STAFF,
      phone: '+91 76543 21098',
    },
    pass: 'admin123',
  },
  'viewer@omtent.com': {
    user: {
      id: 'usr_viewer_1',
      name: 'VIP Client',
      email: 'viewer@omtent.com',
      role: UserRole.VIEWER,
      phone: '+91 65432 10987',
    },
    pass: 'admin123',
  },
};

const isFirestoreMode = () => {
  const useFirebase = (typeof import.meta !== 'undefined' && (import.meta as any).env && ((import.meta as any).env.VITE_USE_FIREBASE === 'true' || (import.meta as any).env.PROD)) || false;
  return useFirebase;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load session or attach modern Firebase Auth state listener
  useEffect(() => {
    let unsubscribe = () => {};

    const initializeAuth = async () => {
      if (isFirestoreMode()) {
        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const email = firebaseUser.email || '';
              const staffRef = doc(db, 'staff', firebaseUser.uid);
              const staffSnap = await getDoc(staffRef);

              let role = UserRole.VIEWER;
              if (email.includes('owner')) role = UserRole.OWNER;
              else if (email.includes('manager')) role = UserRole.MANAGER;
              else if (email.includes('staff')) role = UserRole.STAFF;

              let userData: User;
              if (staffSnap.exists()) {
                const currentStaff = staffSnap.data();
                userData = {
                  id: firebaseUser.uid,
                  name: currentStaff.name || firebaseUser.displayName || 'Staff Member',
                  email,
                  role: (currentStaff.role as UserRole) || role,
                  phone: currentStaff.phone || undefined,
                };
              } else {
                userData = {
                  id: firebaseUser.uid,
                  name: firebaseUser.displayName || email.split('@')[0] || 'Guest',
                  email,
                  role,
                };
              }

              setUser(userData);
              localStorage.setItem('om_tent_auth_user', JSON.stringify(userData));
            } catch (authError) {
              console.error('Failed to parse active firebase staff profile:', authError);
              setUser(null);
            }
          } else {
            setUser(null);
            localStorage.removeItem('om_tent_auth_user');
          }
          setIsLoading(false);
        });
      } else {
        // Offline Mock Fallback
        try {
          const storedUser = localStorage.getItem('om_tent_auth_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } catch (e) {
          console.error('Failed to parse active user session:', e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (isFirestoreMode()) {
      try {
        let userCred;
        try {
          userCred = await signInWithEmailAndPassword(auth, email, password);
        } catch (signInError: any) {
          throw signInError;
        }

        const firebaseUser = userCred.user;
        let role = UserRole.VIEWER;
        let name = email.split('@')[0];
        name = name.charAt(0).toUpperCase() + name.slice(1);

        if (email.includes('owner')) role = UserRole.OWNER;
        else if (email.includes('manager')) role = UserRole.MANAGER;
        else if (email.includes('staff')) role = UserRole.STAFF;

        const staffRef = doc(db, 'staff', firebaseUser.uid);
        const staffSnap = await getDoc(staffRef);

        let userData: User;
        if (!staffSnap.exists()) {
          const newStaff = {
            id: firebaseUser.uid,
            branchId: 'branch_delhi_main',
            name,
            phone: '+91 99999 88888',
            role,
            isActive: true,
          };
          await setDoc(staffRef, newStaff);
          userData = {
            id: firebaseUser.uid,
            name: newStaff.name,
            email,
            role: newStaff.role as UserRole,
            phone: newStaff.phone,
          };
        } else {
          const currentStaff = staffSnap.data();
          userData = {
            id: firebaseUser.uid,
            name: currentStaff.name || name,
            email,
            role: (currentStaff.role as UserRole) || role,
            phone: currentStaff.phone,
          };
        }

        setUser(userData);
        localStorage.setItem('om_tent_auth_user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } catch (e: any) {
        console.error('Firebase Auth Exception:', e);
        setError(e.message || 'Authentication attempt failed');
        setIsLoading(false);
        return false;
      }
    } else {
      // Mock Data Login
      await new Promise((resolve) => setTimeout(resolve, 800));
      const lowercaseEmail = email.toLowerCase().trim();
      const mockRecord = MOCK_USERS[lowercaseEmail];

      if (mockRecord && mockRecord.pass === password) {
        setUser(mockRecord.user);
        localStorage.setItem('om_tent_auth_user', JSON.stringify(mockRecord.user));
        setIsLoading(false);
        return true;
      }

      setError('Invalid email address or passcode. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    if (isFirestoreMode()) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Failed to log out of Firebase Auth:', e);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    setUser(null);
    localStorage.removeItem('om_tent_auth_user');
    setIsLoading(false);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(permission);
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        hasPermission,
        hasRole,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be invoked within an AuthProvider wrapper.');
  }
  return context;
};
