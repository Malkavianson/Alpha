export type PaginationParams = {
	page?: number;
	limit?: number;
};

export type PaginationResult<T> = {
	data: T[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

export function normalizePagination(params?: PaginationParams) {
	const page = Math.max(1, params?.page ?? 1);
	const limit = Math.min(100, Math.max(1, params?.limit ?? 10));
	const skip = (page - 1) * limit;

	return { page, limit, skip };
}

export function buildPaginationResult<T>(args: {
	data: T[];
	page: number;
	limit: number;
	total: number;
}): PaginationResult<T> {
	const totalPages = Math.ceil(args.total / args.limit);

	return {
		data: args.data,
		page: args.page,
		limit: args.limit,
		total: args.total,
		totalPages,
	};
}
