const Cake = require("../components/Cake");

const memoryRoutes = (app) => {
	// Set base route.
	const baseRoute = "/cakes";

	// Array in memory.
	let cakes = [];

	// Helpers and validations.
	const GetNextId = () => {
		return cakes.length === 0 ? 1 : cakes[cakes.length - 1].id + 1;
	};

	const GetItem = (id) => {
		return cakes.find((cake) => cake.id === id);
	};

	const GetIndex = (id) => {
		return cakes.findIndex((cake) => cake.id == id);
	};

	const ValidateUnique = (name, id = 0) => {
		return cakes.filter((cake) => (id == 0 || cake.id !== id) && cake.name === name);
	};

	app.get(baseRoute + "/", list);
	app.get(baseRoute + "/:id", details);
	app.post(baseRoute + "/add", add);
	app.post(baseRoute + "/update", update);
	app.delete(baseRoute + "/delete/:id", remove);

	// Get the list of cakes
	function list(req, res) {
		res.send(cakes);
	}

	// Get info on a particular cake.
	function details(req, res) {
		const id = Number(req.params["id"]);
		const cakeFound = GetItem(id);
		if (cakeFound !== undefined) {
			res.status(200).send(cakeFound);
		} else {
			res.status(400).send("Cake not found!");
		}
	}

	// Register a new cake.
	function add(req, res) {
		let newCake = new Cake(GetNextId(), req.body.name, req.body.price, req.body.flavors);
		if (newCake.ValidateEmpties()) {
			if (ValidateUnique(newCake.name) == false) {
				cakes.push(newCake);
				res.status(200).send("Cake added!");
			} else {
				res.status(400).send("Name must be unique!");
			}
		} else {
			res.status(400).send("Must fill all fields!");
		}
	}

	// Update a cake.
	function update(req, res) {
		let updatedCake = new Cake(req.body.id, req.body.name, req.body.price, req.body.flavors);
		const index = GetIndex(updatedCake.id);
		if (index > -1) {
			if (updatedCake.ValidateEmpties()) {
				if (ValidateUnique(updatedCake.name, updatedCake.id) == false) {
					cakes[index].name = updatedCake.name;
					cakes[index].price = updatedCake.price;
					cakes[index].flavors = updatedCake.flavors;

					res.status(200).send("Cake updated!");
				} else {
					res.status(400).send("Name must be unique!");
				}
			} else {
				res.status(400).send("Must fill all fields!");
			}
		} else {
			res.status(400).send("Cake not found!");
		}
	}

	// Delete a cake.
	function remove(req, res) {
		const id = Number(req.params["id"]);
		const index = GetIndex(id);

		if (index > -1) {
			cakes.splice(index, 1);
			res.status(200).send("Cake deleted!");
		} else {
			res.status(400).send("Cake not found!");
		}
	}
};

module.exports = memoryRoutes;
