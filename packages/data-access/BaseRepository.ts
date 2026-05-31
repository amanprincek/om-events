import { ID } from "@om-tent/core-types";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export abstract class BaseRepository<T extends { id: ID }> {
  protected collection: T[];

  constructor(initialData: T[]) {
    this.collection = [...initialData];
  }

  async getAll(): Promise<T[]> {
    await delay(300);
    return [...this.collection];
  }

  async getById(id: ID): Promise<T | undefined> {
    await delay(200);
    return this.collection.find(item => item.id === id);
  }

  async create(data: Omit<T, "id">): Promise<T> {
    await delay(400);
    const newItem = {
      ...data,
      id: Math.random().toString(36).substring(7),
    } as T;
    this.collection.push(newItem);
    return newItem;
  }

  async update(id: ID, data: Partial<T>): Promise<T | undefined> {
    await delay(400);
    const index = this.collection.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    
    this.collection[index] = { ...this.collection[index], ...data };
    return this.collection[index];
  }

  async delete(id: ID): Promise<boolean> {
    await delay(400);
    const initialLength = this.collection.length;
    this.collection = this.collection.filter(item => item.id !== id);
    return this.collection.length < initialLength;
  }
}
