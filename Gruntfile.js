module.exports = function(grunt) {
	"use strict";

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['lib']
		},
		concat: {
			options: {
				stripBanners: true,
				banner: "/**\n" +
					 " * <%= pkg.name %>\n" +
					 " * <%= pkg.description %>\n" +
					 " *\n" +
					 " * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
					 " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
					 " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
					 " * @link <%= pkg.homepage %>\n" +
					 " * @module <%= pkg.name %>\n" +
					 " * @version <%= pkg.version %>\n" +
					 " */\n"
			},
			dist: {
				src: ["src/alertify.js"],
				dest: "lib/alertify.js"
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['alertify.js'],
					dest: 'lib/'
				}]
			}
		},
		jshint: {
			files: {
				src: [
					'Gruntfile.js',
					'src/**/*.js',
					'test/**/*.js',
					'!test/qunit/**/*.js'
				]
			},
			options: {
				curly     : false,
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
					document : true,
					alertify : true
				}
			},
		},
		qunit: {
			all: ["test/index.html"]
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
						"<%= grunt.template.today('yyyy-mm-dd') %> */\n"
			},
			dist: {
				files: {
					'lib/alertify.min.js': ['<banner>', 'lib/alertify.js']
				}
			}
		},
	});

	// Default task.
	grunt.registerTask("default", ["jshint", "qunit", "clean:build", "concat", "uglify"]);
};