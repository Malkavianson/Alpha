import { ConflictException, Injectable } from "@nestjs/common";
import { Stock } from "src/utils";

@Injectable()
export class StockService {
	constructor(
		private readonly stockRepository: StockRepository,
		private readonly auditService: AuditService,
	) {}

	async initializeStock(params: {
		productId: string;
		quantity: number;
		userId: string;
	}) {
		const exists = await this.stockRepository.findByProductId(
			params.productId,
		);

		if (exists) {
			throw new ConflictException(
				"Estoque já inicializado para este produto",
			);
		}

		const stock = Stock.create({
			productId: params.productId,
			quantity: params.quantity,
		});

		const saved = await this.stockRepository.save(stock);

		await this.auditService.record({
			action: "STOCK_INIT",
			entity: "Stock",
			entityId: saved.id,
			after: saved,
			userId: params.userId,
		});

		return saved;
	}

	async increase(params: {
		productId: string;
		quantity: number;
		reason: string;
		userId: string;
	}) {
		const stock = await this.getStockOrFail(params.productId);
		const before = stock.clone();

		stock.increase(params.quantity);

		const updated = await this.stockRepository.save(stock);

		await this.auditService.record({
			action: "STOCK_IN",
			entity: "Stock",
			entityId: updated.id,
			before,
			after: updated,
			metadata: { reason: params.reason },
			userId: params.userId,
		});

		return updated;
	}

	async decrease(params: {
		productId: string;
		quantity: number;
		reason: string;
		userId: string;
	}) {
		const stock = await this.getStockOrFail(params.productId);
		const before = stock.clone();

		stock.decrease(params.quantity); // aqui mora a regra crítica

		const updated = await this.stockRepository.save(stock);

		await this.auditService.record({
			action: "STOCK_OUT",
			entity: "Stock",
			entityId: updated.id,
			before,
			after: updated,
			metadata: { reason: params.reason },
			userId: params.userId,
		});

		return updated;
	}

	private async getStockOrFail(productId: string): Promise<Stock> {
		const stock = await this.stockRepository.findByProductId(productId);

		if (!stock) {
			throw new NotFoundException("Estoque não encontrado");
		}

		return stock;
	}
}
