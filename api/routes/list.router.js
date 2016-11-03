                      
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
var ctrlList = require('../controllers/list.controller.js');

router
    .route('/')
    .post( middleware.requireAuthentication, middleware.requireAuthorisation, ctrlList.addList);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlList.getListsAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlList.getListById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlList.updateList);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlList.deleteList);

	
module.exports = router