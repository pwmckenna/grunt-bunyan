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

Usage
-----
```bs
grunt bunyan ...
```
where the `bunyan` task is followed by tasks that output bunyan logging

Filtering
-----
To filter by bunyan log name, simply specify the name as follows
```bs
grunt bunyan:log_name ...
```