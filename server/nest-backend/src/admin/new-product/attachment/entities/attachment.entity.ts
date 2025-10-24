import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Attachment {
  @PrimaryColumn({ name: 'prod_id' })
  prodId: number;

  @PrimaryColumn({ type: 'text' })
  src: string;


  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_text: string | null;


  @ManyToOne(() => Product, product => product.attachments, { onUpdate: 'CASCADE'})
  @JoinColumn({ name: 'prod_id' })
  @Exclude()
  product: Product;
}
