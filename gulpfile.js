'use strict';

var fs = require("fs");
var path = require("path");

var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var del = require('del');
//var debug = require('gulp-debug');
//var less = require("gulp-less");

//var tap = require("gulp-tap");
//var coffee = require('gulp-coffee');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var sourcemaps = require('gulp-sourcemaps');
//var less = require("gulp-less");
//var through = require("through");


var CONFIG = require("./build.json");

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
            //console.log("key:", key, "\n", "fn:", fn, "\n", "args:", args);
            //console.log(arguments);
            var value;
            if (key) {
                value = data[key];
            } else if (fn) {
                value = data[fn].call(data, args);
            }
            return value === undefined ? "" : String(value);
        });
}

gulp.task("build:prepar", function () {
    var widgets = CONFIG.widgets;

    var allWidgets = fs.readdirSync(CONFIG.WIDGET_DIR)
        .filter(function (name) {
            return widgets === "*" || widgets.indexOf(name) > -1;
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
    fs.writeFileSync(CONFIG.JS_FILE, format(jsTpl, jsData, "/*!", "*/"));
});

gulp.task("build:clean", function (cb) {
    del(CONFIG.DIST_DIR, cb)
});

gulp.task("build:js", function () {
    //return 
    gulp
        .src(CONFIG.JS_FILE)
        .pipe($.uglify())
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
    //return 
    gulp
        .src(CONFIG.LESS_FILE)
        .pipe($.less())
        .pipe($.minifyCss())
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

gulp.task("build", ["build:clean", "build:prepar", "build:js", "build:css"]);
//gulp.task("build", ["build:clean", "build:prepar", "build:css"]);
gulp.task("default", ["build"]);

//gulp.run();
