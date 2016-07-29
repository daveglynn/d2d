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
define("roleId_Guest", 4);
define("roleId_ReadOnly", 5);

define("tenantId_Demo", 1);
define("profileId_Demo", 1);
define("languageId_Demo", 1);


