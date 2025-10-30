import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/admin/category/get')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    return await this.categoryService.getAllCategory();
  }

  @Get('leaf')
  async getLeafCategories() {
    return await this.categoryService.getLeafCategories();
  }


}
