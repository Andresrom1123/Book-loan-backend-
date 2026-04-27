import TokensRepository from './TokensRepository.js';
import UsersRepository from './UsersRepository.js';
import InventoryRepository from './InventoryRepository.js';

interface Database {
  readonly tokens: TokensRepository;
  readonly users: UsersRepository;
  readonly inventory: InventoryRepository;
}

export default Database;
