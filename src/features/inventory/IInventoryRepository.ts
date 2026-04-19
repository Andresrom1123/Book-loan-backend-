import type { Inventory } from './inventory.types.js';

export interface IInventoryRepository {
  findAll(): Promise<Inventory>;
}
