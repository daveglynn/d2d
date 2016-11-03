/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function (sequelize, DataTypes) {
    var ruleBook = sequelize.define('ruleBook', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLength: function (value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('Name: Length is incorrect. Max 50 characters.')
                    } else {
                        next()
                    }
                },
            }
        }, 
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        processflags: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
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

    return ruleBook;
}