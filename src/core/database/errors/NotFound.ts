import DatabaseError from './DatabaseError.js';

class NotFound extends DatabaseError {
  constructor(options?: ErrorOptions) {
    super('Not found', options);
  }
}

export default NotFound;
