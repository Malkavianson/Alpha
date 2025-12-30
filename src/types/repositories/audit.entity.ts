export class AuditLog {
	constructor(
		public readonly id: string,
		public readonly action: string,
		public readonly entity: string,
		public readonly entityId: string,
		public readonly userId: string,
		public readonly before: any,
		public readonly after: any,
		public readonly metadata: any,
		public readonly createdAt: Date,
	) {}
}
