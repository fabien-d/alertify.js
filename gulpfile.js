var gulp = require("gulp");
var insert = require("gulp-file-insert");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var qunit = require("gulp-qunit");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var prefix = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var size = require("gulp-size");
var runSequnce = require("run-sequence");

var p = function (path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

gulp.task("sass", function() {
    return gulp
      .src(p("src/sass/*.scss"))
      .pipe(sass())
      .pipe(prefix("last 2 version", "> 1%", {cascade: true}))
      .pipe(gulp.dest(p("src/css")));
});

gulp.task("css:min", function () {
    return gulp
      .src(p("src/css/**/*.css"))
      .pipe(minifyCSS())
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(p("dist/css")));
});

gulp.task("jshint", function() {
    return gulp
      .src(p("src/js/**/*.js"))
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});

gulp.task("jshint:build", function() {
    return gulp
      .src(p("src/js/**/*.js"))
      .pipe(jshint())
      .pipe(jshint.reporter("fail"));
});

gulp.task("uglify", function () {
    return gulp
      .src(p("src/js/alertify.js"))
      .pipe(insert({"/* style.css */": "dist/css/alertify.css"}))
      .pipe(uglify({ outSourceMap: false }))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(p("dist/js")));
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

gulp.task("qunit", function() {
    return gulp
      .src(p("/test/index.html"))
      .pipe(qunit());
});


gulp.task("test", ["jshint:build", "qunit"]);

gulp.task("watch", function () {
    gulp.watch([
      p("src/sass/**/*.scss"),
      p("src/js/**/*.js")
    ], ["build"]);
});

gulp.task("build", function(cb) {
  runSequnce("sass", "css:min", "jshint", "uglify", "js:angular", cb);
});
