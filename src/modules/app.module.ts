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

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		UsersModule,
		ProductsModule,
		TicketModule,
		CategoriesModule,
		AuthModule,
	],
})
export class AppModule {}
