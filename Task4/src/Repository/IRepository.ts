export interface IRepository<T extends { id: number }> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | undefined>;
  create(item: T): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
  findByFilter(filter: Partial<T>): Promise<T[]>;
}
