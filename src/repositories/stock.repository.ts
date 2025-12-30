import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { Stock } from "src/utils";

@Injectable()
export class StockRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findByProductId(productId: string): Promise<Stock | null> {
		const data = await this.prisma.stock.findUnique({
			where: { productId },
		});

		return data ? StockMapper.toDomain(data) : null;
	}

	async save(stock: Stock): Promise<Stock> {
		const data = StockMapper.toPersistence(stock);

		const saved = stock.id
			? await this.prisma.stock.update({
					where: { id: stock.id },
					data,
			  })
			: await this.prisma.stock.create({ data });

		return StockMapper.toDomain(saved);
	}
}
