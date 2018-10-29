// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var isAdmin = require("../config/middleware/isAdmin");

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
        res.json(err);
        // res.status(422).json(err.errors[0].message);
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
        email: req.user.email,
        id: req.user.id
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
