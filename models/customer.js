module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlphanumeric: true,
        len: [2, 20],
        notEmpty: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        isAlphanumeric: true,
        len: [2, 20],
        notEmpty: true
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
   
 
      isCustomer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isEmployee: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      } 
    });
    return Customer;
  };