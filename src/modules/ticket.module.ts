import { TicketController } from "../controllers";
import { PassportModule } from "@nestjs/passport";
import { TicketService } from "../services";
import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [TicketController],
	providers: [TicketService],
})
export class ArrivalsModule { }
