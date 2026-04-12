import { expect } from 'chai';
import { InMemoryInventoryRepository } from '../../../src/features/inventory/InMemoryInventoryRepository.js';

// describe() agrupa pruebas relacionadas bajo un mismo nombre
describe('#InMemoryInventoryRepository', () => {

  // "it" es una prueba individual. La descripción dice qué se espera que ocurra.
  it('should return a list of categories', async () => {
    // 1. PREPARAR — crear el repositorio
    const repository = new InMemoryInventoryRepository();

    // 2. EJECUTAR — pedirle todos los libros
    const inventory = await repository.findAll();

    // 3. VERIFICAR — debe devolver un array (lista)
    expect(inventory).to.be.an('array');
  });

  it('should return at least one category', async () => {
    const repository = new InMemoryInventoryRepository();

    const inventory = await repository.findAll();

    // La lista no debe estar vacía
    expect(inventory.length).to.be.greaterThan(0);
  });

  it('should return categories with the correct structure', async () => {
    const repository = new InMemoryInventoryRepository();

    const inventory = await repository.findAll();
    const firstCategory = inventory[0];

    // Cada categoría debe tener estas propiedades
    expect(firstCategory).to.have.property('id');
    expect(firstCategory).to.have.property('name');
    expect(firstCategory).to.have.property('image');
    expect(firstCategory).to.have.property('books');
  });

  it('should return books inside each category', async () => {
    const repository = new InMemoryInventoryRepository();

    const inventory = await repository.findAll();
    const firstCategory = inventory[0];

    // La primera categoría debe tener libros
    expect(firstCategory.books).to.be.an('array');
    expect(firstCategory.books.length).to.be.greaterThan(0);
  });

  it('should return books with the correct structure', async () => {
    const repository = new InMemoryInventoryRepository();

    const inventory = await repository.findAll();
    const firstBook = inventory[0].books[0];

    // Cada libro debe tener estas propiedades con sus tipos correctos
    expect(firstBook).to.have.property('id').that.is.a('string');
    expect(firstBook).to.have.property('name').that.is.a('string');
    expect(firstBook).to.have.property('author').that.is.a('string');
    expect(firstBook).to.have.property('isAvailable').that.is.a('boolean');
  });

});
