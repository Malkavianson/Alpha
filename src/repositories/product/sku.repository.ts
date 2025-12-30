import { PrismaClient } from "@prisma/client";
import { Sku } from "@prisma/client";

/**
 * SkuRepository class for managing SKU (Stock Keeping Unit) operations
 * Implements CRUD operations with Prisma ORM
 * Created: 2025-12-30 14:17:03 UTC
 */
export class SkuRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	/**
	 * Create a new SKU record
	 * @param data - SKU data to create
	 * @returns Promise<Sku> - The created SKU record
	 */
	async create(
		data: Omit<Sku, "id" | "createdAt" | "updatedAt">,
	): Promise<Sku> {
		return this.prisma.sku.create({
			data: {
				...data,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
	}

	/**
	 * Read/Fetch a single SKU by ID
	 * @param id - SKU ID to fetch
	 * @returns Promise<Sku | null> - The SKU record or null if not found
	 */
	async findById(id: string): Promise<Sku | null> {
		return this.prisma.sku.findUnique({
			where: { id },
		});
	}

	/**
	 * Fetch all SKU records with optional filtering and pagination
	 * @param skip - Number of records to skip (default: 0)
	 * @param take - Number of records to take (default: 10)
	 * @param where - Optional filter conditions
	 * @returns Promise<Sku[]> - Array of SKU records
	 */
	async findAll(
		skip = 0,
		take = 10,
		where?: Record<string, unknown>,
	): Promise<Sku[]> {
		return this.prisma.sku.findMany({
			skip,
			take,
			where,
			orderBy: { createdAt: "desc" },
		});
	}

	/**
	 * Find SKU by code
	 * @param code - SKU code to search for
	 * @returns Promise<Sku | null> - The SKU record or null if not found
	 */
	async findByCode(code: string): Promise<Sku | null> {
		return this.prisma.sku.findUnique({
			where: { code },
		});
	}

	/**
	 * Update an existing SKU record
	 * @param id - SKU ID to update
	 * @param data - Partial SKU data to update
	 * @returns Promise<Sku> - The updated SKU record
	 */
	async update(
		id: string,
		data: Partial<Omit<Sku, "id" | "createdAt" | "updatedAt">>,
	): Promise<Sku> {
		return this.prisma.sku.update({
			where: { id },
			data: {
				...data,
				updatedAt: new Date(),
			},
		});
	}

	/**
	 * Delete a SKU record by ID
	 * @param id - SKU ID to delete
	 * @returns Promise<Sku> - The deleted SKU record
	 */
	async delete(id: string): Promise<Sku> {
		return this.prisma.sku.delete({
			where: { id },
		});
	}

	/**
	 * Count total number of SKU records
	 * @param where - Optional filter conditions
	 * @returns Promise<number> - Total count of SKU records
	 */
	async count(where?: Record<string, unknown>): Promise<number> {
		return this.prisma.sku.count({
			where,
		});
	}

	/**
	 * Search SKUs by name or code (case-insensitive)
	 * @param query - Search query string
	 * @param skip - Number of records to skip (default: 0)
	 * @param take - Number of records to take (default: 10)
	 * @returns Promise<Sku[]> - Array of matching SKU records
	 */
	async search(query: string, skip = 0, take = 10): Promise<Sku[]> {
		return this.prisma.sku.findMany({
			where: {
				OR: [
					{ code: { contains: query, mode: "insensitive" } },
					{ name: { contains: query, mode: "insensitive" } },
				],
			},
			skip,
			take,
			orderBy: { createdAt: "desc" },
		});
	}

	/**
	 * Bulk update multiple SKU records
	 * @param ids - Array of SKU IDs to update
	 * @param data - Partial SKU data to update
	 * @returns Promise<number> - Number of records updated
	 */
	async bulkUpdate(
		ids: string[],
		data: Partial<Omit<Sku, "id" | "createdAt" | "updatedAt">>,
	): Promise<number> {
		const result = await this.prisma.sku.updateMany({
			where: { id: { in: ids } },
			data: {
				...data,
				updatedAt: new Date(),
			},
		});
		return result.count;
	}

	/**
	 * Bulk delete multiple SKU records
	 * @param ids - Array of SKU IDs to delete
	 * @returns Promise<number> - Number of records deleted
	 */
	async bulkDelete(ids: string[]): Promise<number> {
		const result = await this.prisma.sku.deleteMany({
			where: { id: { in: ids } },
		});
		return result.count;
	}
}
