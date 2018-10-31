// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		// The email cannot be null, and must be a proper email before creation
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			is: ["^[a-z]+$", "i"],
			len: [2, 20],
			notEmpty: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			is: ["^[a-z]+$", "i"],
			len: [2, 20],
			notEmpty: true
		},
		phoneNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			isNumeric: true,
			notEmpty: true
		},
		// The password cannot be null
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		reservations: {
			type: DataTypes.TEXT
		},
		pastReservations: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		isCustomer: {
			type: DataTypes.BOOLEAN,

			defaultValue: true
		},
		isEmployee: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},

<<<<<<< HEAD
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
	User.prototype.validPassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};
	// Hooks are automatic methods that run during various phases of the User Model lifecycle
	// In this case, before a User is created, we will automatically hash their password
	User.hook("beforeCreate", function(user) {
		user.password = bcrypt.hashSync(
			user.password,
			bcrypt.genSaltSync(10),
			null
		);
	});
	return User;
=======
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  User.associate = function(models) {
    User.hasMany(models.ReservationListing)
  };
  return User;
>>>>>>> 994813f443939fcbe62f417b7901b1e3cdb9ab15
};
