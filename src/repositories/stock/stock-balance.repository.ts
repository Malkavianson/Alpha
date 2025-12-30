import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { StockBalance } from "@prisma/client";

@Injectable()
export class StockBalanceRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findBySkuId(skuId: string): Promise<StockBalance | null> {
		return this.prisma.stockBalance.findUnique({
			where: { skuId },
		});
	}

	async create(
		data: Omit<StockBalance, "id" | "createdAt" | "updatedAt">,
	): Promise<StockBalance> {
		return this.prisma.stockBalance.create({
			data,
		});
	}

	async update(skuId: string, quantity: number): Promise<StockBalance> {
		return this.prisma.stockBalance.update({
			where: { skuId },
			data: { quantity },
		});
	}

	async exists(skuId: string): Promise<boolean> {
		const balance = await this.prisma.stockBalance.findUnique({
			where: { skuId },
			select: { skuId: true },
		});
		return !!balance;
	}
}
