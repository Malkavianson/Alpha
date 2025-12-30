import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { Users } from "@prisma/client";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Create a new user
	 */
	async create(
		data: Omit<Users, "id" | "createdAt" | "updatedAt">,
	): Promise<Users> {
		return this.prisma.users.create({
			data,
		});
	}

	/**
	 * Find user by id
	 */
	async findById(id: string): Promise<Users | null> {
		return this.prisma.users.findUnique({
			where: { id },
		});
	}

	/**
	 * Find user by email
	 */
	async findByEmail(email: string): Promise<Users | null> {
		return this.prisma.users.findUnique({
			where: { email },
		});
	}

	/**
	 * Update user data
	 */
	async update(
		id: string,
		data: Partial<Omit<Users, "id" | "createdAt" | "updatedAt">>,
	): Promise<Users> {
		return this.prisma.users.update({
			where: { id },
			data,
		});
	}

	/**
	 * Soft disable user
	 */
	async disable(id: string): Promise<Users> {
		return this.prisma.users.update({
			where: { id },
			data: { active: false },
		});
	}

	/**
	 * Check if user exists
	 */
	async exists(id: string): Promise<boolean> {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: { id: true },
		});
		return !!user;
	}

	/**
	 * List users
	 */
	async findAll(): Promise<Users[]> {
		return this.prisma.users.findMany({
			orderBy: { createdAt: "desc" },
		});
	}
}
