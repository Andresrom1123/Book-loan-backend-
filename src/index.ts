import BookLoan from './BookLoan.js';
import FileConfiguration from './FileConfiguration.js';
import MemoryDatabase from './database/memory/MemoryDatabase.js';

import { ConsoleErrorReporter } from './lib/errorReporter/index.js';

const config = new FileConfiguration('./config.json');
const database = new MemoryDatabase();
const errorReporter = new ConsoleErrorReporter();

/* eslint-disable no-console */
config.load()
  .then(() => {
    const app = new BookLoan(config, database, errorReporter);

    return app.start();
  })
  .then(() => {
    console.log(`Server is running in ${config.getHost()}:${config.getPort()}...`);
  });
