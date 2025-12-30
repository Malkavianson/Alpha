import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { UserRole } from "@prisma/client";

@Injectable()
export class UserRoleRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		data: Omit<UserRole, "id">,
	): Promise<UserRole> {
		return this.prisma.userRole.create({
			data,
		});
	}

	async findById(id: string): Promise<UserRole | null> {
		return this.prisma.userRole.findUnique({
			where: { id },
		});
	}

	async findByCode(code: string): Promise<UserRole | null> {
		return this.prisma.userRole.findUnique({
			where: { code },
		});
	}

	async findAll(): Promise<UserRole[]> {
		return this.prisma.userRole.findMany({
			orderBy: { name: "asc" },
		});
	}

	async update(
		id: string,
		data: Partial<Omit<UserRole, "id">>,
	): Promise<UserRole> {
		return this.prisma.userRole.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<UserRole> {
		return this.prisma.userRole.delete({
			where: { id },
		});
	}

	async exists(id: string): Promise<boolean> {
		const role = await this.prisma.userRole.findUnique({
			where: { id },
			select: { id: true },
		});
		return !!role;
	}
}
