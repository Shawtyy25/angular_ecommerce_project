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
