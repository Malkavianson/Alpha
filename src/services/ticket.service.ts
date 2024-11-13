import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateTicketDto, UpdateTicketDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { PrismaService } from "./prisma.service";
import { Product, Ticket, User } from "./models";
import { Prisma } from "@prisma/client";
import { ProductsService } from "./products.service";

@Injectable()
class TicketService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productService: ProductsService,
	) {}

	async verifyIdAndReturnTicket(id: string): Promise<Ticket> {
		const ticket: Ticket = await this.prisma.ticket.findUnique({
			where: { id },
		});

		if (!ticket) {
			throw new NotFoundException(`Ticket id:'${id}' not found`);
		}

		return ticket;
	}

	async verifyBarcodeAndReturnTicket(barcode: string): Promise<Ticket> {
		const product: Product = await this.productService.findOneByBarcode(
			barcode,
		);

		if (!product) {
			throw new NotFoundException(
				`Product barcode:'${barcode}' not found`,
			);
		}

		const productName = product.name;

		const ticket: Ticket = await this.prisma.ticket.findUnique({
			where: {
				productName,
			},
		});

		if (!ticket) {
			throw new NotFoundException(
				`Ticket barcode:'${barcode}' not found`,
			);
		}

		return ticket;
	}

	async create(dto: CreateTicketDto): Promise<Ticket | void> {
		const data: Prisma.TicketCreateInput = {
			product: {
				connect: {
					name: dto.product,
				},
			},
		};
		return await this.prisma.ticket
			.create({
				data,
			})
			.catch(handleErrorConstraintUnique);
	}

	async findAll(user: User): Promise<Ticket[]> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}

		return await this.prisma.ticket.findMany();
	}

	async findAllActives(user: User): Promise<Ticket[]> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}

		return await this.prisma.ticket.findMany({
			where: {
				status: true,
			},
		});
	}

	async findOneById(id: string, user: User): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}

		return await this.verifyIdAndReturnTicket(id);
	}

	async findOneByBarcode(barcode: string): Promise<Ticket> {
		return await this.verifyBarcodeAndReturnTicket(barcode);
	}

	async changeStatus(id: string, user: User): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		const ticket = await this.verifyIdAndReturnTicket(id);

		const status = ticket.status;

		return await this.prisma.ticket
			.update({ where: { id }, data: { status: !status } })
			.catch(handleErrorConstraintUnique);
	}

	async increaseProductCountByBarcode(
		barcode: string,
		user: User,
	): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}

		const product = await this.productService.verifyBarcodeAndReturnProduct(
			barcode,
		);

		const quantity = product.quantity + 1;

		return await this.prisma.product
			.update({ where: { id: product.id }, data: { quantity } })
			.catch(handleErrorConstraintUnique);
	}

	async decreaseProductCountByBarcode(
		barcode: string,
		user: User,
	): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		const product = await this.productService.verifyBarcodeAndReturnProduct(
			barcode,
		);

		const quantity = product.quantity - 1;

		const ticket = await this.verifyBarcodeAndReturnTicket(barcode);
		const printed = ticket.printed + 1;

		await this.prisma.ticket
			.update({ where: { id: ticket.id }, data: { printed } })
			.catch(handleErrorConstraintUnique);

		return await this.prisma.product
			.update({ where: { id: product.id }, data: { quantity } })
			.catch(handleErrorConstraintUnique);
	}

	async remove(id: string, user: User): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnTicket(id);

		return await this.prisma.ticket.delete({
			where: { id },
		});
	}
}

export { TicketService };
