import Token from '../Token.js';
import User from '../User.js';

interface CreateTokenData {
  userId: string;
  token: string;
}

interface TokensRepository {
  create(data: CreateTokenData): Promise<Token>;
  findUserByToken(token: string): Promise<User>;
}

export default TokensRepository;
export type { CreateTokenData };
