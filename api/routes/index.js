/******************************************************************************************************
 route layer
******************************************************************************************************/
"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../.././db.js');
var middleware = require('../.././middleware.js')(db);
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