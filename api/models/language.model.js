/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore');
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function (sequelize, DataTypes) {
    var language = sequelize.define('language', {
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
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return language;
}