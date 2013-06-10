'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = function (grunt) {

    var stdoutWrite = process.stdout.write;
    var conditions = [];
    grunt.registerTask('bunyan', function () {
        var options = grunt.config('bunyan') || {};
        var args = [];

        var strict = options.strict || grunt.option('strict');
        if (strict) {
            args.push('--strict');
        }

        var level = options.level || grunt.option('level');
        if (level) {
            args.push('--level');
            args.push(level);
        }

        var output = options.output || grunt.option('output');
        if (output) {
            args.push('--output');
            args.push(output);
        }

        var names = this.args;
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

        var child = spawn(path, args, {
            stdio: ['pipe', process.stdout, process.stderr]
        });
        process.stdout.write = function () {
            child.stdin.write.apply(child.stdin, arguments);
        };
        process.stderr.write = function () {
            child.stdin.write.apply(child.stdin, arguments);
        }
    });
};