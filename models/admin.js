module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define("Admin", {
      product: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      isCustomer: {
        type: DataTypes.Boolean,
        defaultValue: false
      },
      isEmployee: {
        type: DataTypes.Boolean,
        defaultValue: false
      },
      isAdmin: {
        type: DataTypes.Boolean,
        defaultValue: true
      }
    });
    return Admin;
  };