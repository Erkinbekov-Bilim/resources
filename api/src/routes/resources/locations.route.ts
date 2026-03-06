import express from 'express';
import type { Request, Response, Router } from 'express';
import mysqlDb from '../../config/mysqlDb.js';
import type { IItemLocation } from '../../types/resources/resources.types.js';

const itemLocationsRouter: Router = express.Router();

itemLocationsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM item_locations');
    const itemLocations = result as IItemLocation[];

    return res.json(itemLocations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

itemLocationsRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'SELECT * FROM item_locations WHERE id = ?',
      [id],
    );
    const itemLocation = result as IItemLocation[];

    if (itemLocation.length === 0) {
      return res.status(404).json({ error: 'Item location not found' });
    }

    return res.json(...itemLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

itemLocationsRouter.post('/', async (req: Request, res: Response) => {
  const data: IItemLocation = req.body;

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'INSERT INTO item_locations (name, description) VALUES (?, ?)',
      [data.name, data.description],
    );

    const resultHeader = result as { insertId: number };

    const [createdItemLocation] = await connection.query(
      'SELECT * FROM item_locations WHERE id = ?',
      [resultHeader.insertId],
    );

    const itemLocation = createdItemLocation as IItemLocation[];

    return res.json(...itemLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

itemLocationsRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: IItemLocation = req.body;

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'UPDATE item_locations SET name = ?, description = ? WHERE id = ?',
      [data.name, data.description, id],
    );

    const resultHeader = result as { affectedRows: number };

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({ error: 'Item location not found' });
    }

    const [updatedItemLocation] = await connection.query(
      'SELECT * FROM item_locations WHERE id = ?',
      [id],
    );

    const itemLocation = updatedItemLocation as IItemLocation[];

    return res.json(...itemLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

itemLocationsRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    await connection.query('DELETE FROM item_locations WHERE id = ?', [id]);
    return res.json({ message: 'Item location deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default itemLocationsRouter;
