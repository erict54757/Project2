module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    Name: {
      type: DataTypes.STRING
    },
    Price: {
      type: DataTypes.DECIMAL
    },
    Description: DataTypes.TEXT
  });
  return Inventory;
};
