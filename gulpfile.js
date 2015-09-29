'use strict';

var fs = require("fs");
var path = require("path");

var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var del = require('del');
// var revCollector = require('gulp-rev-collector');
var gulpReplace = require('gulp-replace');


var CONFIG;

function pregQuote(str, delimiter) {
    // http://kevin.vanzonneveld.net
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

function format(tpl, data, ldel, rdel) {
    ldel = ldel || "{{";
    rdel = rdel || "}}";
    var replacer = new RegExp(pregQuote(ldel) + "\\s*((\\w*)|((\\w+)\\s*\\(\\s*([\\w\\d\\\/\\\\\\.\\-_]*?)\\s*\\)))" + pregQuote(rdel), "g");
    return tpl.replace(
        // /{{\s*((\w*)|((\w+)\s*\(\s*([\w\d\/\\\.\-_]*?)\s*\)))}}/gi,
        replacer,
        function (all, $1, key, $3, fn, args) {
            var value;
            if (key) {
                value = data[key];
            } else if (fn) {
                value = data[fn].call(data, args);
            }
            return value === undefined ? "" : String(value);
        });
}

function inArray(elem, array, k){
    return [].indexOf.apply(array, [elem, k]);
};

gulp.task("build: setConfig", function (){
    CONFIG = require("./build.json");
});

gulp.task("build: setConfigTmp", function (){
    var lastParam = process.argv[process.argv.length - 1];
    if (lastParam.indexOf("-") !== -1){
        CONFIG = require("./pack/buildtmp" + lastParam.substring(1) + ".json");
    }else{
        CONFIG = require("./pack/buildtmp.json");
    }
    
});

gulp.task("build:prepar", function () {
    var widgets = CONFIG.widgets;
    var exclude = CONFIG.exclude;

    var allWidgets = fs.readdirSync(CONFIG.WIDGET_DIR)
        .filter(function (name) {
            return (widgets === "*" || inArray(name, widgets) > -1) && (exclude === "" || inArray(name, exclude) <= -1);
        });

    var allLessFiles = [];
    var allJsFiles = [];
    allWidgets.forEach(function (name) {
        var widgetDir = path.join(CONFIG.WIDGET_DIR, name);
        var lessFiles = fs.readdirSync(widgetDir)
            .filter(function (name) {
                var nameLen = name.length;
                var ext = ".less";
                var extLen = ext.length;
                return nameLen > extLen && name.substring(nameLen - extLen) === ext;
            })
            .map(function (name) {
                return path.join(widgetDir, name);
            });
        allLessFiles.push.apply(allLessFiles, lessFiles);

        var jsFiles = fs.readdirSync(widgetDir)
            .filter(function (name) {
                var nameLen = name.length;
                var ext = ".js";
                var extLen = ext.length;
                return nameLen > extLen && name.substring(nameLen - extLen) === ext;
            })
            .map(function (name) {
                return path.join(widgetDir, name);
            });
        allJsFiles.push.apply(allJsFiles, jsFiles);
    });

    var FS_OPTIONS = {
        encoding: "utf8"
    };

    var lessTpl = fs.readFileSync(CONFIG.LESS_TPL, FS_OPTIONS);
    var lessData = {};

    lessData.namespace = JSON.stringify(CONFIG.NAMESPACE);
    lessData.widgets = allLessFiles.map(function (file) {
        return "@import \"../" + file + "\";"
    }).join("\n");

    fs.writeFileSync(CONFIG.LESS_FILE, format(lessTpl, lessData, "/*!", "*/"));

    var jsTpl = fs.readFileSync(CONFIG.JS_TPL, FS_OPTIONS);
    var jsData = {};
    jsData.widgets = allJsFiles.map(function (file) {
        var code = fs.readFileSync(file, FS_OPTIONS);
        return ";(function($){" + code + "})(Zepto)";
    }).join("\n");
    jsData.read = function (file) {
        return fs.readFileSync(file, FS_OPTIONS);
    };
    jsData.namespace = JSON.stringify(CONFIG.NAMESPACE);
    fs.writeFileSync(CONFIG.JS_FILE, format(jsTpl, jsData, "/*!", "*/"));
});

gulp.task("build:clean", function (cb) {
    del(CONFIG.DIST_DIR,{force:true}, cb)
});

gulp.task("build:js", function () {
    //修改打包后的js文件名
    var lastParam = process.argv[process.argv.length - 1];
    if (lastParam.indexOf("-") !== -1){
        var jsFileName = CONFIG.JS_FILE.replace(/\w+\/|\-\d+\.\w+/g, "");
    }else{
        var jsFileName = CONFIG.JS_FILE.replace(/\w+\/|\.\w+/g, "");
    }
    //return
    gulp
        .src(CONFIG.JS_FILE)
        .pipe($.rename({
            basename: jsFileName
        }))
        .pipe(gulp.dest(CONFIG.DIST_DIR))
        .pipe($.size({
            showFiles: true,
            title: 'source'
        }))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(gulp.dest(CONFIG.DIST_DIR))
        .pipe($.size({
            showFiles: true,
            title: 'minified'
        }))
        .pipe($.size({
            showFiles: true,
            gzip: true,
            title: 'gzipped'
        }));
});

gulp.task("build:css", function () {
    //修改打包后的less文件名
    var lastParam = process.argv[process.argv.length - 1];
    if (lastParam.indexOf("-") !== -1){
        var lessFileName = CONFIG.LESS_FILE.replace(/\w+\/|\-\d+\.\w+/g, "");
    }else{
        var lessFileName = CONFIG.LESS_FILE.replace(/\w+\/|\.\w+/g, "");
    }

    gulp
        .src(CONFIG.LESS_FILE)
        .pipe($.less())
        .pipe($.rename({
            basename: lessFileName
        }))
        .pipe(gulp.dest(CONFIG.DIST_DIR))
        .pipe($.size({
            showFiles: true,
            title: 'source'
        }))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(gulp.dest(CONFIG.DIST_DIR))
        .pipe($.size({
            showFiles: true,
            title: 'minified'
        }))
        .pipe($.size({
            showFiles: true,
            gzip: true,
            title: 'gzipped'
        }));
});

gulp.task("build:font", function () {
    //return
    gulp
        .src(CONFIG.FONT_FILE)
        .pipe(gulp.dest(CONFIG.DIST_DIR))
        .pipe($.size({
            showFiles: true,
            title: 'source'
        }))
        .pipe($.size({
            showFiles: true,
            gzip: true,
            title: 'gzipped'
        }));
});

gulp.task('build:image', function () {
    return gulp.src(CONFIG.WIDGET_DIR + '/**/img/*')
        .pipe($.rename(function (path) {
            //path.basename = path.dirname.split('/')[0]+'_' + path.basename;
            path.dirname = "";
          }))
        .pipe(gulp.dest(CONFIG.DIST_DIR + '/img'));
});

gulp.task('build:md', function () {
    return gulp.src(CONFIG.WIDGET_DIR + '/**/*.md')
        .pipe($.rename(function (path) {
            //path.basename = path.dirname.split('/')[0]+'_' + path.basename;
            if(path.basename==='button'){
                path.basename = 'index';
            }
            path.dirname = "";
          }))
        .pipe(gulp.dest(CONFIG.DIST_DIR + '/docs'));
});

gulp.task('build:samples', function () {
    return gulp.src([CONFIG.WIDGET_DIR + '/**/*.html','!'+CONFIG.WIDGET_DIR + '/**/*.test*.html',])
        .pipe($.rename(function (path) {
            //path.basename = path.dirname.split('/')[0]+'_' + path.basename;
            if(path.basename==='button'){
                //path.basename = 'index';
            }
            path.dirname = "";
          }))
        // 以下为生成官网首页demo使用，本地预览请注释
        .pipe(gulpReplace('../../dist/boost.','/assets/blend2/dist/boost.'))
        // replace css js->cdn
        .pipe(gulp.dest(CONFIG.DIST_DIR + '/samples'));
});


gulp.task("build", ["build: setConfig", "build:prepar", "build:js", "build:css", "build:font", "build:image", "build:md", "build:samples"]);

gulp.task("buildtmp", ["build: setConfigTmp", "build:prepar", "build:js", "build:css", "build:font", "build:image"]);

gulp.task("default", ["build"]);

//gulp.run();
