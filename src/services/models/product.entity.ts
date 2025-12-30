export class Product {
	static create(_arg0: {
		name: string;
		barcode: string;
		price: number;
		categoryId: any;
		createdBy: any;
	}) {
		throw new Error("Method not implemented.");
	}
	id?: string;
	name?: string;
	description?: string;
	price?: number;
	quantity?: number;
	code?: string;
	barcode?: string;
	createdAt?: Date;
	categoryId?: string;
}
