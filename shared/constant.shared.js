                        
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
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


