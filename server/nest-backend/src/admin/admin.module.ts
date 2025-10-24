import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from '../database/database.module';
import { AttachmentModule } from './new-product/attachment/attachment.module';
import { PriceModule } from './new-product/price/price.module';
import { CategoryModule } from './new-product/category/category.module';
import { ProductModule } from './new-product/product/product.module';


@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [DatabaseModule, ProductModule, CategoryModule, PriceModule, AttachmentModule],
})
export class AdminModule {}
