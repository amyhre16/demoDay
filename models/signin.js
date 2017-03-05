'use strict';

module.exports = function(sequelize, DataTypes) {
    var Visitor = sequelize.define("Visitor", {
        visitor_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        visitor_email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false
        },
        visitor_company: {
            type: DataTypes.STRING,
            allowNull: true
        },
        visitor_linkedin: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }); // end of Visitor

    return Visitor;
}; // end of module.exports