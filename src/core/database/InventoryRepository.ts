import Book from '../Book.js';

interface CreateBookData {
  tittle: string;
  subject: string;
  author: string;
  isAvaible: boolean;
}

interface InventoryRepository {
  create(data: CreateBookData): Promise<Book>;
  findById(id: string): Promise<Book>;
  quantity(): Promise<number>;
}

export default InventoryRepository;
export type { CreateBookData };
