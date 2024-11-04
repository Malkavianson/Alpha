import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User",
		example: "josesilva",
	})
	user: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "User name",
		example: "José Silva",
	})
	name: string;

	@IsString()
	@MinLength(8)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Your password must be strong",
	})
	@ApiProperty({
		example: "Abcd*123",
		description:
			"User password => Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
	})
	password: string;

	@Exclude()
	role: string;
}
