import { randomUUID } from 'node:crypto';
import type { IInventoryRepository } from './IInventoryRepository.js';
import type { Inventory } from './inventory.types.js';

// Datos de prueba hasta tener base de datos real
const SEED_DATA: Inventory = [
  {
    id: randomUUID(),
    name: 'Matematicas',
    image: './images/category/maths.jpg',
    books: [
      {
        id: randomUUID(),
        name: 'Calculo diferencial 1',
        author: 'James Stewart',
        isAvailable: true,
      },
      {
        id: randomUUID(),
        name: 'Algebra lineal',
        author: 'Gilbert Strang',
        isAvailable: false,
      },
    ],
  },
  {
    id: randomUUID(),
    name: 'Ciencia ficcion',
    image: './images/category/sci-fi.jpg',
    books: [
      {
        id: randomUUID(),
        name: 'Maze Runner 1',
        author: 'James Dashner',
        isAvailable: true,
      },
    ],
  },
];

export class InMemoryInventoryRepository implements IInventoryRepository {
  async findAll(): Promise<Inventory> {
    return SEED_DATA;
  }
}
