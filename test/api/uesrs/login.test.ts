import request from 'supertest';
import sinon from 'sinon';

import { expect } from 'chai';

import MemoryDatabase from '../../../src/database/memory/MemoryDatabase.js';
import TestBookLoan from '../../TestBookLoan.js';
import User from '../../../src/core/User.js';

import { MemoryErrorReporter } from '../../../src/lib/errorReporter/index.js';
import {
  MemoryTokensRepository,
  MemoryUsersRepository
} from '../../../src/database/memory/index.js';

describe('API Login User', () => {
  let app: TestBookLoan;
  let database: MemoryDatabase;
  let errorReporter: MemoryErrorReporter;
  let user: User;

  beforeEach(async () => {
    database = new MemoryDatabase();
    errorReporter = new MemoryErrorReporter();
    app = new TestBookLoan(database, errorReporter);

    const response = await request(app.getExpressApp())
      .post('/api/v1/users')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(201);

    user = response.body;
  });

  it('should login a user successfully', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(200);

    expect(response.body).to.have.keys('token');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(response.body.token).to.be.string;
  });

  it('should create a token in the database', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(200);

    const userByToken = await database.tokens.findUserByToken(response.body.token);

    expect(user.id).to.be.equal(userByToken.id);
    expect(user.email).to.be.equal(userByToken.email);
  });

  it('should return an unauthorized error when the password is not correct', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example'
      })
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  it('should return an unauthorized error when the user does not exist', async () => {
    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example1@gmail.com',
        password: 'example123'
      })
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  afterEach(() => sinon.restore());

  it('should return an internal server error when find user fails', async () => {
    sinon.stub(MemoryUsersRepository.prototype, 'findByEmail').rejects(new Error(''));

    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(500);

    expect(response.body).to.deep.equal({ code: 'INTERNAL_SERVER_ERROR' });
  });

  it('should return an internal server error when create token fails', async () => {
    sinon.stub(MemoryTokensRepository.prototype, 'create').rejects(new Error(''));

    const response = await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(500);

    expect(response.body).to.deep.equal({ code: 'INTERNAL_SERVER_ERROR' });
  });

  it('should report an error when an unexpected error occurs', async () => {
    const expectedError = new Error('fake error');

    sinon.stub(MemoryTokensRepository.prototype, 'create').rejects(expectedError);

    await request(app.getExpressApp())
      .post('/api/v1/users/login')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer test-token')
      .send({
        email: 'example@gmail.com',
        password: 'example123'
      })
      .expect(500);

    expect(errorReporter.getErrorCount()).to.be.equal(1);
    expect(errorReporter.getLastedError()).to.be.equal(expectedError);
  });
});
