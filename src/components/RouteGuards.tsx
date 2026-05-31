import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole, Permission } from '../context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-slate-midnight)]">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[var(--color-brand)] animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save redirected location so that it redirects back post login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface RequireRoleProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children }) => {
  const { user, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-slate-midnight)]">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[var(--color-brand)] animate-spin"></div>
      </div>
    );
  }

  if (!user || !hasRole(allowedRoles)) {
    // If user is Staff but attempts Admin route, direct them back safely to the mobile Staff app
    if (user?.role === UserRole.STAFF) {
      return <Navigate to="/staff" replace />;
    }
    // If unpermitted admin/viewer or others, direct to primary home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
