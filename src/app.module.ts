import { Module } from "@nestjs/common";
import { AppController } from "./controllers";
import { AppService } from "./services";
import {
	AuthModule,
	UsersModule,
	CategoriesModule,
	// OrdersModule,
	ProductsModule,
	TicketModule,
	// SeedModule,
	HomeModule,
} from "./modules";

@Module({
	imports: [
		AuthModule,
		UsersModule,
		TicketModule,
		ProductsModule,
		CategoriesModule,
		// OrdersModule,
		// SeedModule,
		HomeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
