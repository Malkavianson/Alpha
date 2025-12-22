// Enums baseados nos campos string com valores predefinidos
export enum UserRole {
	USER = "user",
	ADMIN = "admin",
}

export enum AuditAction {
	CREATE = "CREATE",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT",
}

export enum SupplierType {
	JURIDICA = "JURIDICA",
	FISICA = "FISICA",
}

export enum ClientType {
	JURIDICA = "JURIDICA",
	FISICA = "FISICA",
}

export enum NfeType {
	ENTRADA = "ENTRADA",
	SAIDA = "SAIDA",
}

export enum NfeModel {
	MODELO_55 = "55",
	MODELO_65 = "65",
	MODELO_1 = "1",
}

export enum NfeStatus {
	AUTORIZADA = "AUTORIZADA",
	CANCELADA = "CANCELADA",
	PENDENTE = "PENDENTE",
	REJEITADA = "REJEITADA",
}

export enum StockMovementType {
	ENTRADA = "ENTRADA",
	SAIDA = "SAIDA",
	AJUSTE = "AJUSTE",
	TRANSFERENCIA = "TRANSFERENCIA",
}

export enum StockMovementOrigin {
	MANUAL = "MANUAL",
	NFE = "NFE",
	PEDIDO = "PEDIDO",
	INVENTARIO = "INVENTARIO",
}

export enum AccountStatus {
	PENDING = "PENDING",
	PAID = "PAID",
	OVERDUE = "OVERDUE",
	CANCELLED = "CANCELLED",
}

export enum SalesOrderStatus {
	DRAFT = "DRAFT",
	PENDING = "PENDING",
	CONFIRMED = "CONFIRMED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
	INVOICED = "INVOICED",
}

export enum PaymentMethod {
	CASH = "CASH",
	CREDIT_CARD = "CREDIT_CARD",
	DEBIT_CARD = "DEBIT_CARD",
	BANK_TRANSFER = "BANK_TRANSFER",
	CHECK = "CHECK",
	PIX = "PIX",
}

// Tipos base para auditoria
export interface Auditable {
	id: string;
	createdAt: Date;
}

export interface Trackable {
	userId: string;
	user?: User;
}

// Base interfaces para relações
export interface BaseRelation {
	id: string;
}

// Model Interfaces
export interface User extends Auditable {
	role: UserRole;
	user: string;
	name: string;
	password: string;
	favorites: Favorite[];
	auditLogs: AuditLog[];
}

export interface AuditLog extends Auditable {
	entity: string;
	entityId: string;
	action: AuditAction;
	before: string | null;
	after: string | null;
	user: User;
	userId: string;
}

export interface Company extends Auditable {
	name: string;
	cnpj: string | null;
	products: Product[];
	clients: Client[];
	suppliers: Supplier[];
	salesOrders: SalesOrder[];
	nfe: Nfe[];
}

export interface Category extends Auditable {
	name: string;
	code: string;
	products: Product[];
}

export interface Product extends Auditable {
	name: string;
	description: string | null;
	sku: string | null;
	alias: string | null;
	barcode: string | null;
	unit: string | null;
	active: boolean;
	categoryId: string | null;
	category?: Category | null;
	companyId: string;
	company: Company;
	orderItems: SalesOrderItem[];
	favorites: Favorite[];
	nfeItems: NfeItem[];
	stockEvents: StockMovement[];
	suppliers: ProductSupplier[];
}

export interface Favorite extends Auditable {
	userId: string;
	user: User;
	productId: string;
	product: Product;
}

export interface Supplier extends Auditable {
	type: SupplierType;
	corporateName: string;
	fantasyName: string | null;
	cnpj: string | null;
	cpf: string | null;
	ie: string | null;
	im: string | null;
	address: string | null;
	phone: string | null;
	email: string | null;
	companyId: string;
	company: Company;
	nfe: Nfe[];
	products: ProductSupplier[];
	accountsPayable: AccountPayable[];
}

export interface Client extends Auditable {
	type: ClientType | null;
	corporateName: string;
	fantasyName: string | null;
	cnpj: string | null;
	cpf: string | null;
	address: string | null;
	companyId: string;
	company: Company;
	orders: SalesOrder[];
	nfe: Nfe[];
	accountsReceivable: AccountReceivable[];
}

export interface ProductSupplier extends Auditable {
	supplierCode: string | null;
	supplierDesc: string | null;
	productId: string;
	product: Product;
	supplierId: string;
	supplier: Supplier;
}

export interface Nfe extends Auditable {
	accessKey: string;
	number: string;
	series: string | null;
	model: NfeModel | null;
	type: NfeType | null;
	nature: string | null;
	issueDate: Date;
	entryExitDate: Date | null;
	totalProducts: number;
	totalValue: number;
	xml: string | null;
	status: NfeStatus | null;
	supplierId: string | null;
	supplier?: Supplier | null;
	clientId: string | null;
	client?: Client | null;
	companyId: string;
	company: Company;
	salesOrders: SalesOrder[];
	items: NfeItem[];
	accountPayables: AccountPayable[];
	accountReceivables: AccountReceivable[];
}

export interface NfeItem extends Auditable {
	description: string | null;
	quantity: number | null;
	unitValue: number;
	totalValue: number;
	ncm: string | null;
	cfop: string | null;
	cest: string | null;
	nfeId: string;
	nfe: Nfe;
	productId: string | null;
	product?: Product | null;
	taxes: NfeTax[];
}

export interface NfeTax extends Auditable {
	type: string | null;
	baseValue: number | null;
	rate: number | null;
	value: number | null;
	itemId: string;
	item: NfeItem;
}

export interface StockMovement extends Auditable {
	type: StockMovementType | null;
	origin: StockMovementOrigin | null;
	quantity: number;
	referenceId: string | null;
	productId: string;
	product: Product;
}

export interface AccountPayable extends Auditable {
	description: string | null;
	value: number;
	dueDate: Date;
	status: AccountStatus;
	supplierId: string;
	supplier: Supplier;
	nfeId: string | null;
	nfe?: Nfe | null;
	payments: Payment[];
}

export interface Payment extends Auditable {
	valuePaid: number | null;
	paymentDate: Date | null;
	method: PaymentMethod | null;
	accountPayableId: string;
	account: AccountPayable;
}

export interface AccountReceivable extends Auditable {
	description: string | null;
	value: number;
	dueDate: Date | null;
	status: AccountStatus;
	clientId: string | null;
	client?: Client | null;
	nfeId: string | null;
	nfe?: Nfe | null;
}

export interface SalesOrder extends Auditable {
	description: string | null;
	status: SalesOrderStatus;
	companyId: string;
	company: Company;
	clientId: string | null;
	client?: Client | null;
	items: SalesOrderItem[];
	nfe: Nfe[];
}

export interface SalesOrderItem extends Auditable {
	quantity: number;
	unitValue: number;
	orderId: string;
	order: SalesOrder;
	productId: string | null;
	product?: Product | null;
}

// Types para criação (Create DTOs)
export type CreateUserDTO = Omit<
	User,
	"id" | "createdAt" | "favorites" | "auditLogs"
>;
export type UpdateUserDTO = Partial<
	Omit<User, "id" | "createdAt" | "favorites" | "auditLogs">
>;

export type CreateAuditLogDTO = Omit<AuditLog, "id" | "createdAt" | "user">;

export type CreateProductDTO = Omit<
	Product,
	| "id"
	| "createdAt"
	| "category"
	| "company"
	| "orderItems"
	| "favorites"
	| "nfeItems"
	| "stockEvents"
	| "suppliers"
>;

export type CreateNfeDTO = Omit<
	Nfe,
	| "id"
	| "createdAt"
	| "supplier"
	| "client"
	| "company"
	| "salesOrders"
	| "items"
	| "accountPayables"
	| "accountReceivables"
>;

// Types para queries com relações parciais
export type UserWithFavorites = User & {
	favorites: Favorite[];
};

export type ProductWithCategory = Product & {
	category?: Category;
};

export type NfeWithRelations = Nfe & {
	supplier?: Supplier;
	client?: Client;
	items: NfeItem[];
};

export type SalesOrderWithItems = SalesOrder & {
	client?: Client;
	items: SalesOrderItem[];
};

// Classes abstratas para validação
export abstract class BaseValidator {
	abstract validate(data: any): boolean;
	abstract getErrors(): string[];
}

export abstract class EntityValidator<T> extends BaseValidator {
	abstract validateEntity(entity: T): boolean;
}

// Classe abstrata para repositório base
export abstract class BaseRepository<T> {
	abstract create(data: T): Promise<T>;
	abstract findById(id: string): Promise<T | null>;
	abstract update(id: string, data: Partial<T>): Promise<T>;
	abstract delete(id: string): Promise<boolean>;
}

// Types para respostas da API
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	meta?: {
		total?: number;
		page?: number;
		limit?: number;
	};
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

// Types para filtros
export interface FilterOptions {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	search?: string;
}

export interface ProductFilter extends FilterOptions {
	categoryId?: string;
	active?: boolean;
	companyId?: string;
}

export interface NfeFilter extends FilterOptions {
	type?: NfeType;
	status?: NfeStatus;
	startDate?: Date;
	endDate?: Date;
	companyId?: string;
}

// Types para relatórios
export interface SalesReport {
	period: string;
	totalSales: number;
	totalOrders: number;
	averageTicket: number;
	topProducts: Array<{
		productId: string;
		productName: string;
		quantity: number;
		totalValue: number;
	}>;
}

export interface FinancialReport {
	period: string;
	accountsPayable: {
		pending: number;
		overdue: number;
		paid: number;
	};
	accountsReceivable: {
		pending: number;
		overdue: number;
		received: number;
	};
	cashFlow: Array<{
		date: string;
		income: number;
		expense: number;
		balance: number;
	}>;
}

// Types para WebSocket/Realtime
export interface StockUpdateEvent {
	productId: string;
	productName: string;
	oldQuantity: number;
	newQuantity: number;
	movementType: StockMovementType;
	userId: string;
	timestamp: Date;
}

export interface OrderUpdateEvent {
	orderId: string;
	oldStatus: SalesOrderStatus;
	newStatus: SalesOrderStatus;
	userId: string;
	timestamp: Date;
}
