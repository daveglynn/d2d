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
var ctrlItem = require('../controllers/item.controller.js');
var ctrlRuleBook = require('../controllers/ruleBook.controller.js');
 
router.use('/user', require('./user.router.js'));
router.use('/list', require('./list.router.js'));
router.use('/profile', require('./profile.router.js'));
router.use('/language', require('./language.router.js'));
router.use('/tenant', require('./tenant.router.js'));  
router.use('/todo', require('./todo.router.js'));      
router.use('/order', require('./order.router.js'));    
router.use('/item', require('./item.router.js'));  
router.use('/ruleBook', require('./ruleBook.router.js'));  

module.exports = router;