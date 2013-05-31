'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;
var _ = require('lodash');

module.exports = function (grunt) {
    grunt.registerMultiTask('bunyan', function () {
        console.log('BUNYAN', this.options());
        var args = [];
        var options = {};
        _.extend(options, this.options());
        _.extend(options, this.data);

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

        if (options.conditions) {
            _.each(options.conditions, function (value, key) {
                args.push('--condition');
                args.push('this.' + key + ' === ' + JSON.stringify(value));
            });
        }

        console.log('pwd', process.cwd(), 'args', args);
        var path = './node_modules/bunyan/bin/bunyan';
        if (!fs.existsSync(path)) {
            throw new Error('bundle binary not found');
        }
        var child = spawn(path, args);

        var stdoutWrite = process.stdout.write;
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