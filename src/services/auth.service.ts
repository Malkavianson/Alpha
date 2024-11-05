import { Injectable, NotFoundException } from "@nestjs/common";
import { LoginDto, ResponseLoginDto } from "../core";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "./models";

@Injectable()
export class AuthService {
	private userSelect = {
		id: true,
		name: true,
		user: true,
		password: true,
		createdAt: true,
	};

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async login({ username, password }: LoginDto): Promise<ResponseLoginDto> {
		const user: User = await this.prisma.users.findUnique({
			where: { user: username },
			select: {
				...this.userSelect,
				role: true,
			},
		});

		if (!user) {
			throw new NotFoundException("Invalid username or password ");
		}

		const passwordMatch: boolean = await bcrypt.compare(
			password,
			user.password,
		);

		if (!passwordMatch) {
			throw new NotFoundException("Invalid username or password ");
		}

		delete user.password;

		const token: string = this.jwtService.sign({
			user: user,
		});

		return { token, user };
	}
}
