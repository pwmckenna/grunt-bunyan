'use strict';

module.exports = function (grunt) {
    grunt.loadTasks('tasks');
    grunt.initConfig({
        bunyan: {
            output: 'short',
            level: 'trace',
            strict: true,
            time: 'local'
        }
    });
    grunt.registerTask('default', ['bunyan']);
};
