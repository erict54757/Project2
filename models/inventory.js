module.exports = function(sequelize, DataTypes) {

  var ItemListing = sequelize.define("ItemListing", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
     
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  });
  return ItemListing;
};
