                      
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
var ctrlTodo = require('../controllers/todo.controller.js');

router
    .route('/')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.addTodo);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.getTodosAll);
router
    .route('/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.getTodoById);
router
    .route('/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.updateTodo);
router
    .route('/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.deleteTodo);

	
router
    .route('/user/:userId')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.getTodosByUserId);

module.exports = router