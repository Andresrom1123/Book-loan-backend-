import Subject from './Subject.js';

interface BookData {
  id: string;
  tittle: string;
  subject: Subject;
  author: string;
  isAvaible: boolean;
}

class Book {
  readonly id: string;
  readonly tittle: string;
  readonly subject: Subject;
  readonly author: string;
  private _isAvaible: boolean;

  constructor(data: BookData) {
    this.id = data.id;
    this.tittle = data.tittle;
    this.subject = data.subject;
    this.author = data.author;
    this._isAvaible = data.isAvaible;
  }

  get isAvaible(): boolean {
    return this._isAvaible;
  }

  changeAvaiable(): void {
    this._isAvaible = !this._isAvaible;
  }
}

export default Book;
export type { BookData };