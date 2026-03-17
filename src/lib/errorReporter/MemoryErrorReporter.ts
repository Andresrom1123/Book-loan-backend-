import type { ErrorReporter } from './ErrorReporter.js';

class MemoryErrorReporter implements ErrorReporter {
  private errors: Error[] = [];

  send(error: Error): void {
    this.errors.push(error);
  }

  getError(index: number): Error {
    if (this.errors.length === 0) {
      throw new Error('There are no errors');
    }

    if (index >= this.errors.length) {
      throw new Error('Error index out of range');
    }

    return this.errors[index];
  }

  getLastedError(): Error {
    if (this.errors.length === 0) {
      throw new Error('There are no errors');
    }

    return this.errors[this.errors.length - 1];
  }

  getErrorCount(): number {
    return this.errors.length;
  }
}

export default MemoryErrorReporter;
