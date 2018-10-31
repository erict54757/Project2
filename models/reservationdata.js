module.exports = function(sequelize, DataTypes) {

  var ReservationListing = sequelize.define("ReservationListing", {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupcount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  ReservationListing.associate = function(models) {
    ReservationListing.belongsTo(models.User, {
      foreignKey: {
        // allowNull: false
      }
    });
  };

  return ReservationListing;
};