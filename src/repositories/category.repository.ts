import { PrismaClient } from "@prisma/client";
import type { Category, Prisma } from "@prisma/client";

export class CategoryRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	/**
	 * Create a new category
	 * @param data - Category data to create
	 * @returns Created category
	 */
	async create(data: Prisma.CategoryCreateInput): Promise<Category> {
		return this.prisma.category.create({
			data,
		});
	}

	/**
	 * Find a category by ID
	 * @param id - Category ID
	 * @returns Category if found, null otherwise
	 */
	async findById(id: string): Promise<Category | null> {
		return this.prisma.category.findUnique({
			where: { id },
		});
	}

	/**
	 * Find a category by name
	 * @param name - Category name
	 * @returns Category if found, null otherwise
	 */
	async findByName(name: string): Promise<Category | null> {
		return this.prisma.category.findUnique({
			where: { name },
		});
	}

	/**
	 * Find all categories with optional filtering and pagination
	 * @param options - Query options (skip, take, orderBy, where)
	 * @returns Array of categories
	 */
	async findAll(options?: Prisma.CategoryFindManyArgs): Promise<Category[]> {
		return this.prisma.category.findMany(options);
	}

	/**
	 * Count total categories
	 * @param where - Optional where clause for filtering
	 * @returns Total count of categories
	 */
	async count(where?: Prisma.CategoryWhereInput): Promise<number> {
		return this.prisma.category.count({
			where,
		});
	}

	/**
	 * Update a category by ID
	 * @param id - Category ID
	 * @param data - Data to update
	 * @returns Updated category
	 */
	async update(
		id: string,
		data: Prisma.CategoryUpdateInput,
	): Promise<Category> {
		return this.prisma.category.update({
			where: { id },
			data,
		});
	}

	/**
	 * Update multiple categories matching a condition
	 * @param where - Where clause to match categories
	 * @param data - Data to update
	 * @returns Result of the update operation
	 */
	async updateMany(
		where: Prisma.CategoryWhereInput,
		data: Prisma.CategoryUpdateInput,
	): Promise<Prisma.BatchPayload> {
		return this.prisma.category.updateMany({
			where,
			data,
		});
	}

	/**
	 * Delete a category by ID
	 * @param id - Category ID
	 * @returns Deleted category
	 */
	async delete(id: string): Promise<Category> {
		return this.prisma.category.delete({
			where: { id },
		});
	}

	/**
	 * Delete multiple categories matching a condition
	 * @param where - Where clause to match categories
	 * @returns Result of the delete operation
	 */
	async deleteMany(
		where: Prisma.CategoryWhereInput,
	): Promise<Prisma.BatchPayload> {
		return this.prisma.category.deleteMany({
			where,
		});
	}

	/**
	 * Check if a category exists
	 * @param where - Where clause to match category
	 * @returns true if category exists, false otherwise
	 */
	async exists(where: Prisma.CategoryWhereInput): Promise<boolean> {
		const count = await this.prisma.category.count({
			where,
		});
		return count > 0;
	}

	/**
	 * Find and count categories with pagination
	 * @param options - Query options (skip, take, orderBy, where)
	 * @returns Object containing categories array and total count
	 */
	async findAndCount(
		options?: Prisma.CategoryFindManyArgs,
	): Promise<{ data: Category[]; count: number }> {
		const [data, count] = await Promise.all([
			this.prisma.category.findMany(options),
			this.prisma.category.count({
				where: options?.where,
			}),
		]);
		return { data, count };
	}
}
