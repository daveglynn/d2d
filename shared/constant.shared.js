/******************************************************************************************************
 constants extension
******************************************************************************************************/
"use strict";

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
 
define("roleId_Host", 1);
define("roleId_Admin", 2);
define("roleId_User", 3);

