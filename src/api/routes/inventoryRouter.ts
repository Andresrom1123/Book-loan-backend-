import { Router } from 'express';
import { inventoryController } from '../controllers/inventoryController.js';

const inventoryRouter = Router();

inventoryRouter.get('/', inventoryController);

export default inventoryRouter;
