import express from 'express';
import type { Request, Response, Router } from 'express';

const itemLocationsRouter: Router = express.Router();

itemLocationsRouter.get('/', async (req: Request, res: Response) => {
  return res.json('ItemLocations');
});

export default itemLocationsRouter;
