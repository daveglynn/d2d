                      
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
var ctrlUser = require('../controllers/user.controller.js');

router
    .route('/')
    .post( ctrlUser.addUser);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.getUsersAll);
router
    .route('/:id(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.getUserById);
router
    .route('/:id(\\d+)/')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.updateUser);
router
    .route('/:id(\\d+)/')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.deleteUser);

	
router
    .route('/language/:languageId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.getUsersByLanguageId);

router
    .route('/role/:roleId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.getUsersByRoleId);

router
    .route('/profile/:profileId(\\d+)/')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.getUsersByProfileId);
 
    router
    .route('/login')
    .post(ctrlUser.login);
router
    .route('/login')
    .delete(middleware.requireAuthentication, ctrlUser.logout);

module.exports = router