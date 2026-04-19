import User from '../../core/User.js';
import UsersRepository from '../../core/database/UsersRepository.js';

import { CreateUserData } from '../../core/database/UsersRepository.js';

import AbstractRepository from './AbstracRepository.js';
import EmailAlreadyRegistered from '../../core/database/errors/EmailAlreadyRegistered.js';
import NotFound from '../../core/database/errors/NotFound.js';

class MemoryUsersRepository extends AbstractRepository implements UsersRepository {
  private users: Map<string, User>;

  constructor() {
    super();
    this.users = new Map();
  }

  async create(data: CreateUserData): Promise<User> {
    const existing = Array.from(this.users.values()).find((user) => user.email === data.email);

    if (existing) {
      throw new EmailAlreadyRegistered(data.email);
    }

    const user = new User({
      id: this.generateUUID(),
      name: data.name,
      email: data.email,
      password: data.password
    });

    this.users.set(user.id, user);

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = Array.from(this.users.values()).find((user) => user.email === email);

    if (!user) {
      throw new NotFound();
    }

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });
  }

  async findById(id: string): Promise<User> {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFound();
    }

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default MemoryUsersRepository;
