import BookLoan from '../src/BookLoan.js';
import TestConfiguration from './TestConfiguration.js';

import type { Database } from '../src/core/database/index.js';
import type { ErrorReporter } from '../src/lib/errorReporter/index.js';

class TestBookLoan extends BookLoan {
  constructor(database: Database, errorReporter: ErrorReporter) {
    super(new TestConfiguration(), database, errorReporter);
  }

  protected initializeLogs(): void {
    // Override and do nothing so logs are disabled in test server
  }
}

export default TestBookLoan;
