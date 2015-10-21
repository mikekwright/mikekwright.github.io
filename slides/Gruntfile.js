var shell = require('shelljs');

var buildDir = 'build';
var siteDir = 'site';
var deployDir = 'deploy';

module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true, 
          cwd: 'src/jade',
          src: '*.jade',
          //src: '**/*.jade',
          dest: buildDir,
          ext: '.html'
        }, {
          expand: true, 
          cwd: 'src/jade/alianza', 
          src: '*.jade', 
          dest: buildDir, 
          ext: '.html'
        }]
      }
    },
    less: {
      build: {
        options: {
          paths: [buildDir + '/css']
        },
        files: {
          'build/css/site.css': 'src/less/site.less',
          'build/css/custom.css': 'src/less/custom.less',
          'build/css/alianza.css': 'src/less/alianza.less'
        }
      }
    },
    copy: {
      build: {
        files: [{
          expand: true, 
          src: ['lib/**'],
          dest: buildDir
        }, {
          expand: true,
          src: ['plugin/**'],
          dest: buildDir
        }, {
          expand: true, 
          cwd: 'src/',
          src: ['img/**'], 
          dest: buildDir
        }, {
          expand: true,
          cwd: 'src/',
          src: ['js/**'], 
          dest: buildDir
        }, {
          expand: true,
          cwd: 'src/',
          src: ['css/**'], 
          dest: buildDir
        }]
      },
      publish: {
        files: [{
          expand: true, 
          cwd: buildDir, 
          src: ['**'], 
          dest: siteDir
        }]
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*', 'Gruntfile.js'],
        tasks: ['preview'],
        options: {
          spawn: true,
          interrupt: true
        }
      } 
    },
    clean: [buildDir + '/**/*']
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('sayHello', 'Say Hi!', function() {
    grunt.log.write('Hello!!!').ok();
  });

  grunt.registerTask('setupRepo', 'Create the gh-pages directory for current project', function() {
    var original =  process.cwd();
    process.chdir(siteDir);
    try {
      shell.exec('git reset HEAD --hard');
      shell.exec('git pull origin gh-pages');
      shell.exec('rm -rf *');
    } catch (err) {
      grunt.log.write('Errors while trying to push to gh-pages');
    }
    process.chdir(original);

    grunt.log.write('TODO: mkw').ok();
  });

  grunt.registerTask('pushChanges', 'Push site changes to github', function() {
    var original =  process.cwd();
    process.chdir(siteDir);
    try {
      shell.exec('git add . -A');
      shell.exec('git commit -am "Pages Published"');
      shell.exec('git push origin gh-pages');
    } catch (err) {
      grunt.log.write('Errors while trying to push to gh-pages').fail();
    }
    process.chdir(original);

    grunt.log.write('gh-pages push successful').ok();
  });

  grunt.registerTask('startServer', 'Start a static server', function() {
    var original =  process.cwd();
    process.chdir(buildDir);
    try {
      shell.exec('node ../node_modules/static-server/bin/static-server.js');
    } catch (err) {
      grunt.log.write('Server stopped').ok();
    }
    process.chdir(original);
  });

  grunt.registerTask('runDeploy', 'Run the pages deploy', function() {
    var original = process.cwd();
    shell.exec('rm -rf ' + deployDir);
    shell.exec('git clone -b master https://github.com/fs-help-training/fs-help-training.github.io ' + deployDir);
    process.chdir(deployDir);
    shell.exec('rm -rf *');
    shell.exec('cp -r ../build/* .');
    shell.exec('git add . && git commit -m "Running deploy"');
    shell.exec('git push origin master --force');
    process.chdir(original);
  });

  grunt.registerTask('deploy', ['build', 'runDeploy']);
  grunt.registerTask('build', ['clean', 'jade:compile', 'less', 'copy:build']);
  grunt.registerTask('preview', ['build']); //, 'startServer']);
  grunt.registerTask('publish', ['build', 'setupRepo', 'copy:publish', 'pushChanges']);
  grunt.registerTask('default', ['build']);
};

