import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Category } from './admin/new-product/category/entities/category.entity';
import { Product } from './admin/new-product/product/entities/product.entity';
import { Price } from './admin/new-product/price/entities/price.entity';
import { Attachment } from './admin/new-product/attachment/entities/attachment.entity';

const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!) | 5433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Product, Price, Attachment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
})