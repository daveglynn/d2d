                      
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
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.addItem);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.getItemsAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.getItemById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.updateItem);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.deleteItem);

	
router
    .route('/list/:listId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.getItemsByListId);

router
    .route('/ruleBook/:ruleBookId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.getItemsByRuleBookId);

router
    .route('/parentList/:parentListId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlItem.getItemsByParentListId);

module.exports = router