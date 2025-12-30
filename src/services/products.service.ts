import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "src/core";
import { Product, User } from "./models";

@Injectable()
export class ProductsService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly stockService: StockService,
		private readonly auditService: AuditService,
	) {}

	async create(dto: CreateProductDto, user: User): Promise<Product> {
		if (dto.barcode) {
			const existing = await this.productRepository.findByBarcode(
				dto.barcode,
			);
			if (existing) {
				throw new ConflictException("Produto já cadastrado");
			}
		}

		const product = Product.create({
			name: dto.name,
			description: dto.description,
			barcode: dto.barcode,
			categoryId: dto.categoryId,
			companyId: user.companyId,
			createdBy: user.id,
		});

		const saved = await this.productRepository.save(product);

		await this.stockService.initializeStock({
			productId: saved.id,
			quantity: dto.initialQuantity ?? 0,
			userId: user.id,
		});

		await this.auditService.record({
			action: "PRODUCT_CREATE",
			entity: "Product",
			entityId: saved.id,
			after: saved,
			userId: user.id,
		});

		return saved;
	}

	async update(
		id: string,
		dto: UpdateProductDto,
		user: User,
	): Promise<Product> {
		const product = await this.productRepository.findById(id);
		if (!product) {
			throw new NotFoundException("Produto não encontrado");
		}

		const before = product.clone();

		product.update({
			name: dto.name,
			description: dto.description,
			price: dto.price,
			categoryId: dto.categoryId,
			active: dto.active,
		});

		const updated = await this.productRepository.save(product);

		await this.auditService.record({
			action: "PRODUCT_UPDATE",
			entity: "Product",
			entityId: updated.id,
			before,
			after: updated,
			userId: user.id,
		});

		return updated;
	}

	async findAll(): Promise<Product[]> {
		return this.productRepository.findAll();
	}

	async findById(id: string): Promise<Product> {
		const product = await this.productRepository.findById(id);
		if (!product) {
			throw new NotFoundException("Produto não encontrado");
		}
		return product;
	}
}
