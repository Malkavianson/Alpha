import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { StockMovement, StockBalance } from "@prisma/client";

@Injectable()
export class StockRepository {
	constructor(private readonly prisma: PrismaService) {}

	/* =======================
	   STOCK BALANCE
	======================= */

	async getBalanceBySku(skuId: string): Promise<StockBalance | null> {
		return this.prisma.stockBalance.findUnique({
			where: { skuId },
		});
	}

	async createBalance(
		data: Omit<StockBalance, "id" | "createdAt" | "updatedAt">,
	): Promise<StockBalance> {
		return this.prisma.stockBalance.create({
			data,
		});
	}

	async updateBalance(
		skuId: string,
		quantity: number,
	): Promise<StockBalance> {
		return this.prisma.stockBalance.update({
			where: { skuId },
			data: { quantity },
		});
	}

	/* =======================
	   STOCK MOVEMENT
	======================= */

	async createMovement(
		data: Omit<StockMovement, "id" | "createdAt">,
	): Promise<StockMovement> {
		return this.prisma.stockMovement.create({
			data,
		});
	}

	async findMovementsBySku(skuId: string): Promise<StockMovement[]> {
		return this.prisma.stockMovement.findMany({
			where: { skuId },
			orderBy: { createdAt: "desc" },
		});
	}
}
