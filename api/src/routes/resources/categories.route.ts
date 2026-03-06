import express from 'express';
import type { Request, Response, Router } from 'express';
import type {
  ICategory,
  ICategoryWithoutId,
} from '../../types/resources/resources.types.js';
import mysqlDb from '../../config/mysqlDb.js';
import type { Connection, QueryResult, ResultSetHeader } from 'mysql2/promise';

const categoriesRouter: Router = express.Router();

categoriesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const connection: Connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM categories');
    const categories = result as ICategory[];

    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

categoriesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'SELECT * FROM categories WHERE id = ?',
      [id],
    );
    const category = result as ICategory[];

    if (category.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(...category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

categoriesRouter.put('/:id', async (req: Request, res: Response, next) => {
  const { id } = req.params;
  const data: ICategory = req.body;

  if (!data.name || data.name.trim().length === 0) {
    return res.status(400).json({
      error: 'name is required',
    });
  }

  try {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [data.name, data.description, id],
    );

    const resultHeader: any = result as { affectedRows: number };

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const [updatedCategory] = await connection.query(
      'SELECT * FROM categories WHERE id = ?',
      [id],
    );

    const category = updatedCategory as ICategory[];

    if (category.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(...category);
  } catch (error) {
    const errorErrno = error as { errno: number };

    if (errorErrno.errno === 1452) {
      return res.status(400).json({ error: 'category or location not found' });
    }

    next(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

categoriesRouter.post('/', async (req: Request, res: Response) => {
  const data: ICategory = req.body;

  if (!data.name || data.name.trim().length === 0) {
    return res.status(400).json({
      error: 'name is required',
    });
  }

  const newCategory: ICategoryWithoutId = {
    name: data.name,
    description: data.description || null,
  };

  try {
    const connection = await mysqlDb.getConnection();

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [newCategory.name, newCategory.description],
    );

    const resultHeader = result as { insertId: number };

    const [createdCategory] = await connection.query<QueryResult>(
      'SELECT * FROM categories WHERE id = ?',
      [resultHeader.insertId],
    );

    const category = createdCategory as ICategory[];

    return res.json(...category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

categoriesRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const connection = await mysqlDb.getConnection();
    await connection.query('DELETE FROM categories WHERE id = ?', [id]);
    return res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default categoriesRouter;
