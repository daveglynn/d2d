/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');


module.exports = function (sequelize, DataTypes) {
    var item = sequelize.define('item', {
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null            
        },        
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        expired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isLength: function (value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('Code: Length is incorrect. Max 50 characters.')
                    } else {
                        next()
                    }
                },
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: null,
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                len: [1, 250]
            }
        },
        ruleBookId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
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
        parent: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        parentListId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
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
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        updatedDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: function (value, next) {
                    if (v.isNumeric(v.ltrim(value)) === false) {
                        next('List: Must be numeric.')
                    } else {
                        next()
                    }
                },
            }
        }
    }, {
        getterMethods: {
            idCode: function () {
                return this.id + ':' + this.code 
            }
        },
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return item;
}