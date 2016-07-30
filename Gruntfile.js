module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    'pug': 'grunt-pug-i18n',
    'configureRewriteRules': 'grunt-connect-rewrite',
    'useminPrepare': 'grunt-usemin',
    'configureProxies': 'grunt-connect-proxy'
  });

  // your api dev host
  var devHost = '127.0.0.1';

  var aws = {};
  var ssh = {
    dev: {}
  };
  try { aws = grunt.file.readJSON('aws-keys.json'); } catch(e) {}
  try { ssh = grunt.file.readJSON('ssh-keys.json'); } catch(e) {}

  grunt.initConfig({

    environments: {
      options: {
        local_path: 'src/main/webapp/',
      },
      dev: {
        options: {
          host: devHost,
          username: ssh.dev.username,
          password: ssh.dev.password,
          debug: true,
          current_symlink: 'html',
          deploy_path: '/usr/share/nginx',
          releases_to_keep: '3'
        }
      }
    },

    aws_s3: {
      options: {
        accessKeyId: aws.accessKeyId,
        secretAccessKey: aws.secretAccessKey,
        region: 'us-east-1',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      dev: {
        options: {
          bucket: 'angular-with-maven',
          differential: true
        },
        files: [
          {expand: true, cwd: 'src/main/webapp/', src: ['**', '!**/*.xml']}
        ]
      }
    },

    checkDependencies: {
        npm: {
          options: {
            packageManager: 'npm'
          }
        },
        bower: {
          options: {
            packageManager: 'bower'
          }
        }
    },

    karma: {
      options: {
        background: true,
        singleRun: false
      },
      unit: {
        configFile: 'src/test/karma-conf.js'
      }
    },

    ngAnnotate: {
      sources: {
        files: [
          {
            expand: true,
            src: ['src/main/compiled/**/*.js']
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },

      dist: {
        src: 'src/main/compiled/styles/**/*.css'
      }

    },

    jshint: {
      options: {
        esversion: 6,
        jshintrc: true
      },
      all: ['src/main/assets/js/**/*.js'],
      tests: ['src/test/js/unit/**/*.js']
    },

    filerev: {
      options: {
          algorithm: 'md5',
          length: 8
      },
      images: {
        src: 'src/main/webapp/**/*.{jpg,jpeg,gif,png,webp}'
      },
      css: {
        src: 'src/main/webapp/css/**/*.css'
      },
      js: {
        src: 'src/main/webapp/js/**/*.js'
      }
    },

    filerev_replace: {
      options: {
        assets_root: 'src/main/webapp'
      },
      assets: {
        src: 'src/main/webapp/{css,js}/*.{css,js}'
      },
      html: {
        src: 'src/main/webapp/**/*.html'
      }
    },

    clean: {
      compiled: ['src/main/compiled'],
      webapp: ['src/main/webapp/*']
    },

    copy: {
      webxml: {
        files: [
          { expand: true, cwd: 'profiles/prod', src: ['**/*.xml'], dest: 'src/main/webapp/WEB-INF'}
        ]
      },
      html: {
        files: [
          {
            expand: true, cwd: 'src/main/compiled/templates',
            src: ['**/*.html'],
            dest: 'src/main/webapp',
            rename: function(dest, src) {
              if (src.indexOf('index.en.html') >= 0) {
                return dest + '/' + src.replace(/\.en\.html$/, ".html");
              } else {
                return dest + '/' + src;
              }
            }
          }
        ]
      },
      images: {
        files: [
          { expand: true, cwd: 'src/main/compiled/images', src: ['**/*.*'], dest: 'src/main/webapp/images'}
        ]
      },
      fonts: {
        files: [
          { expand: true, cwd: 'src/main/compiled/fonts', src: ['**/*.*'], dest: 'src/main/webapp/fonts'}
        ]
      },
      locales: {
        files: [
          { expand: true, cwd: 'src/main/assets/locales', src: ['**/*.*'], dest: 'src/main/webapp/locales' }
        ]
      }
    },

    useminPrepare: {
        html: 'src/main/compiled/templates/**/index.*.html',
        options: {
            dest: 'src/main/webapp',
            root: 'src/main/compiled'
        }
    },

    usemin: {
        html: ['src/main/webapp/**/index.html']
    },

    cssmin: {
      options: {
        root: 'app'
      }
    },

    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'src/main/assets/js',
            src: ['**/*.js'],
            dest: 'src/main/compiled/js',
            ext: '.js'
          }]
        }
    },

    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src/main/assets/styles',
          src: ['**/*.styl'],
          dest: 'src/main/compiled/styles',
          ext: '.css'
        }]
      }
    },

    pug: {
      compile: {
        options: {
          debug: false,
          pretty: true,
          basedir: 'src/main/assets/templates',
          i18n: {
            locales: 'src/main/assets/locales/*.json',
            localeExtension: true
          }
        },
        files: [{
          expand: true,
          cwd: 'src/main/assets/templates',
          src: ['**/*.pug'],
          dest: 'src/main/compiled/templates',
          ext: '.html'
        }]
      }
    },

    htmlmin: {
      templates: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src/main/webapp/',
          src: ['**/*.html'],
          dest: 'src/main/webapp/'
        }]
      }
    },

    modernizr: {
      dist: {
          "crawl": false,
          "customTests": [],
          "dest": "src/main/compiled/js/modernizr.js",
          "tests": [
            "flexbox",
            "flexboxlegacy",
            "flexboxtweener"
          ],
          "options": [
            "setClasses"
          ],
          "uglify": true
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/main/assets/js/**/*.js'],
        tasks: ['jshint:all', 'newer:babel'],
      },
      css: {
        files: ['src/main/compiled/styles/**/*.css'],
      },
      pug: {
        files: ['src/main/assets/templates/**/*.pug', 'src/main/assets/locales/*.json'],
        tasks: ['newer:pug']
      },
      stylus: {
        files: ['src/main/assets/styles/**/*.styl'],
        tasks: ['stylus', 'postcss'],
        options: {
          livereload: false
        }
      },
      karma: {
        files: ['src/main/compiled/js/**/*.js'],
        tasks: ['karma:unit:run']
      },
      tests: {
        files: ['src/test/js/unit/**/*.js'],
        tasks: ['jshint:tests']
      }
    },

    symlink: {
      options: {
        overwrite: true,
        force: true
      },

      images: {
        src: 'src/main/assets/images',
        dest: 'src/main/compiled/images'
      },

      locales: {
        src: 'src/main/assets/locales',
        dest: 'src/main/compiled/locales'
      },

      bower: {
        src: 'src/main/bower_components',
        dest: 'src/main/compiled/bower_components'
      },

      fonts: {
        src: 'src/main/assets/fonts',
        dest: 'src/main/compiled/fonts'
      }
    },

    html2js: {
      options: {
        base: 'src/main/webapp/',
        singleModule: true,
        rename: function(name) {
          return '/' + name;
        }
      },
      all: {
        src: ['src/main/webapp/**/*.html', '!**/index.html'],
        dest: 'src/main/webapp/js/templates.js'
      },
    },

    connect: {
      proxies: [{
        context: [
          "!/api/i18n",
          "/api/"
        ],
        host: devHost,
        port: "80",
        headers: {
            "host": devHost,
            "accept-encoding": "deflate"
        }
      }],
      rules: [
        {from: '^/$', to: '/templates/index.en.html'},
        {from: '^/(.*)\.html$', to: '/templates/$1\.html'},
        {from: '^/(.*)/$', to: '/templates/$1/index.en.html'},
        {from: '^/api/i18n/(.*)', to: '/locales/en.json'}
      ],

      http: {
        options: {
          keepalive: false,
          port: 8080,
          base: 'src/main/compiled',
          livereload: true,
          hostname: '127.0.0.1',
          open: {
            target: 'http://localhost:8080/'
          },

          middleware: function (connect, options, defaultMiddleware) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            var rewrite = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

             return [
                rewrite, proxy
             ].concat(defaultMiddleware);
          }

        }
      },
      https: {
        options: {
          protocol: 'https',
          keepalive: false,
          port: 443,
          base: 'src/main/compiled',
          livereload: true,
          hostname: '127.0.0.1',
          open: {
            target: 'https://localhost/'
          },

          middleware: function (connect, options, defaultMiddleware) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            var rewrite = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

             return [
                rewrite, proxy
             ].concat(defaultMiddleware);
          }

        }
      }

    }

  });


  var devTasks = function(connect) {
    return [
      'checkDependencies',
      'symlink:bower',
      'symlink:images',
      'symlink:fonts',
      'symlink:locales',
      'jshint',
      'babel',
      'modernizr',
      'stylus',
      'postcss',
      'pug',
      'configureProxies',
      'configureRewriteRules',
      connect,
      'karma:unit',
      'watch'
    ];
  }

  grunt.registerTask('dev', devTasks('connect:http'));
  grunt.registerTask('dev:https', devTasks('connect:https'));

  grunt.registerTask('build', [
    'clean',
    'checkDependencies',
    'symlink:bower',
    'symlink:images',
    'symlink:fonts',
    'symlink:locales',
    'babel',
    'modernizr',
    'ngAnnotate',
    'stylus',
    'postcss',
    'pug',
    'copy:html', 'copy:images', 'copy:fonts', 'copy:webxml', 'copy:locales',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin:html',
    'htmlmin:templates',
    'html2js:all',
    'filerev',
    'filerev_replace'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ssh_deploy:dev'
  ]);

};
