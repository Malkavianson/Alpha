import { Injectable } from "@nestjs/common";
import { PrismaService, Product } from "src/services";

@Injectable()
export class ProductRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Product | null> {
		const data = await this.prisma.product.findUnique({ where: { id } });
		return data ? ProductMapper.toDomain(data) : null;
	}

	async findByBarcode(barcode: string): Promise<Product | null> {
		const data = await this.prisma.product.findUniqueOrThrow({
			where: { barcode },
		});
		return data ? ProductMapper.toDomain(data) : null;
	}

	async save(product: Product): Promise<Product> {
		const data = ProductMapper.toPersistence(product);

		const saved = product.id
			? await this.prisma.product.update({
					where: { id: product.id },
					data,
			  })
			: await this.prisma.product.create({ data });

		return ProductMapper.toDomain(saved);
	}

	async findAll(): Promise<Product[]> {
		const list = await this.prisma.product.findMany();
		return list.map(ProductMapper.toDomain);
	}
}
