import { Product } from "./product.entity";

export class Ticket {
	id?: string;
	printed?: number;
	status?: boolean;
	product?: Product;
	createdAt?: Date;
}
