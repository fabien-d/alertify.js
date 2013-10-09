module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    environment: 'production'
                    // outputStyle: 'nested'
                }
            },
            latest: {
                options: {
                    sassDir: '0.5.0/assets/sass',
                    cssDir: '0.5.0/assets/css',
                    environment: 'production'
                    // outputStyle: 'nested'
                }
            }
        },
        connect: {
            dist: {
                options: {
                    port: 9001,
                    keepalive: true,
                    base: ''
                }
            }
        },
        watch: {
            files: '**/*.scss',
            tasks: 'compass'
        }
    });

    grunt.registerTask('default', ['compass']);
    grunt.registerTask('example', ['compass', 'connect']);
};