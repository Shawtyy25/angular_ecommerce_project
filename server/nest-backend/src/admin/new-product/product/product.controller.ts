import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('api/admin/')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add/product')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('get/product')
  async findAllWithCategory() {
    return this.productService.findAllWithCategory();
  }
}
