import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";
import { AuditLog } from "@prisma/client";

@Injectable()
export class AuditRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: {
		actionCode: string;
		actionName: string;
		entity: string;
		entityId: string;
		userId: string;
		before?: string | null;
		after?: string | null;
	}): Promise<AuditLog> {
		return this.prisma.auditLog.create({
			data: {
				entity: data.entity,
				entityId: data.entityId,
				before: data.before ?? null,
				after: data.after ?? null,
				user: {
					connect: { id: data.userId },
				},
				action: {
					connectOrCreate: {
						where: { code: data.actionCode },
						create: {
							code: data.actionCode,
							name: data.actionName,
						},
					},
				},
			},
		});
	}

	async findByEntity(entity: string, entityId: string): Promise<AuditLog[]> {
		return this.prisma.auditLog.findMany({
			where: { entity, entityId },
			orderBy: { createdAt: "desc" },
		});
	}

	async findByUser(userId: string): Promise<AuditLog[]> {
		return this.prisma.auditLog.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});
	}
}
