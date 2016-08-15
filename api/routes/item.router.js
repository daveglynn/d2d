                        
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
var ctrlItem = require('../controllers/item.controller.js');

router
    .route('/')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.itemsPost);
router
    .route('/all')
	.get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.itemsGetAll);
router
    .route('/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.itemsGetById);
router
    .route('/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.itemsPut);
router
    .route('/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.itemsDelete);

module.exports = router
