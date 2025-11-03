import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: TreeRepository<Category>,
  ) {}

  async getAllCategory() {
    return await this.categoryRepository.findTrees();
  }

  async getLeafCategories() {
    const parents = await this.categoryRepository.findRoots()
    const leaves: Category[] = [];

    for (let parent of parents) {
      const descendants = await this.categoryRepository.findDescendants(parent);
      const rootLeaves = descendants.filter(d =>
        d.id !== parent.id,
      )

      leaves.push(...rootLeaves);
    }


    return leaves;

  }

  async addNewCategory(dto: CreateCategoryDto) {
    console.log(dto);
    const category = new Category();

    category.name = dto.name;

    if (dto.icon) category.icon = dto.icon;

    if (dto.parentId) {
      const parent = await this.categoryRepository.findOneBy({ id: dto.parentId });

      if (!parent) {
        throw new NotFoundException('Parent category not found!');
      }

      category.parent = parent;
    }

    if (category) console.log('Successfully created a new category');
    return this.categoryRepository.save(category);


  }
}
