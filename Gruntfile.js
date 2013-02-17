var requirejs = require("requirejs");
requirejs.config({
    appDir  : __dirname + "/src/",
    baseUrl : __dirname + "/src/"
});

var generateInit = requirejs("generate");

module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-compass');

    var license = "/*!\n" +
                  " * <%= pkg.name %>.js\n" +
                  " * <%= pkg.description %>\n" +
                  " *\n" +
                  " * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
                  " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
                  " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
                  " * @link <%= pkg.homepage %>\n" +
                  " * @module <%= pkg.name %>\n" +
                  " * @version <%= pkg.version %>\n" +
                  " */";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build: ["build", "dist", "tmp"],
            postbuild: ["build", "tmp"]
        },
        compass: {
            dist: {
                options: {
                    sassDir: "sass",
                    cssDir: "dist/themes",
                    environment: "production",
                    outputStyle: "nested"
                }
            }
        },
        copy: {
            build: {
                files: {
                    "dist/alertify.js": "build/src/alertify.js"
                }
            }
        },
        generateinit : {
            build: {
                src: ["tmp/alertify.init.js"]
            }
        },
        jshint: {
            files: {
                src: ["src/**/*.js"]
            },
            options: {
                curly     : true,
                eqeqeq    : true,
                immed     : true,
                latedef   : true,
                noempty   : true,
                newcap    : true,
                noarg     : true,
                sub       : true,
                undef     : true,
                boss      : true,
                eqnull    : true,
                node      : true,
                smarttabs : true,
                es5       : true,
                globals: {
                    Alertify : true,
                    document : true,
                    require  : true,
                    define   : true
                }
            }
        },
        qunit: {
            all: ["test/**/*.html"]
        },
        requirejs: {
            compile: {
                options: {
                    dir: "build",
                    appDir: ".",
                    baseUrl: "src",
                    optimize: "none",
                    paths: {
                        "alertify.init": "../tmp/alertify.init"
                    },
                    modules: [{
                        "name": "alertify",
                        "include": ["alertify.init"],
                        "create": true
                    }],
                    wrap: {
                        start: license + "\n(function (global, document, undefined) {",
                        end: "})(this, document);"
                    },
                    fileExclusionRegExp: /^(.git|node_modules|example|test)$/,
                    onBuildWrite: function (id, path, contents) {
                        if ((/define\(.*?\{/).test(contents)) {
                            // this whole block is way too hacky
                            // need to figure something cleaner for this
                            var method = contents.match(/return.*;\s\S+[}\)]/);
                            method = method[0].split("\n")[0].replace("new ", "").split(" ")[1].replace("()", "").replace(";", "");
                            contents = contents.replace(/define\(.*?\{/, "var " + method + " = (function () {");
                            contents = contents.replace(/\}\);\s*?$/, "}());");
                        } else if ((/require\([^\{]*?\{/).test(contents)) {
                            contents = contents.replace(/require[^\{]+\{/, "");
                            contents = contents.replace(/\}\);\s*$/, "");
                        }

                        return contents;
                    }
                }
            }
        },
        stripdefine: {
            build: {
                src: ["dist/alertify.js"]
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= pkg.version %> (<%= pkg.author.name %>) | <%= pkg.licenses[0].type %> */\n"
            },
            dist: {
                files: {
                    "dist/alertify.min.js": ["dist/alertify.js"]
                }
            }
        },
        watch: {
            files: "<config:lint.files>",
            tasks: "lint"
        }
    });

    grunt.registerMultiTask("stripdefine", "Strip define call from dist file", function () {
        var mod = grunt.file.read(this.files[0].src[0]).replace("define(\"alertify.init\", function(){});", "");
        grunt.file.write("dist/alertify.js", mod);
    });

    grunt.registerMultiTask("generateinit", "Generate Init file", function () {
        grunt.file.write("tmp/alertify.init.js", generateInit());
    });

    grunt.registerTask("build", ["jshint", "qunit", "clean:build", "generateinit", "requirejs", "copy", "clean:postbuild", "stripdefine", "compass", "uglify"]);
    grunt.registerTask("test", ["jshint", "qunit"]);
    grunt.registerTask("default", ["build"]);
};