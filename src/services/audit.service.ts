import { Injectable } from "@nestjs/common";

@Injectable()
export class AuditService {
	constructor(private readonly auditRepository: AuditRepository) {}

	async record(params: {
		action: string;
		entity: string;
		entityId: string;
		userId: string;
		before?: any;
		after?: any;
		metadata?: Record<string, any>;
	}) {
		return this.auditRepository.save({
			action: params.action,
			entity: params.entity,
			entityId: params.entityId,
			userId: params.userId,
			before: params.before ? JSON.stringify(params.before) : null,
			after: params.after ? JSON.stringify(params.after) : null,
			metadata: params.metadata ? JSON.stringify(params.metadata) : null,
		});
	}
}
