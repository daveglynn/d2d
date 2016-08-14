﻿/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');


module.exports = function (sequelize, DataTypes) {
    var item = sequelize.define('item', {
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
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
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
        code: {
            type: DataTypes.STRING,
            allowNull: false,
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
        ruleBookId: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function (value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 10 }) === false) {
                        next('Rule Book: Length is incorrect. Max 10 characters.')
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
            allowNull: false,
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

    });

    return item;
}