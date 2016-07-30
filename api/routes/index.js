/******************************************************************************************************
 route layer
******************************************************************************************************/
"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);
var ctrlProfile = require('../controllers/profile.controller.js');
var ctrlLanguage = require('../controllers/language.controller.js');
var ctrlUser = require('../controllers/user.controller.js');
var ctrlTenant = require('../controllers/tenant.controller.js');
var ctrlOrder = require('../controllers/order.controller.js');
var ctrlTodo = require('../controllers/todo.controller.js');



router
    .route('/users')
    .post(ctrlUser.usersPost);
router
    .route('/users/login')
    .post(ctrlUser.usersLogin);
router
     .route('/users/login')
    .delete(middleware.requireAuthentication, ctrlUser.usersLogout);
router
    .route('/users/all')
    .get(middleware.requireAuthentication,ctrlUser.usersGetAll);
router
    .route('/users/email/:email')
    .get(ctrlUser.userCheckExistsEmail);
router
    .route('/users/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.usersGetById);
router
    .route('/users/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlUser.usersDelete);
router
    .route('/users/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation,  ctrlUser.usersPut);

router
    .route('/profiles')
    .post(middleware.requireAuthentication,  ctrlProfile.profilesPost);
router 
    .route('/profiles/all')
    .get(middleware.requireAuthentication,ctrlProfile.profilesGetAll);
router
    .route('/profiles/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlProfile.profilesGetById);
router
    .route('/profiles/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlProfile.profilesDelete);
router
    .route('/profiles/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation,  ctrlProfile.profilesPut);

router
    .route('/languages')
    .post(middleware.requireAuthentication,  ctrlProfile.languagesPost);
router
    .route('/languages/all')
    .get(middleware.requireAuthentication,ctrlProfile.languagesGetAll);
router
    .route('/languages/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlProfile.languagesGetById);
router
    .route('/languages/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlProfile.languagesDelete);
router
    .route('/languages/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation,  ctrlProfile.languagesPut);
        
   
router
    .route('/tenants/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.tenantsGetAll);
router
    .route('/tenants/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.tenantsGetById);
router
    .route('/tenants')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.tenantsPost);
router
    .route('/tenants/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.tenantsDelete);
router
    .route('/tenants/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTenant.tenantsPut);

      
router
    .route('/todos')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlTodo.todosGetByUserId);
router
    .route('/todos/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlTodo.todosGetAll);
router
    .route('/todos/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation, ctrlTodo.todosGetById);
router
    .route('/todos')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlTodo.todosPost);
router
    .route('/todos/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlTodo.todosDelete);
router
    .route('/todos/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlTodo.todosPut);


router
    .route('/orders/all')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlOrder.ordersGetAll);
router
    .route('/orders/:id')
    .get(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlOrder.ordersGetById);
router
    .route('/orders')
    .post(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlOrder.ordersPost);
router
    .route('/orders/:id')
    .delete(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlOrder.ordersDelete);
router
    .route('/orders/:id')
    .put(middleware.requireAuthentication, middleware.requireAuthorisation,ctrlOrder.ordersPut);

module.exports = router;