// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAdmin = require("../config/middleware/isAdmin");
// var isEmployee = require("../config/middleware/isEmployee");

module.exports = function(app) {


	app.post("/api/login", passport.authenticate("local"), function(req, res) {
		console.log(req.body);
		db.User.findOne({
			where: {
				email: req.body.email
			}
		}).then(function(results) {
			console.log(results.dataValues);
			var user = results.dataValues;
			if (user.isAdmin === true) {
				return res.json("/admin");
			} else if (user.isEmployee === true) {
				return res.json("/employee");
			} else {
				return res.json("/customers");
			}
		});
	});

	app.post("/api/signup", function(req, res) {
		db.User.create({
			email: req.body.email,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName:req.body.lastName,
			phoneNumber: req.body.phoneNumber
		})
			.then(function() {
				res.redirect(307, "/api/login");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
	app.post("/api/items", function(req, res) {
		db.ItemListing.create({
			item: req.body.item,
			price: req.body.price,
			description: req.body.description
		})
			.then(function(results) {
				res.json(results);
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});

	app.post("/api/reservations", function(req, res) {
		db.ReservationListing.create({
			date: req.body.date,
			time: req.body.time,
			groupcount: req.body.groupcount,
			creator: req.body.creator,
			email: req.body.email
		})
			.then(function(results) {
				res.json(results);
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
  
	app.get("/api/items", function(req, res) {

		db.ItemListing.findAll({}).then(function(showitems) {
			console.log(showitems);
			res.json(showitems);
		});
	});

	app.get("/api/reservations", function(req, res) {

		db.ItemListing.findAll({}).then(function(showreservations) {
			console.log(showreservations);
			res.json(showreservations);
		});
	});


	app.delete("/api/items", function(req, res) {
		db.ItemListing;
	});



	app.put("/api/makeAppointment", isAuthenticated, function(req, res) {
		console.log(req.body.reservations);
		db.User.update(
			{
				reservations: req.body.reservations
			},
			{
				where: {
					id: req.body.id
				}
			}
		)
			.then(function() {
				res.redirect(307, "/customers");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
	// put request for upadating user
	app.put("/api/user/update", function(req, res) {
		console.log(req.body);
		db.User.update(
			{
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				phoneNumber: req.body.phoneNumber,
				comments: req.body.comments
			},
			{
				where: {
					id: req.body.id
				}
			}
		)
			.then(function() {
				res.json("");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});
	// Route for logging user out
	app.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	// Route for getting some data about our user to be used client side
	app.get("/api/user_data", isAuthenticated, function(req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id
			// Sending back a password, even a hashed password, isn't a good idea
			res.json({
				data: req.user,
				email: req.user.email,
				id: req.user.id
			});
		}
	});
	//route for getting all inventory
	app.get("/api/all/Inventory", isAdmin, function(req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id
			// Sending back a password, even a hashed password, isn't a good idea
			db.ItemListing.findAll({}).then(function(inventoryData) {
				res.json(inventoryData);
			});
		}
	});

	//route for retrieving customer info

	app.get("/api/customer-info", isAuthenticated, function(req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		} else {
			// Otherwise send back the user's email and id
			// Sending back a password, even a hashed password, isn't a good idea
			db.User.findAll({}).then(function(something) {
				res.json(something);
			});
		}
	});

	app.get("/api/admin", function(req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object

			res.json({});
		} else {
			res.json({
				email: req.user.email,
				id: req.user.id,
				firstName: req.user.firstName,
				lastName: req.user.lastName,
				phoneNumber: req.user.phoneNumber
			});
		}
	});
  
	app.delete("/api/user/delete/:id", isAdmin, function(req, res) {
	
		db.User.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(function() {
				res.redirect( "/admin");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
				// res.status(422).json(err.errors[0].message);
			});
	});


};
