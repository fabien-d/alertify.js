var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    minifyCSS = require("gulp-minify-css"),
    qunit = require("gulp-qunit"),
    concat = require("gulp-concat"),
    jshint = require("gulp-jshint"),
    prefix = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    size = require("gulp-size");

var p = function (path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

gulp.task("sass", function() {
    gulp.src(p("src/sass/*.scss"))
        .pipe(sass())
        .pipe(prefix("last 4 version", "> 1%", {cascade: true}))
        .pipe(gulp.dest(p("src/css")));
});

gulp.task("css:min", function () {
    gulp.src(p("src/css/**/*.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest(p("dist/css")));
});

gulp.task("jshint", function() {
    return gulp.src(p("src/js/**/*.js"))
    .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("jshint:build", function() {
    return gulp.src(p("src/js/**/*.js"))
        .pipe(jshint())
        .pipe(jshint.reporter("fail"));
});

gulp.task("uglify", function () {
    gulp.src(p("src/js/**/*.js"))
        .pipe(uglify({ outSourceMap: false }))
        .pipe(size({ gzip: true }))
        .pipe(gulp.dest(p("dist/js")));
});

gulp.task("qunit", function() {
    return gulp.src(p("/test/index.html"))
        .pipe(qunit());
});

gulp.task("test", ["jshint:build", "qunit"]);

gulp.task("watch", function () {
    gulp.watch(p("src/sass/**/*.scss"), ["sass"]);
    gulp.watch(p("src/css/**/*.css"), ["css:min"]);
    gulp.watch(p("src/js/**/*.js"), ["jshint", "uglify"]);
});

gulp.task("build", ["uglify", "css:min"]);
