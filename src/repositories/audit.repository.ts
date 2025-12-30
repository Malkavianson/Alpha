import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services";

@Injectable()
export class AuditRepository {
	constructor(private readonly prisma: PrismaService) {}

	async save(data: {
		actionCode: string;
		actionName?: string;
		entity: string;
		entityId: string;
		userId: string;
		before?: string | null;
		after?: string | null;
	}) {
		return this.prisma.auditLog.create({
			data: {
				entity: data.entity,
				entityId: data.entityId,
				before: data.before ?? null,
				after: data.after ?? null,

				user: {
					connect: {
						id: data.userId,
					},
				},

				action: {
					connectOrCreate: {
						where: {
							code: data.actionCode,
						},
						create: {
							code: data.actionCode,
							name: data.actionName ?? data.actionCode,
						},
					},
				},
			},
		});
	}
}
