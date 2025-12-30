import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from "class-validator";
import { Category } from "src/services";

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Name of Product",
		example: "my first Product",
	})
	name: string;

	@IsString()
	@ApiProperty({
		description: "Description of Product",
		example: "This is my first product",
	})
	description: string;

	@IsNumber({
		maxDecimalPlaces: 2,
	})
	@ApiProperty({
		description: "Price of Product",
		example: 1.99,
	})
	price: number;

	@IsNumber()
	@ApiProperty({
		description: "Quantity in stock",
		example: "0",
	})
	quantity: number;

	@Exclude()
	code: string;

	@Exclude()
	barcode: string;

	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({
		description: "Valid Product Category ID",
		example: "qw145abc-ab1d-12a3-1ab2-12a3b456c456",
	})
	category: string;
	categoryId: any;
	initialQuantity: number;
}
