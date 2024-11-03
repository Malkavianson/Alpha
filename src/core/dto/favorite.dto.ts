import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FavoriteProductDto {
	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({
		description: "User ID that is favoriting a product",
		example: "12345abc-ab1d-12a3-1ab2-12a3b456c789",
	})
	userId: string;

	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({
		description: "Product ID that is favoritated by a user",
		example: "12345abc-ab1d-12a3-1ab2-12a3b456c789",
	})
	productId: string;
}
