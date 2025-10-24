import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../admin/new-product/category/entities/category.entity';
import { Price } from '../admin/new-product/price/entities/price.entity';
import { Product } from '../admin/new-product/product/entities/product.entity';
import { Attachment } from '../admin/new-product/attachment/entities/attachment.entity';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CLIENT',
      useFactory: async () => {
        const client = new Client({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: `${process.env.DB_PASSWORD}`,
          port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        });
        await client.connect();
        return client;
      },
    },


  ],

  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
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
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService]
    })
  ],
  exports: ['PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}
