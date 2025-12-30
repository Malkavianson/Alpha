import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../repositories/product/product.repository";
import { AuditRepository } from "../repositories/audit/audit.repository";
import { Product } from "@prisma/client";

@Injectable()
export class ProductsService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly auditRepository: AuditRepository,
	) {}

	async create(data: Partial<Product>, userId: string): Promise<Product> {
		const product = await this.productRepository.save(data as Product);

		await this.auditRepository.save({
			action: "CREATE",
			entity: "Product",
			entityId: product.id,
			userId,
			after: JSON.stringify(product),
		});

		return product;
	}

	async update(
		id: string,
		data: Partial<Product>,
		userId: string,
	): Promise<Product> {
		const before = await this.productRepository.findById(id);

		if (!before) {
			throw new NotFoundException("Product not found");
		}

		const updated = await this.productRepository.save({
			...before,
			...data,
		});

		await this.auditRepository.save({
			action: "UPDATE",
			entity: "Product",
			entityId: id,
			userId,
			before: JSON.stringify(before),
			after: JSON.stringify(updated),
		});

		return updated;
	}

	async findById(id: string): Promise<Product> {
		const product = await this.productRepository.findById(id);

		if (!product) {
			throw new NotFoundException("Product not found");
		}

		return product;
	}

	async list(): Promise<Product[]> {
		return this.productRepository.findAll();
	}
}
