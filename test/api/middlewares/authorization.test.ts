import express from 'express';
import request from 'supertest';
import sinon from 'sinon';

import { expect } from 'chai';

import authorization from '../../../src/api/middlewares/authorization.js';
import errorHandler from '../../../src/api/middlewares/errorHandler.js';
import MemoryDatabase from '../../../src/database/memory/MemoryDatabase.js';

import { MemoryErrorReporter } from '../../../src/lib/errorReporter/index.js';
import { MemoryTokensRepository } from '../../../src/database/memory/index.js';

class TestServer {
  private app: express.Application;
  private database: MemoryDatabase;

  constructor() {
    this.database = new MemoryDatabase();
    this.app = express();

    this.app.set('database', this.database);
    this.app.set('errorReporter', new MemoryErrorReporter());

    this.app.get('/test', authorization(), (req, res) => {
      res.status(200).send(req.app.get('user'));
    });

    this.app.use(errorHandler);
  }

  getExpressApp(): express.Application {
    return this.app;
  }

  getDatabase(): MemoryDatabase {
    return this.database;
  }
}

describe('#authorization', () => {
  let server: TestServer;

  beforeEach(() => {
    server = new TestServer();
  });

  afterEach(() => sinon.restore());

  it('should call next when the token is valid', async () => {
    const user = await server.getDatabase().users.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });

    await server.getDatabase().tokens.create({ userId: user.id, token: 'valid-token' });

    const response = await request(server.getExpressApp())
      .get('/test')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body.id).to.be.equal(user.id);
    expect(response.body.email).to.be.equal(user.email);
  });

  it('should return unauthorized when there is no Authorization header', async () => {
    const response = await request(server.getExpressApp())
      .get('/test')
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  it('should return unauthorized when the Authorization header has an invalid format', async () => {
    const response = await request(server.getExpressApp())
      .get('/test')
      .set('Authorization', 'invalid-token')
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  it('should return unauthorized when the scheme is not Bearer', async () => {
    const response = await request(server.getExpressApp())
      .get('/test')
      .set('Authorization', 'Basic some-token')
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  it('should return unauthorized when the token does not exist', async () => {
    const response = await request(server.getExpressApp())
      .get('/test')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(response.body).to.deep.equal({ code: 'UNAUTHORIZED' });
  });

  it('should return an internal server error when the token lookup fails unexpectedly',
    async () => {
      sinon.stub(MemoryTokensRepository.prototype, 'findUserByToken').rejects(new Error(''));

      const response = await request(server.getExpressApp())
        .get('/test')
        .set('Authorization', 'Bearer some-token')
        .expect(500);

      expect(response.body).to.deep.equal({ code: 'INTERNAL_SERVER_ERROR' });
    });
});
