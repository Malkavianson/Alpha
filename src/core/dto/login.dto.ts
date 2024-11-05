import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "Username",
		example: "josesilva",
	})
	username: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User password",
		example: "Abcd*123",
	})
	password: string;
}
