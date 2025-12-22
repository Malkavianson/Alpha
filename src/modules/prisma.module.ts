import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "../services";
import { Module } from "@nestjs/common";

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
	imports: [PassportModule.register({ defaultStrategy: "jwt" })],
})
export class PrismaModule {}
