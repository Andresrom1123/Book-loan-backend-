export interface Book {
  id: string;
  name: string;
  author: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  books: Book[];
}

export type Inventory = Category[];
