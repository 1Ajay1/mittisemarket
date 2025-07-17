import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities';
import { Model, Types } from 'mongoose';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dto';
import { ProductStatus } from '../enum/products.enum';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  private commonPopulation() {
    return [
      {
        path: 'farmerInfo',
        select: 'fullName',
      },
      {
        path: 'regionInfo',
        select: 'name',
      },
    ];
  }

  async create(payload: CreateProductDto): Promise<Product> {
    return this.productModel.create(payload);
  }

  async createBulk(payload: CreateProductDto[]): Promise<Product[]> {
    const processedPayload = payload.map((product) => ({
      ...product,
      farmerId: new Types.ObjectId(product.farmerId),
    }));

    const inserted = await this.productModel.insertMany(processedPayload);
    return inserted.map((doc) => doc.toObject());
  }

  async findAll(
    filter: FilterProductsDto,
    page?: number,
    limit?: number,
  ): Promise<{ data: Product[]; total: number }> {
    const queryBuilder = this.productModel.find(filter);

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).limit(limit);
    }

    const [data, total] = await Promise.all([
      queryBuilder.populate(this.commonPopulation()).lean().exec(),
      this.productModel.countDocuments(filter),
    ]);

    return { data, total };
  }

  async statusCount(): Promise<Record<ProductStatus, number>> {
    const defaultCounts = this.initializeStatusCounts();

    const aggregatedCounts = await this.productModel
      .aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    for (const { _id, count } of aggregatedCounts) {
      if (_id in defaultCounts) {
        defaultCounts[_id as ProductStatus] = count;
      }
    }
    return defaultCounts;
  }

  // Initializes all statuses with count 0
  private initializeStatusCounts(): Record<ProductStatus, number> {
    return Object.values(ProductStatus).reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<ProductStatus, number>,
    );
  }

  async findOneById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate(this.commonPopulation())
      .lean()
      .exec();
    if (!product) {
      throw new NotFoundException(`Product not found with ID ${id}`);
    }
    return product;
  }

  async findOneBySlug(slug: string): Promise<Product> {
    const product = await this.productModel
      .findOne({ slug })
      .populate(this.commonPopulation())
      .lean()
      .exec();
    if (!product) {
      throw new NotFoundException(`Product not found with slug: '${slug}'`);
    }
    return product;
  }

  async update(slug: string, payload: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ slug }, payload, { new: true })
      .lean()
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product not found with slug: ${slug}`);
    }

    return updatedProduct;
  }

  async remove(slug: string): Promise<Product> {
    const deletedProduct = await this.productModel
      .findOneAndDelete({ slug })
      .lean()
      .exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Product not found with slug: ${slug}`);
    }
    return deletedProduct;
  }
}
