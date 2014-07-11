var gulp = require("gulp"),
    uglify = require("gulp-uglifyjs"),
    rename = require("gulp-rename"),
    minifyCSS = require("gulp-minify-css"),
    qunit = require("gulp-qunit"),
    concat = require("gulp-concat");

var p = function (path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

var paths = {
    src: {
        css: {
            all: "src/css/**/*.css",
            core: "src/css/core.css",
            themes: {
                bootstrap: p("src/css/themes/bootstrap/**/*.css"),
                default: p("src/css/themes/default/**/*.css")
            }
        },
        js: p("src/js/**/*.js")
    },
    dest: {
        css: p("dist/css"),
        js: p("dist/js")
    }
};

gulp.task("css-min", function () {

    gulp.src([paths.src.css.core, paths.src.css.themes.default])
        .pipe(minifyCSS())
        .pipe(concat("alertify.css"))
        .pipe(gulp.dest(paths.dest.css));

    gulp.src([paths.src.css.core, paths.src.css.themes.bootstrap])
        .pipe(minifyCSS())
        .pipe(concat("alertify-bootstrap.css"))
        .pipe(gulp.dest(paths.dest.css));

});

gulp.task("test", function () {
    return gulp.src(p("/test/index.html"))
        .pipe(qunit());
});

gulp.task("uglify", function () {
    gulp.src(paths.src.js)
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest(paths.dest.js));

});

gulp.task("watch", function () {
    gulp.watch([paths.src.css.all], ["css-min"]);
    gulp.watch([paths.src.js], ["uglify"]);
});

gulp.task("build", ["uglify", "css-min"]);