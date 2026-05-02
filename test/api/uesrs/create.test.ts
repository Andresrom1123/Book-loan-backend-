import request from 'supertest';
import sinon from 'sinon';

import { expect } from 'chai';

import MemoryDatabase from '../../../src/database/memory/MemoryDatabase.js';
import TestBookLoan from '../../TestBookLoan.js';

import { MemoryErrorReporter } from '../../../src/lib/errorReporter/index.js';
import { MemoryUsersRepository } from '../../../src/database/memory/index.js';

describe('API Create User', () => {
  let app: TestBookLoan;
  let database: MemoryDatabase;
  let errorReporter: MemoryErrorReporter;

  beforeEach(() => {
    database = new MemoryDatabase();
    errorReporter = new MemoryErrorReporter();
    app = new TestBookLoan(database, errorReporter);
  });

  afterEach(() => sinon.restore());

  it('should create a user successfully', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(201);

    expect(response.body).to.have.keys('id', 'name', 'email', 'password');
    expect(response.body.name).to.be.equal('John Doe');
    expect(response.body.email).to.be.equal('john@example.com');
  });

  it('should save the user in the database', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(201);

    const userInDatabase = await database.users.findById(response.body.id);

    expect(userInDatabase.id).to.be.equal(response.body.id);
    expect(userInDatabase.email).to.be.equal('john@example.com');
  });

  it('should return a bad request error when the email is already registered', async () => {
    await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(201);

    const response = await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(400);

    expect(response.body).to.deep.equal({ code: 'EMAIL_ALREADY_REGISTERED' });
  });

  it('should return an internal server error when create user fails', async () => {
    sinon.stub(MemoryUsersRepository.prototype, 'create').rejects(new Error(''));

    const response = await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(500);

    expect(response.body).to.deep.equal({ code: 'INTERNAL_SERVER_ERROR' });
  });

  it('should report an error when an unexpected error occurs', async () => {
    const expectedError = new Error('fake error');

    sinon.stub(MemoryUsersRepository.prototype, 'create').rejects(expectedError);

    await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(500);

    expect(errorReporter.getErrorCount()).to.be.equal(1);
    expect(errorReporter.getLastedError()).to.be.equal(expectedError);
  });
});
