/******************************************************************************************************
 middleware
******************************************************************************************************/
"use strict"; 
var cryptojs = require('crypto-js');
var constants = require('./shared/constant.shared');
var _ = require('underscore');
 
 
module.exports = function(db) {

	return {
		    requireAuthentication: function(req, res, next) {
			    var token = req.get('Auth') || '';
			    db.token.findOne({
				    where: { 
					    tokenHash: cryptojs.MD5(token).toString()
				    }
			        }).then(function(tokenInstance) {
				        if (!tokenInstance) {
					        throw new Error();
				        }

				        req.token = tokenInstance;
				        return db.user.findByToken(token);
			        }).then(function(user) {
                        req.user = user;
				        next();
			        }).catch(function() {
				        res.status(401).send();
			        });
            },
            requireAuthorisation: function (req, res, next) {
            
            var role = req.user.role
            var url = req.url
            
            if (url.includes("tenants") && (role !== constants.role_Host)) {
                res.status(401).send();
            } else
                next();
            }
	    };

};
