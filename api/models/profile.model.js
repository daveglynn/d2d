/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profile', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
			defaultValue: true
        },		
		description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 250]
            }
        },	
		hideElements: {
            type: DataTypes.JSON,
            allowNull: true,
        },			
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    }, {
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });
};