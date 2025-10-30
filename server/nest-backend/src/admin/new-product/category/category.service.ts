import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, TreeRepository } from 'typeorm';

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
}
