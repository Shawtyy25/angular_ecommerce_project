import { Category } from '../entities/category.entity';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  parentId?: number

  @IsOptional()
  @IsString()
  icon?: string;
}
