import express from 'express';
import type { Request, Response, Router } from 'express';
import mysqlDb from '../../config/mysqlDb.js';
import type {
  IInventory,
  IInventoryWithoutId,
} from '../../types/resources/resources.types.js';
import { imagesUpload } from '../../middlewares/multer.js';

const inventoryRouter: Router = express.Router();

inventoryRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM inventory');
    const inventory = result as IInventory[];

    return res.json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

inventoryRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'SELECT * FROM inventory WHERE id = ?',
      [id],
    );
    const inventory = result as IInventory[];

    if (inventory.length === 0) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    return res.json(inventory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

inventoryRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req: Request, res: Response, next) => {
    const data: IInventory = req.body;

    const newInventory: IInventoryWithoutId = {
      category_id: data.category_id,
      location_id: data.location_id,
      name: data.name,
      description: data.description || null,
      image: req.file ? 'images/' + req.file.filename : null,
    };

    try {
      const connection = await mysqlDb.getConnection();
      const [result] = await connection.query(
        'INSERT INTO inventory (category_id, location_id, name, description, image) VALUES (?, ?, ?, ?, ?)',
        [
          newInventory.category_id,
          newInventory.location_id,
          newInventory.name,
          newInventory.description,
          newInventory.image,
        ],
      );

      const resultHeader = result as { insertId: number };

      const [createdInventory] = await connection.query(
        'SELECT * FROM inventory WHERE id = ?',
        [resultHeader.insertId],
      );

      const inventory = createdInventory as IInventory[];

      return res.json(...inventory);
    } catch (error) {
      const errorErrno = error as { errno: number };
      if (errorErrno.errno === 1452) {
        return res
          .status(404)
          .json({ error: 'Category or location not found' });
      }

      next(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);

inventoryRouter.put(
  '/:id',
  imagesUpload.single('image'),
  async (req: Request, res: Response, next) => {
    const { id } = req.params;
    const data: IInventory = req.body;

    const newInventory: IInventoryWithoutId = {
      category_id: data.category_id,
      location_id: data.location_id,
      name: data.name,
      description: data.description || null,
      image: req.file ? 'images/' + req.file.filename : null,
    };

    try {
      const connection = await mysqlDb.getConnection();
      const [result] = await connection.query(
        'UPDATE inventory SET category_id = ?, location_id = ?, name = ?, description = ?, image = ? WHERE id = ?',
        [
          newInventory.category_id,
          newInventory.location_id,
          newInventory.name,
          newInventory.description,
          newInventory.image,
          id,
        ],
      );

      const resultHeader = result as { affectedRows: number };

      if (resultHeader.affectedRows === 0) {
        return res.status(404).json({ error: 'Inventory not found' });
      }

      const [updatedInventory] = await connection.query(
        'SELECT * FROM inventory WHERE id = ?',
        [id],
      );

      const inventory = updatedInventory as IInventory[];

      return res.json(...inventory);
    } catch (error) {
      const errorErrno = error as { errno: number };
      if (errorErrno.errno === 1452) {
        return res
          .status(404)
          .json({ error: 'Category or location not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);

inventoryRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    await connection.query('DELETE FROM inventory WHERE id = ?', [id]);
    return res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default inventoryRouter;
