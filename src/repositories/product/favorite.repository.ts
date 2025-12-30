import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { Favorite, Prisma } from "@prisma/client";

@Injectable()
export class FavoriteRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.FavoriteCreateInput): Promise<Favorite> {
		return this.prisma.favorite.create({ data });
	}

	async findById(id: string): Promise<Favorite | null> {
		return this.prisma.favorite.findUnique({
			where: { id },
		});
	}

	async findByUserAndProduct(
		userId: string,
		productId: string,
	): Promise<Favorite | null> {
		return this.prisma.favorite.findFirst({
			where: {
				userId,
				productId,
			},
		});
	}

	async findAllByProduct(productId: string): Promise<Favorite[]> {
		return this.prisma.favorite.findMany({
			where: { productId },
		});
	}

	async findAllByUser(userId: string): Promise<Favorite[]> {
		return this.prisma.favorite.findMany({
			where: { userId },
		});
	}

	async delete(id: string): Promise<Favorite> {
		return this.prisma.favorite.delete({
			where: { id },
		});
	}

	async deleteByUserAndProduct(
		userId: string,
		productId: string,
	): Promise<Favorite> {
		return this.prisma.favorite.delete({
			where: {
				userId_productId: {
					userId,
					productId,
				},
			},
		});
	}

	async deleteAllByProduct(productId: string): Promise<number> {
		const result = await this.prisma.favorite.deleteMany({
			where: { productId },
		});
		return result.count;
	}
}
