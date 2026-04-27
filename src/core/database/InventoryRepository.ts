import Book from '../Book.js';
import Inventory from '../Inventory.js';

interface AddBookData {
  id: string;
  tittle: string;
  subject: string;
  author: string;
  isAvaible: boolean;
}

interface InventoryRepository {
  addBook(data: AddBookData): Promise<Book>;
  findBook(id: string): Promise<Book>;
  quantity(): Promise<number>;
}

export default InventoryRepository;
export type { AddBookData }; 