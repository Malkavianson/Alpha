export class Stock {
	private constructor(
		public readonly id: string,
		public readonly productId: string,
		private quantity: number,
	) {}

	static create(props: { productId: string; quantity: number }) {
		if (props.quantity < 0) {
			throw new Error("Quantidade inicial inválida");
		}

		return new Stock(undefined, props.productId, props.quantity);
	}

	increase(value: number) {
		if (value <= 0) {
			throw new Error("Entrada inválida");
		}
		this.quantity += value;
	}

	decrease(value: number) {
		if (value <= 0) {
			throw new Error("Saída inválida");
		}
		if (this.quantity - value < 0) {
			throw new Error("Estoque insuficiente");
		}
		this.quantity -= value;
	}

	getQuantity() {
		return this.quantity;
	}

	clone(): Stock {
		return new Stock(this.id, this.productId, this.quantity);
	}
}
