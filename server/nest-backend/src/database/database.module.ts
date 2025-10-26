import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../admin/new-product/category/entities/category.entity';
import { Product } from '../admin/new-product/product/entities/product.entity';
import { Price } from '../admin/new-product/price/entities/price.entity';
import { Attachment } from '../admin/new-product/attachment/entities/attachment.entity';
import * as dotenv from 'dotenv';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production'
        ? '../client.production.env'
        : '../client.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Category, Product, Price, Attachment],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'PG_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const client = new Client({
          user: configService.get<string>('DB_USER'),
          host: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT', 5432),
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}
