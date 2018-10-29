// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/customers");

    // res.redirect("/customers");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
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
  app.put("/api/makeAppointment", function(req, res) {
    console.log(req.body);
    db.User.update(
      {
        reservations: req.body.reservations
      },
      {
        WHERE: {
          User: req.body.user
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
  app.get("/api/user_data", function(req, res) {
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

  app.get("/api/customer-info", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phoneNumber: req.user.phoneNumber
      });
    }
  });
  app.get("/api/customer-info", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phoneNumber: req.user.phoneNumber
      });
    }
  });
  app.get("/api/empolyer-info", function(req, res) {
    if (!req.employee) {
      res.json({});
    } else {
      res.json({
        email: req.employee.email,
        id: req.employee.id,
        firstName: req.employee.firstName,
        lastName: req.employee.lastName,
        phoneNumber: req.employee.phoneNumber
      });
    }
  });
};
