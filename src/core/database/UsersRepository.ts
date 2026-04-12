import User from '../User.js';

interface CreateUserData {
  email: string;
  name: string;
  password: string;
}

interface UsersRepository {
  create(data: CreateUserData): Promise<User>;
  findById(id: string): Promise<User>;
}

export default UsersRepository;
export type { CreateUserData };
