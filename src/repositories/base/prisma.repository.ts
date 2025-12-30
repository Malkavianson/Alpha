import { PrismaClient } from "@prisma/client";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";

@Injectable()
export class PrismaRepository
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async enableShutdownHooks(): Promise<void> {
		this.$on("beforeExit", async () => {
			await this.$disconnect();
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
