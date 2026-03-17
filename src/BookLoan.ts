import express from 'express';
import morgan from 'morgan';

import type { Application } from 'express';

import Configuration from './Configuration.js';
import Database from './core/database/Database.js';
import errorHandler from './api/middlewares/errorHandler.js';
import ErrorReporter from './lib/errorReporter/ErrorReporter.js';

class BookLoan {
  protected app: Application;

  private config: Configuration;
  private database: Database;

  constructor(
    config: Configuration,
    database: Database,
    errorReporter: ErrorReporter
  ) {
    this.config = config;
    this.database = database;

    this.app = express();

    this.app.set('database', database);
    this.app.set('errorReporter', errorReporter);

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
      this.app.listen(port, host, (error: Error) => error ? reject(error) : resolve());
    });
  }

  private initializeLogs(): void {
    this.app.use(morgan('dev'));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    //
  }

  private initializeErrorHandler(): void {
    this.app.use(errorHandler);
  }
}

export default BookLoan;
