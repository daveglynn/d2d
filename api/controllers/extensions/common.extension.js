/******************************************************************************************************
 controller common extension
******************************************************************************************************/
"use strict";
var db = require('../../.././db.js');
var _ = require('underscore');
var constants = require('../../.././shared/constant.shared');

module.exports = {

    setClauseAll: function (req, where) {

        return where;

    },

    setClauseTenantId: function (req, where) {

        // allow host role to view all users regardless of tenant
        if (this.modelRoleId(req) != constants.roleId_Host) {
            where.tenantId = this.modelTenantId(req);
        }
        return where;

    },


    setClauseUserId: function (req, where) {

        where.userId = req.user.get('id')
        return where;

    },

    setClauseIdUserId: function (req, where) {

        where.id = parseInt(req.params.id, 10);
        where.userId = req.user.get('id')
        return where;

    },

    setClauseId: function (req) {

        var id = parseInt(req.params.id, 10);
        var where = {
            id: id
        };
        return where;

    },

    setClauseActive: function (query, where) {

        // allow host role to view all users regardless of tenant
        if (this.modelRoleId(req) != constants.roleId_Host) {
            where.active = {
                $eq: true
            };
        }

        if (query.hasOwnProperty('active') && query.active.length > 0) {
            if (query.active == "false") {
                where.active = {
                    $eq: false
                };
            }
            if (query.active == "true") {
                where.active = {
                    $eq: true
                };
            }
        }

        return where;

    },

    setClauseExpired: function (query, where) {

        if (query.hasOwnProperty('expired') && query.expired.length > 0) {
            if (query.expired == "false") {
                where.expired = {
                    $eq: false
                };
            }
            if (query.expired == "true") {
                where.expired = {
                    $eq: true
                };
            }
        }

        return where;

    },

    setClauseChildActive: function (query, where) {

        if (query.hasOwnProperty('childactive') && query.childactive.length > 0) {
            where.active = {
                $eq: query.active
            };
        }

        return where;

    },

    modelUserId: function (req) {

        return req.user.get('id');

    },

    modelTenantId: function (req) {

        return req.user.get('tenantId');

    },

    modelRoleId: function (req) {

        return req.user.get('roleId');

    },

    modelProfileId: function (req) {

        return req.user.get('profileId');

    },

    excludeAttributes: function () {

        var attributes = {
            exclude: ['tenantId']
        };

        return attributes;

    }



};
