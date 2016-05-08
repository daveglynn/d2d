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
 
define("role_Host", 1);
define("role_Admin", 2);
define("role_User", 3);
define("role_public", 4);
define("role_disabled", 5);
