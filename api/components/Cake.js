class Cake {
	constructor(id, name, price, flavors) {
		this.id = Number(id);
		this.name = name;
		this.price = Number(price);
		this.flavors = flavors;
	}

	ValidateEmpties() {
		return this.name && this.price && this.flavors;
	}
}
module.exports = Cake;
