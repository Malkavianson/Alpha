import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LoggedUser } from "../decorators";
import { CreateTicketDto, UpdateTicketDto } from "../core";
import { TicketService, User, Ticket } from "../services";

@UseGuards(AuthGuard())
@ApiTags("ticket")
@ApiBearerAuth()
@Controller("ticket")
class TicketController {
	constructor(private readonly TicketService: TicketService) { }

	@Post()
	@ApiOperation({
		summary: "Fill a new ticket",
		description:
			"This is the ticket list, you must to get your token before open a new ticket;",
	})
	async create(@Body() dto: CreateTicketDto): Promise<Ticket | void> {
		return await this.TicketService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Arrivals",
	})
	async findAll(): Promise<Ticket[]> {
		return await this.TicketService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one Arrival by ID",
	})
	async findOne(@Param("id") id: string): Promise<Ticket> {
		return await this.TicketService.findOne(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch Arrival state information",
	})
	async update(
		@Param("id") id: string,
		@Body() dto: UpdateTicketDto,
		@LoggedUser() user: User,
	): Promise<Ticket | void> {
		return await this.TicketService.update(id, dto, user);
	}

	@Delete(":id")
	@ApiResponse({
		status: 200,
		description: "Arrival place Released",
	})
	@ApiOperation({
		summary: "Release one Arrival state by ID",
	})
	async remove(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Ticket> {
		return await this.TicketService.remove(id, user);
	}
}

export { TicketController }