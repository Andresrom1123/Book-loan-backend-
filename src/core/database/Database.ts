import TokensRepository from './TokensRepository.js';
import UsersRepository from './UsersRepository.js';

interface Database {
  readonly tokens: TokensRepository;
  readonly users: UsersRepository;
}

export default Database;
