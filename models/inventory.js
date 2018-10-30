module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    name: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    subCategory: {
      type: DataTypes.TEXT
    },
    comments: {
      type: DataTypes.TEXT
    }
  });
  return Inventory;
};
