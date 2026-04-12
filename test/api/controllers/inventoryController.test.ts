import express from 'express';
import request from 'supertest';
import { expect } from 'chai';

import type { Application } from 'express';

import { inventoryController } from '../../../src/api/controllers/inventoryController.js';
import errorHandler from '../../../src/api/middlewares/errorHandler.js';
import { MemoryErrorReporter } from '../../../src/lib/errorReporter/index.js';

// -----------------------------------------------------------------------
// Servidor de prueba mínimo
// Levantamos un Express pequeño solo para poder hacer peticiones HTTP
// -----------------------------------------------------------------------
function buildTestApp(): Application {
  const app = express();

  app.use(express.json());
  app.get('/api/v1/inventories', inventoryController);
  app.set('errorReporter', new MemoryErrorReporter());
  app.use(errorHandler);

  return app;
}

describe('#inventoryController', () => {
  it('should return status 200', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    expect(response.status).to.equal(200);
  });

  it('should return an array', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    expect(response.body).to.be.an('array');
  });

  it('should return categories with the correct structure', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    // Verificamos que al menos haya una categoría
    expect(response.body.length).to.be.greaterThan(0);

    const firstCategory = response.body[0];

    // Cada categoría debe tener estas propiedades
    expect(firstCategory).to.have.property('id');
    expect(firstCategory).to.have.property('name');
    expect(firstCategory).to.have.property('image');
    expect(firstCategory).to.have.property('books');
  });

  it('should return books inside the categories', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    const firstCategory = response.body[0];

    // Los libros deben ser una lista
    expect(firstCategory.books).to.be.an('array');
    expect(firstCategory.books.length).to.be.greaterThan(0);
  });

  it('should return books with the correct structure', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    const firstBook = response.body[0].books[0];

    expect(firstBook).to.have.property('id').that.is.a('string');
    expect(firstBook).to.have.property('name').that.is.a('string');
    expect(firstBook).to.have.property('author').that.is.a('string');
    expect(firstBook).to.have.property('isAvailable').that.is.a('boolean');
  });

  it('should return JSON content type', async () => {
    const app = buildTestApp();

    const response = await request(app).get('/api/v1/inventories');

    expect(response.headers['content-type']).to.include('application/json');
  });
});
