'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = function (grunt) {

    var stdoutWrite = process.stdout.write;
    var conditions = [];
    grunt.registerTask('bunyan', function () {
        var options = grunt.config('bunyan');
        var names = this.args;
        var args = [];

        if (options.strict) {
            args.push('--strict');
        }

        if (options.level) {
            args.push('--level');
            args.push(options.level);
        }

        if (options.output) {
            args.push('--output');
            args.push(options.output);
        }

        if (names) {
            _.each(names, function (name) {
                conditions.push('this.name === ' + JSON.stringify(name));
            });
        }

        if (conditions.length > 0) {
            args.push('--condition');
            args.push(_.reduce(conditions, function (memo, condition) {
                if (!memo) {
                    return condition;
                } else {
                    return memo + ' || ' + condition;
                }
            }, null));
        }

        var path = './node_modules/bunyan/bin/bunyan';
        if (!fs.existsSync(path)) {
            throw new Error('bundle binary not found');
        }

        var child = spawn(path, args);

        process.stdout.write = function () {
            child.stdin.write.apply(child.stdin, arguments);
        };
        child.stdout.on('data', function (data) {
            stdoutWrite.call(process.stdout, data);
        });
        child.stderr.on('data', function (data) {
            process.stderr.write(data);
        });
        process.on('close', function (code) {
            child.stdin.end();
        });
    });
};