                      
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/

/******************************************************************************************************
 router
******************************************************************************************************/
"use strict";
var express = require('express'), app = express();
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);
var ctrlTenant = require('../controllers/tenant.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.addTenant);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.getTenantsAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.getTenantById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.updateTenant);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.deleteTenant);

	 

module.exports = router