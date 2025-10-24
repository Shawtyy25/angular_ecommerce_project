

export class CreateProductDto {
  name: string;
  description?: string;
  price: {price: number, validFrom: Date, validTo?: Date | null};
  attachments?: { src: string, alt_text?: string | null }[];
  categoryId: number;
}
