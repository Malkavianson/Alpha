import { Injectable } from "@nestjs/common";
import { Log, User } from "./models";
import { CreateLogDto } from "src/core";

@Injectable()
export class LogsService {
	async create(createLogDto: CreateLogDto, user: User): Promise<Log | void> {
		const log: Log = {
			username: user.user,
			user: user,
			action: "qual a ação do usuário (CRUD)",
			element: "id e nome do produto/categoria/usuário/ticket afetado",
			before: "string do item à ser modificado",
			after: "string do item após a modificação",
		};
		console.log(createLogDto);
		return log;
	}

	async findAll(user: User) {
		const log: Log = {
			username: user.user,
			user: user,
			action: "qual a ação do usuário (CRUD)",
			element: "id e nome do produto/categoria/usuário/ticket afetado",
			before: "string do item à ser modificado",
			after: "string do item após a modificação",
		};
		const logs = [log];
		return logs;
	}

	async findOne(id: string, user: User) {
		console.log(user);
		const log: Log = {
			username: user.user,
			user: user,
			action: "qual a ação do usuário (CRUD)",
			element: "id e nome do produto/categoria/usuário/ticket afetado",
			before: "string do item à ser modificado",
			after: "string do item após a modificação",
		};
		return log;
	}
}
