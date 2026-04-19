import { Database, TokensRepository, UsersRepository } from '../../core/database/index.js';

import MemoryTokensRepository from './MemoryTokensRepository.js';
import MemoryUsersRepository from './MemoryUsersRepository.js';

class MemoryDatabase implements Database {
  readonly tokens: TokensRepository;
  readonly users: UsersRepository;

  constructor() {
    this.tokens = new MemoryTokensRepository(this);
    this.users = new MemoryUsersRepository();
  }
}

export default MemoryDatabase;
