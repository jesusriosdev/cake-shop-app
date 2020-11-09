const Cake = require("../Models/Cake");

const memoryRoutes = (app) => {
	const baseFolder = "/memory-cakes";

	let cakes = [];

	const GetNextId = () => {
		return cakes.length === 0 ? 1 : cakes[cakes.length - 1].id + 1;
	};

	const ValidateUnique = (name) => {
		return cakes.filter((cake) => cake.name === name);
	};

	app.get(baseFolder + "/", (req, res) => {
		console.log(cakes);
		res.send(cakes);
	});

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
};

module.exports = memoryRoutes;
