/******************************************************************************************************
 route layer
******************************************************************************************************/
"use strict";
var express = require('express'), app = express();
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);

var ctrlAccess = require('../controllers/access.controller.js');
var ctrlCompany = require('../controllers/company.controller.js');
var ctrlDivision = require('../controllers/division.controller.js');
var ctrlItem = require('../controllers/item.controller.js');
var ctrlLanguage = require('../controllers/language.controller.js');
var ctrlList = require('../controllers/list.controller.js');
var ctrlObject = require('../controllers/object.controller.js');
var ctrlProfile = require('../controllers/profile.controller.js');
var ctrlRuleBook = require('../controllers/ruleBook.controller.js');
var ctrlTenant = require('../controllers/tenant.controller.js');
var ctrlTodo = require('../controllers/todo.controller.js');
var ctrlUser = require('../controllers/user.controller.js');

router.use('/access', require('./access.router.js'));
router.use('/company', require('./company.router.js'));
router.use('/division', require('./division.router.js'));
router.use('/item', require('./item.router.js'));  
router.use('/language', require('./language.router.js'));
router.use('/list', require('./list.router.js'));
router.use('/object', require('./object.router.js'));
router.use('/profile', require('./profile.router.js'));
router.use('/ruleBook', require('./ruleBook.router.js'));  
router.use('/tenant', require('./tenant.router.js'));  
router.use('/todo', require('./todo.router.js'));      
router.use('/user', require('./user.router.js'));

module.exports = router;