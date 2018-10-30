module.exports = function(sequelize, DataTypes) {
  var ReListing = sequelize.define("ItemListing", {
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
  });
  return ItemListing;
};
