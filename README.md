grunt-bunyan
==========

Grunt plugin for piping grunt output through bunyan cli.

Installation
------------

Install grunt-bunyan using npm:

```
$ npm install grunt-bunyan
```

Then add this line to your project's *Gruntfile.js*:

```javascript
grunt.loadNpmTasks('grunt-bunyan');
```

Configuration
-----
```js
grunt.initConfig({
    bunyan: {
        options: {
            strict: true // prevent non-bunyan logs from being outputted
        },
        'bunyan-log-name-1': {
            level: 'trace', // show all the things!
            output: 'short', // least verbose
            conditions: {
                name: 'bunyan-log-name-1' // only output by this bunyan log instance will be displayed
            }
        }
  }
});
```
Usage
-----
```bs
grunt bunyan:bunyan-log-name-1 ...
```
where the `bunyan` task is followed by tasks that output bunyan logging that you wish to filter

