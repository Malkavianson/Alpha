import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateTicketDto, UpdateTicketDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { PrismaService } from "./prisma.service";
import { Ticket, User } from "./models";
import { Prisma } from "@prisma/client";

@Injectable()
class TicketService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnTicket(id: string): Promise<Ticket> {
		const ticket: Ticket = await this.prisma.ticket.findUnique({
			where: { id },
		});

		if (!ticket) {
			throw new NotFoundException(`Ticket id:'${id}' not found`);
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

	async findAll(): Promise<Ticket[]> {
		return await this.prisma.ticket.findMany();
	}

	async findOne(id: string): Promise<Ticket> {
		return await this.verifyIdAndReturnTicket(id);
	}

	async update(id: string, user: User): Promise<Ticket> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		const ticket = await this.verifyIdAndReturnTicket(id);

		return await this.prisma.ticket
			.update({ where: { id }, data: { printed: ticket.printed++ } })
			.catch(handleErrorConstraintUnique);
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
