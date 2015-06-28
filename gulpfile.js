var gulp = require("gulp"),
    uglify = require("gulp-uglifyjs"),
    minifyCSS = require("gulp-minify-css"),
    qunit = require("gulp-qunit"),
    concat = require("gulp-concat"),
    jshint = require("gulp-jshint"),
    prefix = require("gulp-autoprefixer"),
    sass = require("gulp-sass");

var p = function (path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
};

var paths = {
    src: {
        sass: { all: "src/sass/**/*.scss" },
        css: {
            base: p("src/css"),
            all: p("src/css/**/*.css"),
            core: p("src/css/core.css"),
            themes: {
                bootstrap3: p("src/css/themes/bootstrap3/**/*.css"),
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

gulp.task("sass", function() {

    gulp.src(paths.src.sass.all)
        .pipe(sass())
        .pipe(prefix("last 5 version", "> 1%", "Explorer 7", "Explorer 8", {cascade: true}))
        .pipe(gulp.dest(paths.src.css.base));

});

gulp.task("css-min", function () {

    gulp.src([paths.src.css.core, paths.src.css.themes.default])
        .pipe(minifyCSS())
        .pipe(concat("alertify.css"))
        .pipe(gulp.dest(paths.dest.css));

    gulp.src([paths.src.css.core, paths.src.css.themes.bootstrap])
        .pipe(minifyCSS())
        .pipe(concat("alertify-bootstrap.css"))
        .pipe(gulp.dest(paths.dest.css));

    gulp.src([paths.src.css.core, paths.src.css.themes.bootstrap3])
        .pipe(minifyCSS())
        .pipe(concat("alertify-bootstrap-3.css"))
        .pipe(gulp.dest(paths.dest.css));

});

gulp.task("jshint", function() {
    return gulp.src(paths.src.js)
    .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("default"));
});

gulp.task("jshint:build", function() {
    return gulp.src(paths.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("uglify", function () {
    gulp.src(paths.src.js)
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest(paths.dest.js));

});

gulp.task("qunit", function() {
    return gulp.src(p("/test/index.html"))
        .pipe(qunit());
});

gulp.task("test", ["jshint:build", "qunit"]);

gulp.task("watch", function () {
    gulp.watch([paths.src.sass.all], ["sass"]);
    gulp.watch([paths.src.css.all], ["css-min"]);
    gulp.watch([paths.src.js], ["jshint", "uglify"]);
});

gulp.task("build", ["uglify", "css-min"]);