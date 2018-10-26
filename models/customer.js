module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    userName:{type: DataTypes.STRING,
    allowNull: false},
    password: {type: DataTypes.TEXT,
    allowNull: false},
   firstName: {type:  DataTypes.STRING,
    allowNull: false},
    lastName:{ type:  DataTypes.STRING,
    allowNull: false},
    phoneNumber: {type: DataTypes.INTEGER,
    allowNull: false},
    pastReservations:{type: DataTypes.TEXT, allowNull: false},
    comments:{type:  DataTypes.TEXT, allowNull: false}
  });
  return Customer;
};
