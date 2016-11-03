/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function(sequelize, DataTypes) {
    var profile = sequelize.define('profile', {
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: constants.tenantId_Default            
        },
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
            allowNull: true,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    }, {
            getterMethods   : {
                recordDescription  : function()  { return '(' + this.id + '/' + this.name + ')' }
            },        
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return profile;
};