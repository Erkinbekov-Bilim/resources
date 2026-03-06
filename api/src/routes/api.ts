import { Router } from 'express';
import categoriesRouter from './resources/categories.route.js';
import inventoryRouter from './resources/inventory.route.js';
import itemLocationsRouter from './resources/itemLocations.route.js';

const apiRouter: Router = Router();

apiRouter.use('/inventory', inventoryRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/itemLocations', itemLocationsRouter);

export default apiRouter;
