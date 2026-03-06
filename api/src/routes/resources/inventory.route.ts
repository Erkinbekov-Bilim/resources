import express from 'express';
import type { Request, Response, Router } from 'express';

const inventoryRouter: Router = express.Router();

inventoryRouter.get('/', async (req: Request, res: Response) => {
  return res.json('Inventory');
});

export default inventoryRouter;
