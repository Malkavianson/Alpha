import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { LogsController } from "src/controllers";
import { LogsService } from "src/services/logs.service";
import { PrismaModule } from "./prisma.module";

@Module({
	controllers: [LogsController],
	providers: [LogsService],
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
})
export class LogsModule {}
