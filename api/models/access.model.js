/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var _ = require('underscore')
var v = require('validator');
var constants = require('../../shared/constant.shared');

module.exports = function(sequelize, DataTypes) {
    var access = sequelize.define('access', {
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
            },
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
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null            
        },         
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null            
        }, 
        divisionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null            
        },
        objectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null           
        },                        
           canAdd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }, 
        canView: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },         
        canEdit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },   
        canDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },                       
		setAllModeElements: {
            type: DataTypes.JSON,
            allowNull: true,
        }, 
		setAddModeElements: {
            type: DataTypes.JSON,
            allowNull: true,
        }, 
		setViewModeElements: {
            type: DataTypes.JSON,
            allowNull: true,
        },     
		setEditModeElements: {
            type: DataTypes.JSON,
            allowNull: true,
        }, 
		setDeleteModeElements: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    }, {
        getterMethods: {
            idCode: function () {
                return this.id + ':' + this.code
            }
        },
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.omit(json, 'tenantId');
                }
            }

        });

    return access;
};