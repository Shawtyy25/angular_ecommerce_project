import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, TreeRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Price } from '../price/entities/price.entity';
import { Attachment } from '../attachment/entities/attachment.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryTreeRepository: TreeRepository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    const { name, description, categoryId, price, attachments } =
      createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description ?? null;
    product.category = {  id: categoryId } as Category;

    if (price) {
      const priceBase = new Price();

      priceBase.price = price.price;
      priceBase.validFrom = price.validFrom;
      priceBase.validTo = price.validTo ?? null;

      product.prices = [priceBase];
    }

    if (attachments?.length) {
      product.attachments = attachments.map((a) => {
        const attachment = new Attachment();
        attachment.src = a.src;
        attachment.alt_text = a.alt_text ?? null;
        return attachment;
      });
    }
    const saved = await this.productRepository.save(product);

    return {
      id: saved.id,
      name: saved.name,
      description: saved.description,
      categoryId: saved.category.id,
      prices: saved.prices.map((p) => ({
        prodId: p.prodId,
        price: p.price,
        validFrom: p.validFrom,
        validTo: p.validTo,
      })),
      attachments: saved.attachments.map((a) => ({
        prodId: saved.id,
        src: a.src,
        alt_text: a.alt_text,
      })),
    };
  }

  async findAllWithCategory() {
    const products = await this.productRepository.find({
      relations: ['prices', 'attachments', 'category'],
    });


    return await Promise.all(
      products.map(async (product) => {
        const categoryTree =
          await this.categoryTreeRepository.findAncestorsTree(product.category);
        return {
          ...product,
          category: categoryTree,
          attachments: product.attachments.sort(),
        };
      }),
    );
  }

}
