module.exports = function ( grunt ) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: {
            build: [ 'lib' ]
        },

        concat: {
            options: {
                stripBanners: false,
                banner: '/**\n' +
                        ' * <%= pkg.name %>\n' +
                        ' * <%= pkg.description %>\n' +
                        ' *\n' +
                        ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                        ' * @copyright <%= pkg.author.name %> <%= grunt.template.today("yyyy") %>\n' +
                        ' * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n' +
                        ' * @link <%= pkg.homepage %>\n' +
                        ' * @module <%= pkg.name %>\n' +
                        ' * @version <%= pkg.version %>\n' +
                        ' */\n'
            },
            dist: {
                src: [
                    'src/intro.js',
                    'src/event.js',
                    'src/dialog.js',
                    'src/alert.js',
                    'src/confirm.js',
                    'src/prompt.js',
                    'src/alertify.js',
                    'src/outro.js'
                ],
                dest: 'lib/alertify.js'
            }
        },

        connect: {
            src: {
                options: {
                    port: 9001,
                    // keepalive: true,
                    base: ''
                }
            },

            examples: {
                options: {
                    port: 9002,
                    keepalive: true,
                    base: ''
                }
            }
        },

        jshint: {
            files: {
                src: [
                    'Gruntfile.js',
                    'lib/alertify.js',
                    'test/specs/*.js'
                ]
            },
            options: {
                jshintrc: '.jshintrc'
            },
        },

        mocha: {
            src: {
                options: {
                    urls: [
                        'http://localhost:9001/test/alertify.html',
                        'http://localhost:9001/test/alertify.min.html'
                    ],
                    log: true,
                    run: true
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= pkg.author.name %> */\n',
                report: 'gzip'
            },
            dist: {
                files: {
                    'lib/alertify.min.js': [ '<banner>', 'lib/alertify.js' ]
                }
            }
        },

        watch: {
            src: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'build' ]
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-mocha' );

    // Default task
    grunt.registerTask( 'build', [ 'clean:build', 'concat', 'uglify' ] );
    grunt.registerTask( 'examples', [ 'connect:examples' ] );
    grunt.registerTask( 'test', [ 'jshint', 'connect:src', 'mocha:src' ] );
    grunt.registerTask( 'default', [ 'build', 'test' ] );
};