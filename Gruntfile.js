'use strict';

module.exports = function (grunt) {
    grunt.loadTasks('tasks');
    grunt.initConfig({
        bunyan: {
            options: {
                output: 'short',
                level: 'trace',
                strict: true
            },
            default: {
                output: 'short',
                level: 'debug',
                strict: false,
                conditions: {
                    name: 'asdf'
                }
            }
        }
    });
    grunt.registerTask('default', ['bunyan']);
};
