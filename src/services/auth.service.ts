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

	async login({ user, password }: LoginDto): Promise<ResponseLoginDto> {
		const currentUser: User = await this.prisma.users.findUnique({
			where: { user },
			select: {
				...this.userSelect,
				role: true,
			},
		});

		if (!currentUser) {
			throw new NotFoundException("Invalid email or password ");
		}

		const passwordMatch: boolean = await bcrypt.compare(
			password,
			currentUser.password,
		);

		if (!passwordMatch) {
			throw new NotFoundException("Invalid email or password ");
		}

		delete currentUser.password;

		const token: string = this.jwtService.sign({
			currentUser,
		});

		return { token, currentUser };
	}
}
