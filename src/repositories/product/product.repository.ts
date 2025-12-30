import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";

export class ProductRepository {
	private prisma: PrismaClient;

	constructor(prismaClient?: PrismaClient) {
		this.prisma = prismaClient || new PrismaClient();
	}

	/**
	 * Create a new product
	 * @param data - Product data to create
	 * @returns Created product
	 */
	async create(
		data: Omit<Product, "id" | "createdAt" | "updatedAt">,
	): Promise<Product> {
		return this.prisma.product.create({
			data,
		});
	}

	/**
	 * Get product by ID
	 * @param id - Product ID
	 * @returns Product or null if not found
	 */
	async findById(id: string): Promise<Product | null> {
		return this.prisma.product.findUnique({
			where: { id },
		});
	}

	/**
	 * Get all products with optional filtering and pagination
	 * @param skip - Number of records to skip
	 * @param take - Number of records to take
	 * @param where - Optional filtering conditions
	 * @returns Array of products
	 */
	async findAll(
		skip?: number,
		take?: number,
		where?: Record<string, unknown>,
	): Promise<Product[]> {
		return this.prisma.product.findMany({
			skip,
			take,
			where,
			orderBy: { createdAt: "desc" },
		});
	}

	/**
	 * Find products by name (case-insensitive)
	 * @param name - Product name to search for
	 * @returns Array of matching products
	 */
	async findByName(name: string): Promise<Product[]> {
		return this.prisma.product.findMany({
			where: {
				name: {
					contains: name,
					mode: "insensitive",
				},
			},
		});
	}

	/**
	 * Update a product
	 * @param id - Product ID
	 * @param data - Data to update
	 * @returns Updated product
	 */
	async update(
		id: string,
		data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>,
	): Promise<Product> {
		return this.prisma.product.update({
			where: { id },
			data,
		});
	}

	/**
	 * Delete a product
	 * @param id - Product ID
	 * @returns Deleted product
	 */
	async delete(id: string): Promise<Product> {
		return this.prisma.product.delete({
			where: { id },
		});
	}

	/**
	 * Delete multiple products
	 * @param ids - Array of product IDs
	 * @returns Count of deleted products
	 */
	async deleteMany(ids: string[]): Promise<number> {
		const result = await this.prisma.product.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
		return result.count;
	}

	/**
	 * Count total products
	 * @param where - Optional filtering conditions
	 * @returns Total count
	 */
	async count(where?: Record<string, unknown>): Promise<number> {
		return this.prisma.product.count({ where });
	}

	/**
	 * Check if product exists
	 * @param id - Product ID
	 * @returns True if product exists
	 */
	async exists(id: string): Promise<boolean> {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: { id: true },
		});
		return !!product;
	}

	/**
	 * Get paginated products with total count
	 * @param page - Page number (1-indexed)
	 * @param pageSize - Number of items per page
	 * @param where - Optional filtering conditions
	 * @returns Products and total count
	 */
	async findPaginated(
		page = 1,
		pageSize = 10,
		where?: Record<string, unknown>,
	): Promise<{
		data: Product[];
		total: number;
		page: number;
		pageSize: number;
	}> {
		const skip = (page - 1) * pageSize;
		const [data, total] = await Promise.all([
			this.prisma.product.findMany({
				skip,
				take: pageSize,
				where,
				orderBy: { createdAt: "desc" },
			}),
			this.prisma.product.count({ where }),
		]);

		return { data, total, page, pageSize };
	}
}
