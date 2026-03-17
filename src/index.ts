import BookLoan from './BookLoan.js';
import FileConfiguration from './FileConfiguration.js';
import { ConsoleErrorReporter } from './lib/errorReporter/index.js';

const config = new FileConfiguration('./config.json');
const errorReporter = new ConsoleErrorReporter();

/* eslint-disable no-console */
config.load()
  .then(() => {
    const app = new BookLoan(config, {}, errorReporter);

    return app.start();
  })
  .then(() => {
    console.log(`Server is running in ${config.getHost()}:${config.getPort()}...`);
  });
