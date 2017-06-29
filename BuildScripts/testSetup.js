


//transpile with babel before the automate unit tests run
require("babel-register")();



//disable webpack css loader that Mocha does not understand
require.extensions['.css']= function() {};
