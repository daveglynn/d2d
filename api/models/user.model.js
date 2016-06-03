/******************************************************************************************************
 model layer
******************************************************************************************************/
"use strict";
var bcrypt = require('../../other_modules/bcryptjs');
var _ = require('underscore')
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        role: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: function(value, next) {
                    if (validator.isEmail(validator.ltrim(value)) === false) {
                        next('The Email is Invalid')
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
                                    next('Email is Already taken')
                                } else {
                                    next()
                                }
                            })
                            .error(function(err) {
                                next(err.message);
                            });
                    } else {
                        next("Email must be entered");
                    }
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isLength: function(value, next) {
                    if (validator.isLength(validator.ltrim(value), { min: 1, max: 50 }) === false) {
                        next('The Length of the first name is incorrect. Max 50 characters.'  )
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
                    if (validator.isLength(validator.ltrim(value), { min: 0, max: 50 }) === false) {
                        next('The Length of the last name is incorrect. Max 50 characters.')
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
                len: [1, 50]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 1000]
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
                len: [6, 100]
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
                    }
                }
            },
            classMethods: {
                authenticate: function(body) {
                    return new Promise(function(resolve, reject) {
                        if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                            return reject();
                        }

                        user.findOne({
                            where: {
                                email: body.email
                            }
                        }).then(function(user) {
                            if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            }
                            resolve(user);
                        }, function(e) {
                            reject();
                        });

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
                            }, function(e) {
                                reject();
                            });
                        } catch (e) {
                            reject();
                        }
                    });
                }
            },
            instanceMethods: {
                toPublicJSON: function() {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'firstName', 'lastName','phone', 'address', 'createdAt', 'updatedAt');
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
                    } catch (e) {
                        console.log(e);
                        return undefined;
                    }
                }



            }
        });

    return user;
}