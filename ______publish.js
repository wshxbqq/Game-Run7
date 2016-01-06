var fs = require('fs');
var UglifyJS = require("uglify-js");
var path = require('path');
var pngquant = require('node-pngquant-native');

function scanFolder(path){
    var fileList = [],
        folderList = [],
        walk = function(path, fileList, folderList){
            files = fs.readdirSync(path);
            files.forEach(function(item) {  
                var tmpPath = path + '\\' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {  
                    walk(tmpPath, fileList, folderList); 
                    folderList.push(tmpPath); 
                } else {  
                    fileList.push(tmpPath); 
                }  
            });  
        };  

    walk(path, fileList, folderList);

 

    return {
        'files': fileList,
        'folders': folderList
    }
}





function mkdirsSync(dirname, mode){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname), mode)){
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}
 
var srcPath=path.normalize(__dirname+"\\src");

var result=scanFolder(srcPath);



for(var i in result.folders){
	var p=path.normalize(__dirname+"\\publish\\html5\\src\\"+result.folders[i].replace(__dirname+"\\src\\",""));
	mkdirsSync(p);
}

for(var j in result.files){
	var r = UglifyJS.minify(result.files[j]);
	var p=path.normalize(__dirname+"\\publish\\html5\\src\\"+result.files[j].replace(__dirname+"\\src\\",""));
	fs.writeFileSync(p, r.code, 'utf8');
}

