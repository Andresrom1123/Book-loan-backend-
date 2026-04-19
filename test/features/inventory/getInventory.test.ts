import { expect } from 'chai';
import sinon from 'sinon';

import { getInventory } from '../../../src/features/inventory/getInventory.js';
import type { IInventoryRepository } from '../../../src/features/inventory/IInventoryRepository.js';
import type { Inventory } from '../../../src/features/inventory/inventory.types.js';

// Inventario falso que usaremos en las pruebas
// En lugar de usar el repositorio real, creamos datos controlados
const FAKE_INVENTORY: Inventory = [
  {
    id: 'cat-001',
    name: 'Tecnologia',
    image: './images/tech.jpg',
    books: [
      {
        id: 'book-001',
        name: 'Clean Code',
        author: 'Robert C. Martin',
        isAvailable: true,
      },
    ],
  },
];

describe('#getInventory', () => {

  it('should return the inventory from the repository', async () => {
    // 1. PREPARAR
    // Creamos un repositorio FALSO (stub) que siempre devuelve nuestros datos controlados
    // Esto es como usar un doble de acción: no necesitamos el repositorio real
    const fakeRepository: IInventoryRepository = {
      findAll: sinon.stub().resolves(FAKE_INVENTORY),
    };

    // 2. EJECUTAR
    const result = await getInventory(fakeRepository);

    // 3. VERIFICAR
    expect(result).to.deep.equal(FAKE_INVENTORY);
  });

  it('should call findAll on the repository exactly once', async () => {
    // 1. PREPARAR
    const findAllStub = sinon.stub().resolves(FAKE_INVENTORY);
    const fakeRepository: IInventoryRepository = { findAll: findAllStub };

    // 2. EJECUTAR
    await getInventory(fakeRepository);

    // 3. VERIFICAR — nos aseguramos que llamó a findAll una sola vez
    // Si getInventory llamara a findAll dos veces, sería un bug
    expect(findAllStub.calledOnce).to.be.true;
  });

  it('should propagate errors from the repository', async () => {
    // 1. PREPARAR
    // Simulamos que el repositorio falla (como si la base de datos cayera)
    const fakeRepository: IInventoryRepository = {
      findAll: sinon.stub().rejects(new Error('Database connection failed')),
    };

    // 2. EJECUTAR y VERIFICAR al mismo tiempo
    // El error del repositorio debe "subir" hasta quien llamó a getInventory
    try {
      await getInventory(fakeRepository);
      // Si llegamos aquí, la prueba falla porque esperábamos un error
      expect.fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal('Database connection failed');
    }
  });

});
