// load up our shiny new route for teams
const memoryRoutes = require("./memory");
const fileRoutes = require("./file");
// const databaseRoutes = require("./database");

const appRouter = (app, fs) => {
	// Send a welcome message for empty route.
	app.get("/", (req, res) => {
		res.send("Welcome!");
	});

	// Run the other route modules.
	memoryRoutes(app); // Default route: /cakes
	fileRoutes(app, fs); // Route: /file-cakes
	// databaseRoutes(app);
};

module.exports = appRouter;
