'use strict';

var spawn = require('child_process').spawn;

module.exports = function (grunt) {
    grunt.registerTask('bunyan', function (name) {
        var args = [
            '-o',
            'short'
        ];
        if (name) {
            args.push('-c');
            args.push('\'this.name === "' + name + '"\'');
        }
        var child = spawn('./node_modules/bunyan/bin/bunyan', args);

        var write = process.stdout.write;
        process.stdout.write = function () {
            child.stdin.write.apply(child.stdin, arguments);
        };
        child.stdout.on('data', function (data) {
            write.call(process.stdout, data);
        });
        process.on('exit', function (code) {
            child.kill(code);
        });
    });
};