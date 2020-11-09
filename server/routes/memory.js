const Cake = require("../Models/Cake");

const memoryRoutes = (app) => {
	const baseFolder = "/memory-cakes";

	// Array in memory.
	let cakes = [];

	// Helpers and validations.
	const GetNextId = () => {
		return cakes.length === 0 ? 1 : cakes[cakes.length - 1].id + 1;
	};

	const ValidateUnique = (name) => {
		return cakes.filter((cake) => cake.name === name);
	};

	const GetItem = (id) => {
		return cakes.find((cake) => cake.id === id);
	};

	const GetIndex = (id) => {
		return cakes.findIndex((cake) => cake.id == id);
	};

	// Get the list of cakes
	app.get(baseFolder + "/", (req, res) => {
		console.log(cakes);
		res.send(cakes);
	});

	// Register a new cake.
	app.get(baseFolder + "/add", (req, res) => {
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
	});

	// Get info on a particular cake.
	app.get(baseFolder + "/:id", (req, res) => {

		const id = Number(req.params["id"]);
		const cakeFound = GetItem(id);
		if (cakeFound !== undefined) {
			res.status(200).send(cakeFound);
		} else {
			res.status(400).send("Cake not found!");
		}
	});
	
	// Delete a cake.
	app.get(baseFolder + "/delete/:id", (req, res) => {

		const id = Number(req.params["id"]);
		const index = GetIndex(id);

		console.log(index);

		if (index > -1) {
			cakes.splice(index, 1);
			res.status(200).send("Cake deleted!");
		} else {
			res.status(400).send("Cake not found!");
		}
	});
};

module.exports = memoryRoutes;
