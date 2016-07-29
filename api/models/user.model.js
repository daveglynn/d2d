/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var bcrypt = require('../../other_modules/bcryptjs');
var _ = require('underscore')
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
var v = require('validator');
var constants = require('../../shared/constant.shared');


module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: constants.tenantId_Demo            
        },
        languageId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: constants.languageId_Demo               
        },          
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: constants.roleId_User
        },
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: constants.profileId_Demo               
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
			defaultValue: true
        },	                
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: function(value, next) {
                    if (v.isEmail(v.ltrim(value)) === false) {
                        next('Email:  Is Invalid')
                    } else {
                        next()
                    }
                },
                isUnique: function(value, next) {
                    if (value) {
                        user
                            .find({ where: { email: value } })
                            .then(function(user) {
                                if (user) {
                                    next('Email: ' + value + ' is already taken')
                                } else {
                                    next()
                                }
                            })
                            .catch(function (err) {
                            return next(err);
                        });
                    } else {
                        next("Email: Must be entered");
                    }
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('First Name: Length is incorrect. Max 50 characters.')
                    } else {
                        next()
                    }
                },
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('Last Name: Length is incorrect. Max 50 characters.')
                    } else {
                        next()
                    }
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 0, max: 50 }) === false) {
                        next('Phone: The Length is incorrect. Max 50 characters')
                    } else {
                        next()
                    }
                },
            }
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 0, max: 100 }) === false) {
                        next('Address Line 1: The Length is incorrect. Max 100 characters')
                    } else {
                        next()
                    }
                },
            }
        },
        addressLine2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 0, max: 100 }) === false) {
                           next('Address Line 2: The Length is incorrect. Max 100 characters')
                    } else {
                        next()
                    }
                },
            }
        },
        addressLine3: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 0, max: 100 }) === false) {
                           next('Address Line 3: The Length is incorrect. Max 100 characters')
                    } else {
                        next()
                    }
                },
            } 
        },
        addressLine4: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 0, max: 100 }) === false) {
                           next('Address Line 4: The Length is incorrect. Max 100 characters')
                    } else {
                        next()
                    }
                },
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                isLength: function(value, next) {
                    if (v.isLength(v.ltrim(value), { min: 6, max: 10 }) === false) {
                        next('Password:  The Length of is incorrect. Min 6, Max 10 characters.')
                    } else {
                        next()
                    }
                },
            },
            set: function(value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);

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
            hooks: {
                beforeValidate: function(user, options) {
                    if (typeof user.email === 'string') {
                        user.email = user.email.toLowerCase();
                        user.email = v.trim(user.email);
                    }
                    if (typeof user.firstName === 'string') {
                        user.firstName = v.trim(user.firstName);
                    }
                    if (typeof user.lastName === 'string') {
                        user.lastName = v.trim(user.lastName);
                    }
                    if (typeof user.phone === 'string') {
                        user.phone = v.trim(user.phone);
                    }
                    if (typeof user.password === 'string') {
                        user.password = v.trim(user.password);
                    }
                }
            },
            classMethods: {
                authenticate: function(body) {
                    return new Promise(function(resolve, reject) {
                        try {
                            if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                                return reject();
                            }
                            user.findOne({
                                where: {
                                email: body.email
                                }
                        }).then(function (user) {
                            // password does not match
                            if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            }
                            // user must have a role
                            if (user.get('roleId') === null) {
                                return reject();
                            }
                            //  host user must not have a tenant while all other users must have a tenant
                            if (user.get('roleId') === constants.roleId_Host) {
                                if (user.get('tenantId') !== null) {
                                    return reject();
                                }
                            } else {
                                if (user.get('tenantId') === null) {
                                    return reject();
                                }
                                if (user.get('profileId') === null) {
                                    return reject();
                                }                                      
                            }
                                resolve(user);
                            }, function(err) {
                                reject();
                            });
                        } catch (err) {
                            reject();
                        }
                    });
                }, 
                findByToken: function(token) {
                    return new Promise(function(resolve, reject) {
                        try {
                            var decodedJWT = jwt.verify(token, 'qwerty098');
                            var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#!');
                            var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                            user.findById(tokenData.id).then(function(user) {
                                if (user) {
                                    resolve(user);
                                } else {
                                    reject();
                                }
                            }, function(err) {
                                reject();
                            });
                        } catch (err) {
                            reject();
                        }
                    });
                }
            },
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'roleId','languageId','profileId','email', 'firstName', 'lastName', 'phone', 
                    'addressLine1','addressLine2','addressLine3','addressLine4', 
                    'createdAt', 'updatedAt');
                },
                generateToken: function(type) {
                    if (!_.isString(type)) {
                        return undefined;
                    }

                    try {
                        var stringData = JSON.stringify({
                            id: this.get('id'),
                            type: type
                        });
                        var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();
                        var token = jwt.sign({
                            token: encryptedData
                        }, 'qwerty098');
                        return token;
                    } catch (err) {
                        console.log(err);
                        return undefined;
                    }
                }
            }
        });

    return user;
}