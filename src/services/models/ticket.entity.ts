import { Product } from "./product.entity";

export class Ticket {
	id?: string;
	printed?: number;
	product?: Product;
	createdAt?: Date;
}
