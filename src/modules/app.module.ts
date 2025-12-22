import {
	AuthModule,
	UsersModule,
	ProductsModule,
	TicketModule,
	CategoriesModule,
} from "./";
import { AppController } from "../controllers";
import { AppService } from "../services";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		UsersModule,
		ProductsModule,
		TicketModule,
		CategoriesModule,
		AuthModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "240h" },
		}),
	],
})
export class AppModule {}
