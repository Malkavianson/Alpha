import { PrismaClient } from "@prisma/client";

/**
 * StockBalanceRepository
 * Handles database operations for StockBalance model
 */
export class StockBalanceRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	/**
	 * Create a new stock balance record
	 * @param data - Stock balance data to create
	 * @returns Created stock balance record
	 */
	async create(data: {
		stockId: string;
		quantity: number;
		reservedQuantity?: number;
		availableQuantity?: number;
		warehouseId?: string;
		lastUpdated?: Date;
	}) {
		return this.prisma.stockBalance.create({
			data: {
				stockId: data.stockId,
				quantity: data.quantity,
				reservedQuantity: data.reservedQuantity || 0,
				availableQuantity: data.availableQuantity || data.quantity,
				warehouseId: data.warehouseId,
				lastUpdated: data.lastUpdated || new Date(),
			},
		});
	}

	/**
	 * Retrieve a stock balance record by ID
	 * @param id - Stock balance ID
	 * @returns Stock balance record or null if not found
	 */
	async findById(id: string) {
		return this.prisma.stockBalance.findUnique({
			where: { id },
		});
	}

	/**
	 * Retrieve stock balance by stock ID
	 * @param stockId - Stock ID
	 * @returns Stock balance record or null if not found
	 */
	async findByStockId(stockId: string) {
		return this.prisma.stockBalance.findFirst({
			where: { stockId },
		});
	}

	/**
	 * Retrieve all stock balance records
	 * @param filters - Optional filters for query
	 * @returns Array of stock balance records
	 */
	async findAll(filters?: { warehouseId?: string; stockId?: string }) {
		return this.prisma.stockBalance.findMany({
			where: filters,
			orderBy: { lastUpdated: "desc" },
		});
	}

	/**
	 * Update a stock balance record
	 * @param id - Stock balance ID
	 * @param data - Partial data to update
	 * @returns Updated stock balance record
	 */
	async update(
		id: string,
		data: {
			quantity?: number;
			reservedQuantity?: number;
			availableQuantity?: number;
			warehouseId?: string;
			lastUpdated?: Date;
		},
	) {
		return this.prisma.stockBalance.update({
			where: { id },
			data: {
				...data,
				lastUpdated: data.lastUpdated || new Date(),
			},
		});
	}

	/**
	 * Delete a stock balance record
	 * @param id - Stock balance ID
	 * @returns Deleted stock balance record
	 */
	async delete(id: string) {
		return this.prisma.stockBalance.delete({
			where: { id },
		});
	}

	/**
	 * Check if stock balance exists
	 * @param id - Stock balance ID
	 * @returns Boolean indicating existence
	 */
	async exists(id: string): Promise<boolean> {
		const record = await this.prisma.stockBalance.findUnique({
			where: { id },
			select: { id: true },
		});
		return !!record;
	}

	/**
	 * Update quantity for a stock balance
	 * @param id - Stock balance ID
	 * @param quantity - New quantity
	 * @returns Updated stock balance record
	 */
	async updateQuantity(id: string, quantity: number) {
		return this.prisma.stockBalance.update({
			where: { id },
			data: {
				quantity,
				availableQuantity: quantity,
				lastUpdated: new Date(),
			},
		});
	}

	/**
	 * Reserve quantity from available stock
	 * @param id - Stock balance ID
	 * @param reserveQuantity - Quantity to reserve
	 * @returns Updated stock balance record
	 */
	async reserveQuantity(id: string, reserveQuantity: number) {
		const current = await this.findById(id);
		if (!current) {
			throw new Error(`StockBalance with ID ${id} not found`);
		}

		const availableQuantity = Math.max(
			0,
			current.availableQuantity - reserveQuantity,
		);
		const reservedQuantity = current.reservedQuantity + reserveQuantity;

		return this.prisma.stockBalance.update({
			where: { id },
			data: {
				reservedQuantity,
				availableQuantity,
				lastUpdated: new Date(),
			},
		});
	}

	/**
	 * Release reserved quantity back to available
	 * @param id - Stock balance ID
	 * @param releaseQuantity - Quantity to release
	 * @returns Updated stock balance record
	 */
	async releaseQuantity(id: string, releaseQuantity: number) {
		const current = await this.findById(id);
		if (!current) {
			throw new Error(`StockBalance with ID ${id} not found`);
		}

		const reservedQuantity = Math.max(
			0,
			current.reservedQuantity - releaseQuantity,
		);
		const availableQuantity = current.availableQuantity + releaseQuantity;

		return this.prisma.stockBalance.update({
			where: { id },
			data: {
				reservedQuantity,
				availableQuantity,
				lastUpdated: new Date(),
			},
		});
	}

	/**
	 * Get total stock quantity across all warehouses for a specific stock
	 * @param stockId - Stock ID
	 * @returns Total quantity
	 */
	async getTotalQuantity(stockId: string): Promise<number> {
		const result = await this.prisma.stockBalance.aggregate({
			where: { stockId },
			_sum: { quantity: true },
		});
		return result._sum.quantity || 0;
	}

	/**
	 * Get available quantity for a stock (considering reservations)
	 * @param stockId - Stock ID
	 * @returns Total available quantity
	 */
	async getAvailableQuantity(stockId: string): Promise<number> {
		const result = await this.prisma.stockBalance.aggregate({
			where: { stockId },
			_sum: { availableQuantity: true },
		});
		return result._sum.availableQuantity || 0;
	}
}
