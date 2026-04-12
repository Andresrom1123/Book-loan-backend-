import type { IInventoryRepository } from './IInventoryRepository.js';
import type { Inventory } from './inventory.types.js';

export async function getInventory(repository: IInventoryRepository): Promise<Inventory> {
  return repository.findAll();
}
