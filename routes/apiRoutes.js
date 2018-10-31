// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAdmin = require("../config/middleware/isAdmin");
// var isEmployee = require("../config/middleware/isEmployee");

module.exports = function(app) {
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
        data:req.user
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
      db.Inventory.findAll({}).then(function(inventoryData) {
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
};
