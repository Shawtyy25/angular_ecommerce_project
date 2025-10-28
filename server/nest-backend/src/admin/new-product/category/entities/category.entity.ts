import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  icon?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Category | null;

  @TreeChildren()
  children: Category[];
}
