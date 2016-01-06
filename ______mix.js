var fs = require('fs');
var path = require('path');
var anbu = require('anbu');

var p= path.normalize(__dirname+"\\publish\\html5\\src\\GLOBAL_DATA.js");
var GLOBAL_DATA_STRING=fs.readFileSync(p,{encoding :"utf8"});
GLOBAL_DATA_STRING=anbu.encrypt(GLOBAL_DATA_STRING,1); 
fs.writeFileSync(p,GLOBAL_DATA_STRING,{encoding :"utf8"});
