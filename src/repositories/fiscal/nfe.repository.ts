import { Injectable } from "@nestjs/common";
import { Prisma, Nfe } from "@prisma/client";
import { PrismaRepository } from "../base/prisma.repository";

@Injectable()
export class NfeRepository {
	constructor(private readonly prisma: PrismaRepository) {}

	async create(data: Prisma.NfeCreateInput): Promise<Nfe> {
		return this.prisma.nfe.create({ data });
	}

	async findById(id: string): Promise<Nfe | null> {
		return this.prisma.nfe.findUnique({
			where: { id },
		});
	}

	async findByKey(key: string): Promise<Nfe | null> {
		return this.prisma.nfe.findUnique({
			where: { key },
		});
	}

	async findMany(
		where?: Prisma.NfeWhereInput,
		orderBy?: Prisma.NfeOrderByWithRelationInput,
	): Promise<Nfe[]> {
		return this.prisma.nfe.findMany({
			where,
			orderBy,
		});
	}

	async update(id: string, data: Prisma.NfeUpdateInput): Promise<Nfe> {
		return this.prisma.nfe.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<Nfe> {
		return this.prisma.nfe.delete({
			where: { id },
		});
	}
}
