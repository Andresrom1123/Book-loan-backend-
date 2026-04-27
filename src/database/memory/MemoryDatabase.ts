import { Database, TokensRepository, UsersRepository, InventoryRepository } from '../../core/database/index.js';

import MemoryTokensRepository from './MemoryTokensRepository.js';
import MemoryUsersRepository from './MemoryUsersRepository.js';
import MemoryInventoryRepository from './MemoryInventoryRepository.js';

class MemoryDatabase implements Database {
  readonly tokens: TokensRepository;
  readonly users: UsersRepository;
  readonly inventory: InventoryRepository;

  constructor() {
    this.tokens = new MemoryTokensRepository(this);
    this.users = new MemoryUsersRepository();
    this.inventory = new MemoryInventoryRepository();
  }
}

export default MemoryDatabase;
