import { Module } from "@nestjs/common";
import { LogsController } from "src/controllers";
import { LogsService } from "src/services/logs.service";

@Module({
	controllers: [LogsController],
	providers: [LogsService],
})
export class LogsModule {}
