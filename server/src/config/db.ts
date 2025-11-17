import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initModels } from '../models';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
  },
);

export const models = initModels(sequelize);
