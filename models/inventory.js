module.exports = function(sequelize, DataTypes) {

  var ItemListing = sequelize.define("ItemListing", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      valiedate: {
        len: [1]
      }

    }
  });
  return ItemListing;
};
