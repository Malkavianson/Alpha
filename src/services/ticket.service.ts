import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./models";

@Injectable()
export class TicketService {
	constructor(
		private readonly ticketRepository: TicketRepository,
		private readonly productRepository: ProductRepository,
		private readonly stockService: StockService,
		private readonly auditService: AuditService,
	) {}

	async consumeProduct(barcode: string, user: User) {
		const product = await this.productRepository.findByBarcode(barcode);
		if (!product) {
			throw new NotFoundException("Produto não encontrado");
		}

		await this.stockService.decrease({
			productId: product.id,
			quantity: 1,
			reason: "TICKET_CONSUME",
			userId: user.id,
		});

		await this.auditService.record({
			action: "TICKET_CONSUME",
			entity: "Product",
			entityId: product.id,
			userId: user.id,
		});
	}
}
