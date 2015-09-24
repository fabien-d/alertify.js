/* eslint-env node */
/* eslint strict:0 */
var gulp = require("gulp");
var insert = require("gulp-file-insert");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var qunit = require("gulp-qunit");
var eslint = require("gulp-eslint");
var prefix = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var size = require("gulp-size");
var runSequnce = require("run-sequence");
var connect = require("gulp-connect");

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
      .pipe(gulp.dest(p("dist/css")))
      .pipe(connect.reload());
});

gulp.task("lint", function() {
    return gulp
      .src(p("src/js/**/*.js"))
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task("lint:build", function() {
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

gulp.task("qunit", function() {
    return gulp
      .src(p("/test/index.html"))
      .pipe(qunit());
});

gulp.task("connect", function() {
    connect.server({
        root: "website",
        livereload: true,
        port: 3000
    });
});

gulp.task("test", ["lint:build", "qunit"]);

gulp.task("watch", function () {
    var HTML_SRC = p("website/**/*.html");
    gulp.watch([HTML_SRC], function() {
        gulp
            .src(HTML_SRC)
            .pipe(connect.reload());
    });
    gulp.watch([
        p("src/sass/**/*.scss"),
        p("src/js/**/*.js")
    ], ["build"]);
});

gulp.task("build", function(cb) {
    runSequnce("sass", "css:min", "lint", "uglify", "js:angular", cb);
});

gulp.task("default", ["connect", "watch"]);
