import Book from '../../core/Book.js';
import Subject from '../../core/Subject.js';
import InventoryRepository, { CreateBookData } from '../../core/database/InventoryRepository.js';
import Inventory from '../../core/Inventory.js';

import AbstractRepository from './AbstracRepository.js';
import NotFound from './errors/NotFound.js';

class MemoryInventoryRepository extends AbstractRepository implements InventoryRepository {
  private inventory: Inventory;

  constructor() {
    super();
    this.inventory = new Inventory();
  }

  async create(data: CreateBookData): Promise<Book> {
    const book = new Book({
      id: this.generateUUID(),
      tittle: data.tittle,
      subject: data.subject as Subject,
      author: data.author,
      isAvaible: data.isAvaible
    });

    this.inventory.addBook(book);

    return book;
  }

  async findById(id: string): Promise<Book> {
    try {
      return this.inventory.findBook(id);
    } catch {
      throw new NotFound();
    }
  }

  async quantity(): Promise<number> {
    return this.inventory.quantity();
  }
}

export default MemoryInventoryRepository;
