/*
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../admin/new-product/category/entities/category.entity';
import { Product } from '../admin/new-product/product/entities/product.entity';
import { Price } from '../admin/new-product/price/entities/price.entity';
import { Attachment } from '../admin/new-product/attachment/entities/attachment.entity';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from '../main/user/entities/user.entity';

const envFile = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, '../../../client.production.env')
  : path.resolve(__dirname, '../../../client.development.env');

dotenv.config({ path: envFile, override: true });


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || process.env.DB_HOST,
        port: Number(configService.get<number>('DB_PORT') || process.env.DB_PORT || 5432),
        username: configService.get<string>('DB_USER') || process.env.DB_USER,
        password: String(configService.get<string>('DB_PASSWORD') || process.env.DB_PASSWORD),
        database: configService.get<string>('DB_NAME') || process.env.DB_NAME,
        entities: [Category, Product, Price, Attachment, User],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
*/




import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../admin/new-product/category/entities/category.entity';
import { Product } from '../admin/new-product/product/entities/product.entity';
import { Price } from '../admin/new-product/price/entities/price.entity';
import { Attachment } from '../admin/new-product/attachment/entities/attachment.entity';
import { User } from '../main/user/entities/user.entity';
import * as path from 'path';

const envFilePath = path.resolve(__dirname, '../../../client.env');


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
          username: configService.get<string>('DB_USER', 'postgres'),
          password: String(configService.get<string>('DB_PASSWORD', '')),
          database: configService.get<string>('DB_NAME'),
          entities: [Category, Product, Price, Attachment, User],
          synchronize: false,
        };

        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
