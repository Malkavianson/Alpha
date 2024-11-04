import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
import { TicketController } from "../controllers";
import { TicketService } from "../services";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [TicketController],
	providers: [TicketService],
})
class TicketModule {}

export { TicketModule };
