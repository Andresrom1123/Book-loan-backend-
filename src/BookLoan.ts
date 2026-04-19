import express from 'express';
import morgan from 'morgan';

import type { Application } from 'express';

import Configuration from './Configuration.js';
import Database from './core/database/Database.js';
import errorHandler from './api/middlewares/errorHandler.js';
import SimpleTokenGenerator from './lib/token/SimpleTokenGenerator.js';

import usersAPI from './api/users/index.js';

import type { ErrorReporter } from './lib/errorReporter/ErrorReporter.js';

class BookLoan {
  protected app: Application;

  private config: Configuration;

  constructor(
    config: Configuration,
    database: Database,
    errorReporter: ErrorReporter
  ) {
    this.config = config;

    this.app = express();

    const simpleTokenGenerator = new SimpleTokenGenerator(32);

    this.app.set('database', database);
    this.app.set('errorReporter', errorReporter);
    this.app.set('tokenGenerator', simpleTokenGenerator);

    this.initializeLogs();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  getExpressApp(): Application {
    return this.app;
  }

  async start(): Promise<void> {
    const port = this.config.getPort();
    const host = this.config.getHost();

    return new Promise((resolve, reject) => {
      const server = this.app.listen(port, host, () => resolve());

      server.on('error', reject);
    });
  }

  protected initializeLogs(): void {
    this.app.use(morgan('dev'));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/api/v1/users', usersAPI);
  }

  private initializeErrorHandler(): void {
    this.app.use(errorHandler);
  }
}

export default BookLoan;
