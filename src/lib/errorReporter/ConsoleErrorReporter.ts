import type { ErrorReporter } from './ErrorReporter.js';

/* eslint-disable no-console */
class ConsoleErrorReporter implements ErrorReporter {
  send(error: Error): void {
    console.error(error);
  }
}

export default ConsoleErrorReporter;
