import { PrismaService } from "src/services";

export abstract class BaseRepository<T> {
	protected constructor(protected readonly prisma: PrismaService) {}

	protected async findUnique<Model>(
		model: { findUnique: Function },
		where: Record<string, unknown>,
	): Promise<Model | null> {
		return model.findUnique({ where });
	}

	protected async findMany<Model>(
		model: { findMany: Function },
		args?: Record<string, unknown>,
	): Promise<Model[]> {
		return model.findMany(args);
	}

	protected async create<Model>(
		model: { create: Function },
		data: Record<string, unknown>,
	): Promise<Model> {
		return model.create({ data });
	}

	protected async update<Model>(
		model: { update: Function },
		where: Record<string, unknown>,
		data: Record<string, unknown>,
	): Promise<Model> {
		return model.update({ where, data });
	}

	protected async delete<Model>(
		model: { delete: Function },
		where: Record<string, unknown>,
	): Promise<Model> {
		return model.delete({ where });
	}

	protected async count(
		model: { count: Function },
		where?: Record<string, unknown>,
	): Promise<number> {
		return model.count({ where });
	}
}
