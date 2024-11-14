import { User } from "./user.entity";

export class Log {
	id?: string;
	user?: User;
	username?: string;
	action?: string;
	element?: string;
	before?: string;
	after?: string;
	createdAt?: Date;
}
