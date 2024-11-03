import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Product } from "src/services";

export class CreateTicketDto {
	// @IsNumber()
	@IsNotEmpty()
	// @IsPositive()
	@ApiProperty({
		description: "ticket",
		example: 1,
	})
	product: Product;
}
