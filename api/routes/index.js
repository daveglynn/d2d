/******************************************************************************************************
 route layer
******************************************************************************************************/
"use strict";
var express = require('express'), app = express();
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);

var ctrlUser = require('../controllers/user.controller.js');
var ctrlList = require('../controllers/list.controller.js');
var ctrlProfile = require('../controllers/profile.controller.js');
var ctrlLanguage = require('../controllers/language.controller.js');
var ctrlTenant = require('../controllers/tenant.controller.js');
var ctrlTodo = require('../controllers/todo.controller.js');
var ctrlOrder = require('../controllers/order.controller.js');
 
router.use('/users', require('./user.router.js'));
router.use('/lists', require('./list.router.js'));
router.use('/profiles', require('./profile.router.js'));
router.use('/languages', require('./language.router.js'));
router.use('/tenants', require('./tenant.router.js'));  
router.use('/todos', require('./todo.router.js'));      
router.use('/orders', require('./order.router.js'));    

module.exports = router;