import express from 'express';
import type { Request, Response, Router } from 'express';
import type {
  ICategory,
  ICategoryWithoutId,
} from '../../types/resources/resources.types.js';
import mysqlDb from '../../config/mysqlDb.js';
import type { QueryResult, ResultSetHeader } from 'mysql2';

const categoriesRouter: Router = express.Router();

categoriesRouter.get('/', async (req: Request, res: Response) => {
  return res.json('Categories');
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

    const resultHeader: any = result as { insertId: number };

    const [createdCategory] = await connection.query<QueryResult>(
      'SELECT * FROM categories WHERE id = ?',
      [resultHeader.insertId],
    );

    const category = createdCategory as ICategory[];

    return res.json(...category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default categoriesRouter;
