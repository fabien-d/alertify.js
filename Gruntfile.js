module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

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
            }
        },
        watch: {
            files: '**/*.scss',
            tasks: 'compass'
        }
    });

    grunt.registerTask('default', ['compass']);
};