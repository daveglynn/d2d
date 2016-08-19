/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function(sequelize, DataTypes) {
    var tenant = sequelize.define('tenant', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
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
        },
    }, {
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.omit(json, '');
                }
            }

        });

    return tenant;
}