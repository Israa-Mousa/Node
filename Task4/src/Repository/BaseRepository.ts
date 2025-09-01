import { IRepository } from './IRepository';

export abstract class BaseRepository<T extends { id: number }> implements IRepository<T> {
  protected data: T[] = [];

  async getAll(): Promise<T[]> {
    return this.data;
  }

  async getById(id: number): Promise<T | undefined> {
    return this.data.find(item => item.id === id);
  }

  async create(item: T): Promise<T> {
    this.data.push(item);
    return item;
  }

  async update(id: number, updates: Partial<T>): Promise<T | undefined> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    const updatedItem = { ...this.data[index], ...updates };
    this.data[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }

  async findByFilter(filter: Partial<T>): Promise<T[]> {
    return this.data.filter(item =>
      Object.keys(filter).every(key =>
        item[key as keyof T] === filter[key as keyof T]
      )
    );
  }
}
