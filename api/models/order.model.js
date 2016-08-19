/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function(sequelize, DataTypes) {
    var order =  sequelize.define('order', {
        orderStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        orderTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: null
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 250]
            }
        },
        dateOrdered: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        dateCompleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
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
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return order;
};