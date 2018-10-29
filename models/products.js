module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define("products", {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2)
  });

  return Products;
};
