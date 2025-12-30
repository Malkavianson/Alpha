import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService, Product } from "src/services";

@Injectable()
export class ProductRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<Product | null> {
		return this.prisma.product.findUnique({
			where: { id },
		});
	}

	async findByBarcode(barcode: string): Promise<Product | null> {
		return this.prisma.product.findUnique({
			where: { barcode },
		});
	}

	async create(data: Prisma.ProductCreateInput): Promise<Product> {
		return this.prisma.product.create({ data });
	}

	async update(
		id: string,
		data: Prisma.ProductUpdateInput,
	): Promise<Product> {
		return this.prisma.product.update({
			where: { id },
			data,
		});
	}

	async findAll(): Promise<Product[]> {
		return this.prisma.product.findMany();
	}
}
