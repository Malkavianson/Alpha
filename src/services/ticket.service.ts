import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateTicketDto, UpdateArrivalDto } from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { PrismaService } from "./prisma.service";
import { Ticket, User } from "./models";

@Injectable()
class TicketService {
	constructor(private readonly prisma: PrismaService) { }

	async verifyIdAndReturnArrival(id: string): Promise<Ticket> {
		const arrival: Ticket = await this.prisma.ticket.findUnique({
			where: { id },
		});

		if (!arrival) {
			throw new NotFoundException(`Arrival id:'${id}' not found`);
		}

		return arrival;
	}

	async create(dto: CreateTicketDto): Promise<Ticket | void> {
		return await this.prisma.ticket
			.create({ data: dto })
			.catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Ticket[]> {
		return await this.prisma.ticket.findMany();
	}

	async findOne(id: string): Promise<Ticket> {
		return await this.verifyIdAndReturnArrival(id);
	}

	async update(
		id: string,
		dto: UpdateArrivalDto,
		user: User,
	): Promise<Ticket> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnArrival(id);

		return await this.prisma.ticket
			.update({ where: { id }, data: dto })
			.catch(handleErrorConstraintUnique);
	}

	async remove(id: string, user: User): Promise<Ticket> {
		if (!user.isAdmin) {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnArrival(id);

		return await this.prisma.ticket.delete({
			where: { id },
		});
	}
}

export { TicketService }