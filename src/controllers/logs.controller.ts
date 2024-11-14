import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { LogsService } from "../services/logs.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { LoggedUser } from "src/decorators";
import { Log, User } from "src/services";

@Controller("logs")
export class LogsController {
	constructor(private readonly logsService: LogsService) {}

	@Get()
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Get all logs",
	})
	@ApiBearerAuth()
	async findAll(@LoggedUser() user: User): Promise<Log[] | void> {
		return this.logsService.findAll(user);
	}

	@Get(":id")
	@UseGuards(AuthGuard())
	@ApiOperation({
		summary: "Get one log by ID",
	})
	@ApiBearerAuth()
	findOne(
		@Param("id") id: string,
		@LoggedUser() user: User,
	): Promise<Log | void> {
		return this.logsService.findOne(id, user);
	}
}
