import type { Request, Response, NextFunction } from 'express';
import { getInventory } from '../../features/inventory/getInventory.js';
import { InMemoryInventoryRepository } from '../../features/inventory/InMemoryInventoryRepository.js';

const repository = new InMemoryInventoryRepository();

export async function inventoryController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const inventory = await getInventory(repository);
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
}
