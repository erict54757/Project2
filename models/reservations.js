module.exports = function(sequelize, DataTypes) {

  var ReservationListing = sequelize.define("ReservationListing", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      valiedate: {
        len: [1]
      }

    }
    price: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  });
  return ItemListing;
};
