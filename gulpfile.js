/* eslint-env node */
/* eslint strict:0 */
var gulp = require("gulp");
var insert = require("gulp-file-insert");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-cssnano");
var eslint = require("gulp-eslint");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var size = require("gulp-size");
var runSequnce = require("run-sequence");
var connect = require("gulp-connect");
var Karma = require("karma").Server;
var concat = require("gulp-concat");

var p = function (path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

gulp.task("sass", function() {
    return gulp
      .src(p("src/sass/*.scss"))
      .pipe(sass())
      .pipe(autoprefixer("last 2 version", "> 1%", {cascade: true}))
      .pipe(gulp.dest(p("src/css")));
});

gulp.task("website:css", function() {
    return gulp
        .src([
            p("node_modules/material-design-lite/material.css"),
            p("website/css/styles.css")
        ])
        .pipe(concat("styles.min.css"))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest("website/css"))
        .pipe(connect.reload());
});

gulp.task("website:js", function() {
    return gulp
        .src([
            p("dist/js/alertify.js"),
            p("node_modules/material-design-lite/material.min.js"),
            p("node_modules/angular/angular.min.js"),
            p("dist/js/ngAlertify.js"),
            p("website/js/demo.js")
        ])
        .pipe(concat("all.js"))
        .pipe(gulp.dest(p("website/js")))
        .pipe(connect.reload());
});

gulp.task("css:min", function () {
    return gulp
      .src(p("src/css/**/*.css"))
      .pipe(minifyCSS())
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(p("dist/css")))
      .pipe(connect.reload());
});

gulp.task("lint", function() {
    return gulp
      .src(p("src/js/**/*.js"))
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task("lint:ci", function() {
    return gulp
      .src(p("src/js/**/*.js"))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task("uglify", function () {
    return gulp
        .src(p("src/js/alertify.js"))
        .pipe(insert({"/* style.css */": "dist/css/alertify.css"}))
        .pipe(uglify({ outSourceMap: false }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(p("dist/js")))
        .pipe(connect.reload());
});

gulp.task("js:angular", function() {
    return gulp
        .src(p("src/js/ngAlertify.js"))
        .pipe(insert({"/* alertify.js */": "src/js/alertify.js"}))
        .pipe(insert({"/* style.css */": "dist/css/alertify.css"}))
        .pipe(uglify({ outSourceMap: false }))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(p("dist/js")));
});

gulp.task("connect", function() {
    connect.server({
        root: "website",
        livereload: true,
        port: 3000
    });
});

gulp.task("karma:tdd", function (done) {
    new Karma({
        configFile: __dirname + "/karma.conf.js"
    }, done).start();
});

gulp.task("karma:ci", function (done) {
    new Karma({
        configFile: __dirname + "/karma-ci.conf.js"
    }, done).start();
});

gulp.task("test", ["lint:ci", "karma:ci"]);

gulp.task("watch", function () {

    gulp.watch([
        p("website/**/*.html")
    ], function() {
        gulp.src(p("website/**/*.html")).pipe(connect.reload());
    });

    gulp.watch([
        p("src/sass/**/*.scss"),
        p("src/js/**/*.js")
    ], ["build"]);

    gulp.watch([
        p("dist/js/alertify.js"), p("dist/js/ngAlertify.js"), p("website/js/demo.js")
    ], ["website:js"]);

    gulp.watch([
        p("website/css/styles.css")
    ]), ["website:css"];

});

gulp.task("build", function(cb) {
    runSequnce("sass", "css:min", "lint", "uglify", "js:angular", "website:js", "website:css", cb);
});

gulp.task("default", ["connect", "karma:tdd", "watch"]);
