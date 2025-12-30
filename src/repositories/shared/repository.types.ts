export type Where<T = any> = Record<keyof T | string, any>;

export type OrderBy<T = any> = {
	[key in keyof T]?: "asc" | "desc";
};

export type FindManyParams<T = any> = {
	where?: Where<T>;
	orderBy?: OrderBy<T>;
	skip?: number;
	take?: number;
};

export type FindAndCountResult<T> = {
	data: T[];
	total: number;
};

export type RepositoryCreate<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type RepositoryUpdate<T> = Partial<
	Omit<T, "id" | "createdAt" | "updatedAt">
>;
