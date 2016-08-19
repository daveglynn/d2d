/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function (sequelize, DataTypes) {
    var list = sequelize.define('list', {
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
        isMetaData: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        display: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return list;
}