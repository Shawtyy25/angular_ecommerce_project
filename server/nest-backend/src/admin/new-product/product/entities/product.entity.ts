import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Attachment } from '../../attachment/entities/attachment.entity';
import { Price } from '../../price/entities/price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Attachment, attachment => attachment.product, {cascade: true})
  attachments: Attachment[];

  @OneToMany(() => Price,  price => price.product, {cascade: true})
  prices: Price[];

}
