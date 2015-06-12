'use strict';

var http = require("http");
var fs = require("fs");
var child_process = require("child_process");
/*
var port = 18080;
/*/
var port = 8775;
//*/

http.createServer(function (request, response){
	var url = "";
	var get = {};
	if (request.url.indexOf('?') !== -1){
		var arr=request.url.split('?');
		url=arr[0].substring(1);

		if(arr[1]){
			if (arr[1].indexOf("&") != -1){
				var arr2=arr[1].split('&');
			}else{
				var arr2 = [arr[1]];
			}
			for(var i=0;i<arr2.length;i++)
			{
				var arr3=arr2[i].split('=');
				if(get[arr3[0]]){
					if(typeof get[arr3[0]] === 'string')
					{
						get[arr3[0]]=[get[arr3[0]]];
						get[arr3[0]].push(arr3[1]);
					}else		//array
					{
						get[arr3[0]].push(arr3[1]);
					}
				}else{
					get[arr3[0]]=arr3[1];
				}
			}
		}
		
	}else{
		url=request.url.substring(1);
		get={};
	}

	// 读取页面内容 or 提交widget
	if (url === "makeWidget"){
		
		// 1.修改buildtmp.json
		var CONFIG = require("./buildtmp.json");

		// 生成随机名字文件夹
		var fileName = "blendui" + (+new Date) + parseInt(Math.random() * 10000, 10);
		var tmpPath = "pack/wtmp/" + fileName;
		fs.mkdirSync(tmpPath);
		CONFIG.DIST_DIR = tmpPath;
		
		// 处理url参数
		if(get.widget){
			CONFIG.widgets = get.widget.indexOf(",") > -1 ? get.widget.split(",") : [get.widget];
		}else{
			CONFIG.widgets = "*";
		}

		fs.writeFileSync("pack/buildtmp.json", JSON.stringify(CONFIG));

		// 2.执行gulp
		var process = child_process.fork(__dirname + "/../node_modules/gulp/bin/gulp",["buildtmp"],{
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
					      });
					}
					
				});

			}
		});
		
	}else if (url.charAt(url.length - 1) === "/"){
		fs.readdir("./" + url, function (err, files){
			if(err){
				response.write('404');
			}else{
				response.write(files.join("\n"));
			}

			response.end();
		});
	}else{
		fs.readFile("./" + url, function (err, data){
			if(err){
				response.write('404');
			}else{
				response.write(data);
			}

			response.end();
		});
	}

}).listen(port);