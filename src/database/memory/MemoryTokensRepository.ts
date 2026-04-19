import TokensRepository, { CreateTokenData } from '../../core/database/TokensRepository.js';
import Token from '../../core/Token.js';
import User from '../../core/User.js';

import type { Database } from '../../core/database/index.js';

import AbstractRepository from './AbstracRepository.js';

import { NotFound } from '../../core/database/errors/index.js';

class MemoryTokensRepository extends AbstractRepository implements TokensRepository {
  private tokens = new Map<string, Token>();
  private database: Database;

  constructor(database: Database) {
    super();

    this.database = database;
  }

  async create(data: CreateTokenData): Promise<Token> {
    const newToken = new Token({
      id: this.generateUUID(),
      userId: data.userId,
      token: data.token,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.tokens.set(data.token, newToken);

    return new Token({
      id: newToken.id,
      userId: newToken.userId,
      token: newToken.token,
      createdAt: newToken.createdAt,
      updatedAt: newToken.updatedAt
    });
  }

  async findUserByToken(token: string): Promise<User> {
    const foundToken = this.tokens.get(token);

    if (!foundToken) {
      throw new NotFound();
    }

    const user = await this.database.users.findById(foundToken.userId);

    return new User({
      id: foundToken.userId,
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default MemoryTokensRepository;
