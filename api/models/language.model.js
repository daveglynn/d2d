/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('language', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },		
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
			defaultValue: true
        },		
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        }
    });
};