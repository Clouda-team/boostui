'use strict';

var http = require("http");
var fs = require("fs");
var child_process = require("child_process");
var urlLib=require('url');
var querystring = require("querystring");
//*
var port = 18080;
/*/
var port = 8775;
//*/

http.createServer(function (request, response){
	if(request.url=='/favicon.ico'){
		response.end('');
		return;
	}

	var url = "", get = {};
	var urlParse = urlLib.parse(request.url);

	urlParse.query && (get = querystring.parse(urlParse.query));
	url = urlParse.pathname.substring(1);

	// 读取页面内容 or 提交widget
	if (url === "makeWidget"){
		
		// 1.修改buildtmp.json
		var CONFIG = require("./buildtmp.json");

		// 生成随机名字文件夹
		var rand = "" + (+new Date) + parseInt(Math.random() * 10000, 10);
		var fileName = "blendui" + rand;
		var tmpPath = "pack/wtmp/" + fileName;
		var buildFile = "pack/buildtmp" + rand + ".json";
 
		fs.mkdirSync(tmpPath);
		CONFIG.DIST_DIR = tmpPath;
		CONFIG.LESS_FILE = "less/boost-" + rand + ".less";
		CONFIG.JS_FILE = "js/boost-" + rand + ".js";
		
		// 处理url参数
		if(get.widget){
			CONFIG.widgets = get.widget.indexOf(",") > -1 ? get.widget.split(",") : [get.widget];
		}else{
			CONFIG.widgets = "*";
		}

		fs.writeFileSync(buildFile, JSON.stringify(CONFIG));

		// 2.执行gulp
		var process = child_process.fork(__dirname + "/../node_modules/gulp/bin/gulp",["buildtmp", "-" + rand],{
			env : {
				HOME:  __dirname + "/../tmp"
			}
		});

		process.on("close", function (code){
			if (code !== 0) {
			    	console.log('gulp process exited with code ' + code);

			    	response.end();
			}else{
				console.log("gulp success!");

				// 3.打包压缩
				var zipCmd = child_process.spawn("zip", ["-r", "-m", fileName + ".zip", fileName], {
					cwd:  __dirname + "/wtmp"
				});
				zipCmd.on("close", function (code){
					if (code !== 0) {
					    	console.log('zip process exited with code ' + code);
					    	response.end();
					}else{
						console.log("zip success!");
						
						// 丢给用户下载
						var zipData = fs.createReadStream(tmpPath + ".zip");
						
					    	response.writeHead(200, {
						      'Content-Type': 'application/zip',
						      'Content-Disposition': 'attachment; filename=' + fileName + '.zip'
					      });

					      zipData.pipe(response);

					      response.on('finish', function (){
					      		// 4.删除zip包
					      		fs.unlink(tmpPath + ".zip");
					      		fs.unlink(buildFile);
					      		fs.unlink(CONFIG.LESS_FILE);
					      		fs.unlink(CONFIG.JS_FILE);
					      });
					}
					
				});

			}
		});
		
	}else if (url.indexOf("dist") !== -1){
		fs.readFile("./" + url, function (err, data){
			if(err){
				response.write('404');
			}else{
				response.write(data);
			}

			response.end();
		});
	}else{
		response.write('404');
		response.end();
	}

}).listen(port);