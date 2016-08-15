                        
/******************************************************************************************************
 
 Copyright 2016 Olympus Consultancy Limited - All Rights Reserved 
 You may NOT use, copy, distribute or modify this code unless you have written 
 consent from the author which may be obtained from emailing dave@ocl.ie 

******************************************************************************************************/
 
/******************************************************************************************************
 helpers extension
******************************************************************************************************/
 
var env = process.env.NODE_ENV || 'development';

module.exports = {
    
    setDebugInfo: function (e,file,func, info) {
        
        if (env === 'realproduction') {
            return '';
        } else {
            e.file = file
            e.info = info
            e.func = func
            return e;
        }
    },

 getFunctionName: function (name) {
    
        if (env === 'realproduction') {
            return '';
        } else {
            return name;
        }
    }
}



 