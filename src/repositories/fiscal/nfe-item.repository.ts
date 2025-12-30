import { Injectable } from "@nestjs/common";
import { PrismaRepository } from "./prisma.repository";
import { Prisma, NfeItem } from "@prisma/client";

@Injectable()
export class NfeItemRepository {
	constructor(private readonly prisma: PrismaRepository) {}

	async create(data: Prisma.NfeItemCreateInput): Promise<NfeItem> {
		return this.prisma.nfeItem.create({ data });
	}

	async findById(id: string): Promise<NfeItem | null> {
		return this.prisma.nfeItem.findUnique({
			where: { id },
		});
	}

	async findMany(
		where?: Prisma.NfeItemWhereInput,
		orderBy?: Prisma.NfeItemOrderByWithRelationInput,
	): Promise<NfeItem[]> {
		return this.prisma.nfeItem.findMany({
			where,
			orderBy,
		});
	}

	async update(
		id: string,
		data: Prisma.NfeItemUpdateInput,
	): Promise<NfeItem> {
		return this.prisma.nfeItem.update({
			where: { id },
			data,
		});
	}

	async delete(id: string): Promise<NfeItem> {
		return this.prisma.nfeItem.delete({
			where: { id },
		});
	}
}
