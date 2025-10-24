import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Price {
  @PrimaryColumn({ name: 'prod_id', type: 'int' })
  prodId: number;

  @PrimaryColumn({ name: 'valid_from', type: 'date' })
  validFrom: Date;

  @Column({ type: 'date', nullable: true, name: 'valid_to' })
  validTo: Date | null;

  @Column({ type: 'integer' })
  price: number;

  @ManyToOne(() => Product, product => product.prices, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'prod_id' })
  product: Product;
}
