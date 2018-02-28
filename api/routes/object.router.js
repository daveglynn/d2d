                      
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
var ctrlObject = require('../controllers/object.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.addObject);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectsAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.updateObject);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.deleteObject);

	
router
    .route('/objectType/:objectTypeId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectsByObjectTypeId);

router
    .route('/ruleBook/:ruleBookId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectsByRuleBookId);

router
    .route('/parentList/:parentListId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectsByParentListId);

router
    .route('/role/:roleId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlObject.getObjectsByRoleId);
 

module.exports = router