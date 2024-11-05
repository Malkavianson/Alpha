import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@ApiProperty({
		description: "User Level Credentials",
		example: "user",
	})
	role: string;
}
