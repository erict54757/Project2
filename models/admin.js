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
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isEmployee: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
    return Admin;
  };