module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
   userName:
        {
            type: DataTypes.STRING,
            allowNull: false,
            isAlphanumeric: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            isAlphanumeric: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            is: ["^[a-z]+$",'i'],
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            is: ["^[a-z]+$",'i'],
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isNumeric: true,   

        },
        hoursWorked: {
            type: DataTypes.INTEGER,
            allowNull: true,
            isNumeric: true, 
            max: 80,      
        },
        openInvoices: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
    return Employee;
};
