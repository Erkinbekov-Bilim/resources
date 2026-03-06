import mysql, { type Connection } from 'mysql2/promise';

let connection: Connection;

const mysqlDb = {
  async init() {
    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: process.env.DB_PASSWORD || '',
      database: 'resources',
    });
  },
  async getConnection() {
    return connection;
  },
};

export default mysqlDb;
