import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from "@nestjs/common";
import {
	CreateProductDto,
	FavoriteProductDto,
	UpdateProductDto,
} from "../core";
import { handleErrorConstraintUnique } from "../utils";
import { Category, Favorite, Product, User } from "./models";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	createVerificatorDigit(str: string) {
		let sum = str
			.split("")
			.map(Number)
			.reduce((acc, num) => acc + num, 0);
		while (sum >= 10) {
			sum = sum
				.toString()
				.split("")
				.map(Number)
				.reduce((acc, num) => acc + num, 0);
		}
		return sum;
	}

	async verifyNameAndReturnProduct(name: string): Promise<Product[]> {
		const product: Product[] = await this.prisma.product.findMany({
			where: { name },
		});

		if (!product) {
			throw new NotFoundException(`Id: '${name}' not found`);
		}

		return product;
	}

	async verifyIdAndReturnProduct(id: string): Promise<Product> {
		const product: Product = await this.prisma.product.findUnique({
			where: { id },
		});

		if (!product) {
			throw new NotFoundException(`Id: '${id}' not found`);
		}

		return product;
	}

	async verifyIdAndReturnProductFav(id: string): Promise<Favorite> {
		const favoriteId: Favorite = await this.prisma.favorite.findUnique({
			where: { id },
		});

		if (!favoriteId) {
			throw new NotFoundException(`Favorite Id: '${id}' not found`);
		}

		return favoriteId;
	}

	async create(dto: CreateProductDto, user: User): Promise<Product | void> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}

		// Logica do código de barras:
		// [categoria do produto - 4][digito verificador - 1][código do produto - 7][digito verificador - 1][numeros aleatórios - 4]

		const prodNumber: number = await this.prisma.product
			.count()
			.catch(handleErrorConstraintUnique);
		const category: Category = await this.prisma.category
			.findUnique({ where: { id: dto.category } })
			.catch(handleErrorConstraintUnique);
		const catNumber = category.code;
		const sufix: number = Math.floor(Math.random() * 9999);

		dto.code = `${1000001 + prodNumber}`;

		const verificadorUm = this.createVerificatorDigit(
			`${catNumber}${dto.code}${sufix}`,
		);
		const verificadorDois = this.createVerificatorDigit(
			`${catNumber}${verificadorUm}${dto.code}${sufix}`,
		);

		dto.barcode = `${verificadorDois}${catNumber}${verificadorUm}${dto.code}${sufix}`;

		const data: Prisma.ProductCreateInput = {
			name: dto.name,
			description: dto.description,
			price: dto.price,
			quantity: dto.quantity,
			code: dto.code,
			barcode: dto.barcode,
			category: {
				connect: {
					id: dto.category,
				},
			},
		};

		return await this.prisma.product
			.create({ data })
			.catch(handleErrorConstraintUnique);
	}

	async favorite(dto: FavoriteProductDto, user: User): Promise<Favorite> {
		if (user.role != "SuperAdmin") {
			console.log(user);
		}

		const product: Product = await this.prisma.product.findUnique({
			where: { id: dto.productId },
		});

		if (!product) {
			throw new NotFoundException(`Product ${dto.productId} not found`);
		}

		const userUnique: User = await this.prisma.users.findUnique({
			where: { id: dto.userId },
		});

		if (!userUnique) {
			throw new NotFoundException(`ID User '${dto.userId}' not found`);
		}

		const data: Prisma.FavoriteCreateInput = {
			user: {
				connect: {
					id: dto.userId,
				},
			},
			product: {
				connect: {
					id: dto.productId,
				},
			},
		};

		return this.prisma.favorite.create({ data });
	}

	async findAll(query: Partial<Product>): Promise<Product[]> {
		const products: Product[] = await this.prisma.product
			.findMany({ where: query })
			.catch(() => {
				throw new UnprocessableEntityException("Invalid query format");
			});

		if (products.length === 0) {
			throw new NotFoundException("Search did not find any results");
		}

		return products;
	}

	async findOne(id: string): Promise<Product> {
		return await this.verifyIdAndReturnProduct(id);
	}

	async findAllFavUsersById(id: string, user: User): Promise<Favorite[]> {
		if (user.role != "SuperAdmin") {
			console.log(user);
		}
		const product: Product = await this.verifyIdAndReturnProduct(id);

		return await this.prisma.favorite.findMany({
			where: { productId: product.id },
			select: {
				productId: true,
				user: { select: { id: true, user: true } },
			},
		});
	}

	async update(
		id: string,
		dto: UpdateProductDto,
		user: User,
	): Promise<Product | void> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnProduct(id);

		const data: Prisma.ProductCreateInput = {
			name: dto.name,
			description: dto.description,
			price: dto.price,
			quantity: dto.quantity,
			code: dto.code,
			barcode: dto.barcode,
			category: {
				connect: {
					id: dto.category,
				},
			},
		};

		return await this.prisma.product
			.update({ where: { id }, data })
			.catch(handleErrorConstraintUnique);
	}

	async remove(id: string, user: User): Promise<Product> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		await this.verifyIdAndReturnProduct(id);
		try {
			return await this.prisma.product.delete({ where: { id } });
		} catch (err) {
			throw new UnauthorizedException(
				`Product ID: '${id}' already favorited`,
			);
		}
	}

	async disFav(id: string, user: User): Promise<Favorite> {
		if (user.role != "SuperAdmin") {
			console.log(user);
		}
		await this.verifyIdAndReturnProductFav(id);

		return await this.prisma.favorite.delete({ where: { id } });
	}

	async disFavAll(id: string, user: User): Promise<string> {
		if (user.role != "SuperAdmin") {
			throw new UnauthorizedException();
		}
		const allUsers = await this.findAllFavUsersById(id, user);

		allUsers.forEach(async e => {
			const exFav = await this.prisma.favorite.findMany({
				where: { userId: e.userId, productId: e.productId },
			});

			exFav.forEach(async e => {
				const favoriteId: Favorite =
					await this.prisma.favorite.findUnique({
						where: { id: e.id },
					});

				if (favoriteId) {
					await this.prisma.favorite.delete({ where: { id: e.id } });
				}
			});
		});
		return `Product id ${id} is no longer favorited!`;
	}
}
