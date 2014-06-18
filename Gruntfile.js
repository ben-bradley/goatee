var serverConfig = require('./server/config');

module.exports = function(grunt) {

  grunt.initConfig({

    // watch the server files & restart both the server & client
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          watch: [ 'server' ],
          ignore: [ 'node_modules/**', 'client/**' ],
          args: [ '--env=dev' ],
          callback: function(nodemon) {
            var config = serverConfig.dev;
            nodemon.on('log', function(event) {
              console.log(event.colour);
            });
            nodemon.once('start', function() {
              setTimeout(function() {
                require('open')(config.server.uri());
              }, 1000);
            });
            nodemon.on('restart', function() {
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', new Date());
              }, 500);
            });
          }
        }
      }
    },

    // watch the client files & restart just the client
    watch: {
      dev: {
        options: {
          livereload: 5309
          //<script src='//localhost:5309/livereload.js'></script>
        },
        files: [
          'client/**/*.html',
          'client/**/*.js',
          '.rebooted'
        ]
      }
    },

    // run both watchers at the same time
    concurrent: {
      dev: {
        tasks: [ 'nodemon:dev', 'watch:dev' ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('server', [ 'concurrent:dev' ])

};
