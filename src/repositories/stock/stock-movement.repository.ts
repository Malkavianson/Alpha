import { PrismaClient } from "@prisma/client";
import { StockMovement, Prisma } from "@prisma/client";

/**
 * StockMovementRepository
 * Handles all CRUD operations for the StockMovement model
 */
export class StockMovementRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	/**
	 * Create a new stock movement record
	 * @param data - StockMovement data to create
	 * @returns Created StockMovement record
	 */
	async create(
		data: Prisma.StockMovementCreateInput,
	): Promise<StockMovement> {
		return this.prisma.stockMovement.create({
			data,
		});
	}

	/**
	 * Retrieve a stock movement record by ID
	 * @param id - Stock movement ID
	 * @returns StockMovement record or null if not found
	 */
	async findById(id: string): Promise<StockMovement | null> {
		return this.prisma.stockMovement.findUnique({
			where: { id },
		});
	}

	/**
	 * Retrieve all stock movement records
	 * @param args - Optional query arguments (skip, take, where, orderBy, etc.)
	 * @returns Array of StockMovement records
	 */
	async findAll(
		args?: Prisma.StockMovementFindManyArgs,
	): Promise<StockMovement[]> {
		return this.prisma.stockMovement.findMany(args);
	}

	/**
	 * Retrieve stock movement records with filters
	 * @param where - Filter conditions
	 * @returns Array of StockMovement records matching the filter
	 */
	async findWhere(
		where: Prisma.StockMovementWhereInput,
	): Promise<StockMovement[]> {
		return this.prisma.stockMovement.findMany({
			where,
		});
	}

	/**
	 * Update a stock movement record
	 * @param id - Stock movement ID
	 * @param data - Data to update
	 * @returns Updated StockMovement record
	 */
	async update(
		id: string,
		data: Prisma.StockMovementUpdateInput,
	): Promise<StockMovement> {
		return this.prisma.stockMovement.update({
			where: { id },
			data,
		});
	}

	/**
	 * Update multiple stock movement records
	 * @param where - Filter conditions
	 * @param data - Data to update
	 * @returns Object with count of updated records
	 */
	async updateMany(
		where: Prisma.StockMovementWhereInput,
		data: Prisma.StockMovementUpdateInput,
	): Promise<Prisma.BatchPayload> {
		return this.prisma.stockMovement.updateMany({
			where,
			data,
		});
	}

	/**
	 * Delete a stock movement record
	 * @param id - Stock movement ID
	 * @returns Deleted StockMovement record
	 */
	async delete(id: string): Promise<StockMovement> {
		return this.prisma.stockMovement.delete({
			where: { id },
		});
	}

	/**
	 * Delete multiple stock movement records
	 * @param where - Filter conditions
	 * @returns Object with count of deleted records
	 */
	async deleteMany(
		where: Prisma.StockMovementWhereInput,
	): Promise<Prisma.BatchPayload> {
		return this.prisma.stockMovement.deleteMany({
			where,
		});
	}

	/**
	 * Count stock movement records
	 * @param where - Optional filter conditions
	 * @returns Count of matching records
	 */
	async count(where?: Prisma.StockMovementWhereInput): Promise<number> {
		return this.prisma.stockMovement.count({
			where,
		});
	}

	/**
	 * Find first stock movement record matching criteria
	 * @param args - Query arguments (where, orderBy, etc.)
	 * @returns First matching StockMovement record or null
	 */
	async findFirst(
		args?: Prisma.StockMovementFindFirstArgs,
	): Promise<StockMovement | null> {
		return this.prisma.stockMovement.findFirst(args);
	}

	/**
	 * Perform a raw query on stock movements
	 * @param query - Prisma raw query
	 * @returns Query results
	 */
	async raw(query: string): Promise<any> {
		return this.prisma.$queryRawUnsafe(query);
	}
}
