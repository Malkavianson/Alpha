import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

class CreateTicketDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "Product name",
		example: "firstProduct",
	})
	product: string;

	@Exclude()
	printed: number;
}

export { CreateTicketDto }