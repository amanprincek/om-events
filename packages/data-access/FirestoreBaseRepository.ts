import { ID } from "@om-tent/core-types";
import { db, handleFirestoreError, OperationType } from "../../src/lib/firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

export abstract class FirestoreBaseRepository<T extends { id: ID }> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(): Promise<T[]> {
    try {
      const colRef = collection(db, this.collectionName);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as T));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, this.collectionName);
      return [];
    }
  }

  async getById(id: ID): Promise<T | undefined> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return undefined;
      return {
        ...snapshot.data(),
        id: snapshot.id
      } as T;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${this.collectionName}/${id}`);
      return undefined;
    }
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const newId = (data as any).id || Math.random().toString(36).substring(7);
    const newItem = {
      ...data,
      id: newId
    } as unknown as T;

    try {
      const docRef = doc(db, this.collectionName, newId);
      await setDoc(docRef, data);
      return newItem;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${this.collectionName}/${newId}`);
      throw error;
    }
  }

  async update(id: ID, data: Partial<T>): Promise<T | undefined> {
    try {
      const docRef = doc(db, this.collectionName, id);
      
      // Strip out the ID if present in the data to avoid updating the document ID field
      const { id: _, ...updateData } = data as any;
      await updateDoc(docRef, updateData);
      
      const updatedSnap = await getDoc(docRef);
      return {
        ...updatedSnap.data(),
        id: updatedSnap.id
      } as T;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${this.collectionName}/${id}`);
      return undefined;
    }
  }

  async delete(id: ID): Promise<boolean> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${this.collectionName}/${id}`);
      return false;
    }
  }
}
