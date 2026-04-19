import type { Request, Response } from 'express';

import { BadRequest, InternalServerError } from '../errors/index.js';
import { EmailAlreadyRegistered } from '../../core/database/errors/index.js';

import type Database from '../../core/database/Database.js';
import type { ErrorReporter } from '../../lib/errorReporter/ErrorReporter.js';

const create = async (req: Request, res: Response) => {
  const database: Database = req.app.get('database') as Database;
  const errorReporter = req.app.get('errorReporter') as ErrorReporter;

  try {
    const user = await database.users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).send(user);
  } catch (error) {
    if (error instanceof EmailAlreadyRegistered) {
      throw new BadRequest('EMAIL_ALREADY_REGISTERED');
    }

    errorReporter.send(error instanceof Error ? error : new Error(String(error)));

    throw new InternalServerError();
  }
};

export default create;
