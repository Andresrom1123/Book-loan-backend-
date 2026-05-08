import { expect } from 'chai';

import Inventory from '../src/core/Inventory.js';
import Book from '../src/core/Book.js';
import Subject from '../src/core/Subject.js';

function makeBook(id: string): Book {
  return new Book({
    id,
    tittle: 'Algebra',
    subject: Subject.Math,
    author: 'Juan',
    isAvaible: true
  });
}

describe('#Inventory', () => {
  it('should start with zero books', () => {
    const inventory = new Inventory();

    expect(inventory.quantity()).to.be.equal(0);
  });

  it('should add a book and reflect it in quantity', () => {
    const inventory = new Inventory();

    inventory.addBook(makeBook('1'));

    expect(inventory.quantity()).to.be.equal(1);
  });

  it('should find a book by id', () => {
    const inventory = new Inventory();
    const book = makeBook('1');

    inventory.addBook(book);

    expect(inventory.findBook('1')).to.be.equal(book);
  });

  it('should throw an error when the book does not exist', () => {
    const inventory = new Inventory();

    expect(() => inventory.findBook('999')).to.throw();
  });
});