import type { Request, Response, NextFunction } from 'express';

import Database from '../../core/database/Database.js';

import { InternalServerError, Unauthorized } from '../errors/index.js';
import { NotFound } from '../../core/database/errors/index.js';

const authorization = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const database = req.app.get('database') as Database;
    const header = req.headers['authorization'] as string;

    if (!header) {
      throw new Unauthorized();
    }

    const parts = header.split(' ');

    if (parts.length !== 2) {
      throw new Unauthorized();
    }

    if (parts[0] !== 'Bearer') {
      throw new Unauthorized();
    }

    try {
      const user = await database.tokens.findUserByToken(parts[1]);

      req.app.set('user', user);
    } catch (error) {
      if (error instanceof NotFound) {
        throw new Unauthorized();
      }

      throw new InternalServerError();
    }

    next();
  };
};

export default authorization;
