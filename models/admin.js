module.exports = function (sequelize, DataTypes) {
    var Admin = sequelize.define("Admin", {
        product: {type: DataTypes.STRING, allowNull: false,  },
        price: {type: DataTypes.DECIMAL, allowNull:false},
    });
    return Admin;
};
