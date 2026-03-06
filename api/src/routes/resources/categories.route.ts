import express from 'express';
import type { Request, Response, Router } from 'express';

const categoriesRouter: Router = express.Router();

categoriesRouter.get('/', async (req: Request, res: Response) => {
  return res.json('Categories');
});

export default categoriesRouter;
