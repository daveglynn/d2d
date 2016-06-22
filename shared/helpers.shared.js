/******************************************************************************************************
 helpers extension
******************************************************************************************************/
 
var env = process.env.NODE_ENV || 'development';

module.exports = {

 getFunctionName: function (name) {
    
        if (env === 'realproduction') {
            return '';
        } else {
            return name;
        }
    }
}



 