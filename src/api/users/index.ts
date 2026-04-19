import { Router } from 'express';

import create from './create.js';
import loginUser from './login.js';

const router = Router();

router.post('/', create);
router.post('/login', loginUser);

export default router;
