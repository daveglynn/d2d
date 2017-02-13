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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },	
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function (value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('Code: Length is incorrect. Max 50 characters.')
                    } else {
                        next()
                    }
                },
            },
        },
        ruleBookId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: function (value, next) {
                    if (v.isNumeric(v.ltrim(value)) === false) {
                        next('Rule Book: Must be numeric.')
                    } else {
                        next()
                    }
                },
            }
        },
        expired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        parent: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        parentListId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: function (value, next) {
                    if (v.isNumeric(v.ltrim(value)) === false) {
                        next('Parent List: Must be numeric.')
                    } else {
                        next()
                    }
                },
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 250]
            }
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
        getterMethods: {
            idCode: function () {
                return this.id + '-' + this.code
            }
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