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
import { TicketService, User, Ticket, Product } from "../services";

@UseGuards(AuthGuard())
@ApiTags("ticket")
@ApiBearerAuth()
@Controller("ticket")
class TicketController {
	constructor(private readonly TicketService: TicketService) { }

	@Post()
	@ApiOperation({
		summary: "Create a new ticket",
		description:
			"This is the ticket list, you must to get your token before open a new ticket;",
	})
	async create(@Body() dto: CreateTicketDto): Promise<Ticket | void> {
		return await this.TicketService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: "List all Tickets",
	})
	async findAll(): Promise<Ticket[]> {
		return await this.TicketService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Find one Ticket by id",
	})
	async findById(@Param("id") id: string): Promise<Ticket> {
		return await this.TicketService.findOneById(id);
	}

	@Get(":barcode")
	@ApiOperation({
		summary: "Find one Ticket by Barcode",
	})
	async findByBarcode(@Param("barcode") barcode: string): Promise<Ticket> {
		return await this.TicketService.findOneByBarcode(barcode);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Patch Ticket information",
	})
	async update(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Ticket | void> {
		return await this.TicketService.update(id, user);
	}

	@Patch(":id/status")
	@ApiOperation({
		summary: "Patch Ticket activation status",
	})
	async changeStatus(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Ticket | void> {
		return await this.TicketService.changeStatus(id, user);
	}

	@Patch("quantity/:id/increase")
	@ApiOperation({
		summary: "increase product quantity",
	})
	async increaseProductCountByBarcode(
		@Param("barcode") barcode: string,
		@LoggedUser() user: User,
	): Promise<Product | void> {
		return await this.TicketService.increaseProductCountByBarcode(barcode, user);
	}

	@Patch("quantity/:id/decrease")
	@ApiOperation({
		summary: "decrease product quantity",
	})
	async decreaseProductCountByBarcode(
		@Param("barcode") barcode: string,
		@LoggedUser() user: User,
	): Promise<Product | void> {
		return await this.TicketService.decreaseProductCountByBarcode(barcode, user);
	}

	@Delete(":id")
	@ApiResponse({
		status: 200,
		description: "Ticket Deleted",
	})
	@ApiOperation({
		summary: "Delete Ticket by ID",
	})
	async remove(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Ticket> {
		return await this.TicketService.remove(id, user);
	}
}

export { TicketController };
