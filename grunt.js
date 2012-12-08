module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg : "<json:package.json>",
		meta : {
			banner : "/**\n" +
			         " * <%= pkg.name %>\n" +
			         " * <%= pkg.description %>\n" +
			         " *\n" +
			         " * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n" +
			         " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
			         " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
			         " * @link <%= pkg.homepage %>\n" +
			         " * @module <%= pkg.name %>\n" +
			         " * @version <%= pkg.version %>\n" +
			         " */"
		},
		concat : {
			dist : {
				src : [
					"<banner>",
					"src/alertify.js"
				],
				dest : "lib/alertify.js"
			}
		},
		lint : {
			all : ["grunt.js", "src/**/*.js"]
		},
		min : {
			"lib/alertify.min.js" : ["<banner>", "lib/alertify.js"]
		},
		qunit : {
			files : ["test/index.html"]
		},
		watch : {
			scripts: {
				files : '<config:lint.files>',
				tasks : 'default'
			}
		},
		jshint : {
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
				es5       : true
			},
			globals : {
				exports : true,
				define  : true
			}
		}
	});

	// Default task.
	grunt.registerTask("default", "lint qunit concat min");
};