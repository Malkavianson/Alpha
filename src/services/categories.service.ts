import { Injectable } from "@nestjs/common";
import { Category, User } from "./models";
import { CreateCategoryDto } from "src/core";

@Injectable()
export class CategoriesService {
	constructor(
		private readonly categoryRepository: CategoryRepository,
		private readonly auditService: AuditService,
	) {}

	async create(dto: CreateCategoryDto, user: User): Promise<Category> {
		user.assertAdmin();

		const category = Category.create({
			name: dto.name,
			code: dto.code,
		});

		const saved = await this.categoryRepository.save(category);

		await this.auditService.record({
			action: "CATEGORY_CREATE",
			entity: "Category",
			entityId: saved.id,
			after: saved,
			userId: user.id,
		});

		return saved;
	}

	async findAll(): Promise<Category[]> {
		return this.categoryRepository.findAll();
	}
}
