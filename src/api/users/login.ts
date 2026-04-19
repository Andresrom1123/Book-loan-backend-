import type { Request, Response } from 'express';

import TokenGenerator from '../../lib/token/TokenGenerator.js';
import Database from '../../core/database/Database.js';
import User from '../../core/User.js';

import { ErrorReporter } from '../../lib/errorReporter/ErrorReporter.js';
import { InternalServerError, Unauthorized } from '../errors/index.js';
import { NotFound } from '../../core/database/errors/index.js';

const loginUser = async (req: Request, res: Response) => {
  const database: Database = req.app.get('database') as Database;
  const errorReporter = req.app.get('errorReporter') as ErrorReporter;
  const tokenGenerator: TokenGenerator = req.app.get('tokenGenerator');

  try {
    const user: User = await database.users.findByEmail(req.body.email);

    if (user.password !== req.body.password) {
      throw new Unauthorized();
    }

    const token = tokenGenerator.generate();

    await database.tokens.create({ userId: user.id, token });

    res
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof NotFound || error instanceof Unauthorized) {
      throw new Unauthorized();
    }

    errorReporter.send(error instanceof Error ? error : new Error(String(error)));

    throw new InternalServerError();
  }
};

export default loginUser;
