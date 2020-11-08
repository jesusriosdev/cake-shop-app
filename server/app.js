// Load express and body-parser.
const express = require("express");
const bodyParser = require("body-parser");

// Create express application.
const app = express();

// Assign headers.
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With, Content-type,Accept,X-Access-Token,X-Key"
	);

	// TODO: Change outside development environment.
	res.header("Access-Control-Allow-Origin", "*");

	next();
});

// Configure the express application with body parser settings like JSON data handling.
app.use((req, res, next) => {
	bodyParser.json();
	bodyParser.urlencoded({ extended: true });

	next();
});

// Launch express application on server port 3001.
const port = process.env.port || 3001;
const server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
