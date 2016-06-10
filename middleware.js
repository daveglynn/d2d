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
			    //var token = req.get('Auth') || '';
 var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE5QVlxYytMTURYUVE3ZUpac2YxT0dMS1RPelQvdGlwMTZwUCtRSGQ1MjJrL3d3dGdwQXRheDJ5VjVaZFE1S2k2TUZ1cTFTb0xWdWFRPT0iLCJpYXQiOjE0NjU1NzYwMTF9.7DidB6HpnJCVRz36YPcdgU8I0RMs7JfX3xw_UDn6Pyg';
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
