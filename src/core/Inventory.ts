import Book from './Book.js';

class Inventory {
  private books: Book[];

  constructor() {
    this.books = [];
  }

  findBook(id: string): Book {
    const book = this.books.find(b => b.id === id);

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  quantity(): number {
    return this.books.length;
  }
}

export default Inventory;