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
grunt bunyan other
```
where `other` is a task that outputs bunyan logging