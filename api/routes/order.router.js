                      
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
var ctrlOrder = require('../controllers/order.controller.js');

router
    .route('/')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.addOrder);
router
    .route('/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.getOrdersAll);
router
    .route('/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.getOrderById);
router
    .route('/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.updateOrder);
router
    .route('/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.deleteOrder);

	
router
    .route('/order/:orderStatusId')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.getOrdersByOrderStatusId);

router
    .route('/order/:orderTypeId')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlOrder.getOrdersByOrderTypeId);

module.exports = router