// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAdmin = require("../config/middleware/isAdmin");
var isEmployee = require("../config/middleware/isEmployee");

module.exports = function(app) {
	app.post("/api/login", passport.authenticate("local"), function(req, res) {
		res.json("/customers");

		// res.redirect("/customers");
	});

	app.post("/api/signup", function(req, res) {
		console.log(req.body);
		db.User.create({
			email: req.body.email,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNumber: req.body.phoneNumber
		})
			.then(function() {
				res.redirect(307, "/api/login");
			})
			.catch(function(err) {
				console.log(err);
				//   res.redirect("/");
				res.status(422).json(err.errors[0].message);
			});
	});
	//Add inventory to list
	app.post("/api/makeInventory", isAdmin, function(req, res) {
		db.Inventory.create({
			Inventory: req.body.Inventory
		})
			.then(function() {
				res.redirect(307, "/admin");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
	app.post("/api/addEmployee", isAdmin, function(req, res) {
		db.User.create({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNumber: req.body.phoneNumber,
			password: req.body.password,
			reservations: null,
			pastReservations: null,
			comments: req.body.comments,
			isCustomer: false,
			isEmployee: true,
			isAdmin: false
		})
			.then(function() {
				res.redirect(307, "/admin");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
	app.post("/api/addEmployee", isAdmin, function(req, res) {
		db.User.create({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phoneNumber: req.body.phoneNumber,
			password: req.body.password,
			reservations: null,
			pastReservations: null,
			comments: req.body.comments,
			isCustomer: true,
			isEmployee: false,
			isAdmin: false
		})
			.then(function() {
				res.redirect(307, "/admin");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
};
