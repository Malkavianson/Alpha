import { Module } from "@nestjs/common";
import { AppController } from "./controllers";
import { AppService } from "./services";
import {
	AuthModule,
	UsersModule,
	CategoriesModule,
	ProductsModule,
	TicketModule,
	HomeModule,
	LogsModule,
} from "./modules";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		TicketModule,
		ProductsModule,
		CategoriesModule,
		HomeModule,
		LogsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
