import DatabaseError from './DatabaseError.js';

class EmailAlreadyRegistered extends DatabaseError {
  readonly email: string;

  constructor(email: string, options?: ErrorOptions) {
    super('Email already registered', options);

    this.email = email;
  }
}

export default EmailAlreadyRegistered;
