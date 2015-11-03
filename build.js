var webpack = require('webpack'),
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    here = require('path-here'),
    config = require('./webpack.config'),
    pageBuilder = require('./_deploy/bundleStatic.js');

webpack(config, function(err, stats) {
  if(err) {
    console.log(err);
  } else {
    var output = config.output.path;

    var assets = here('assets');
    var pages = here('site/pages');
    var slides = here('slides');
    var posts = here('posts');

    // First we will copy over the assets
    mkdirp(path.join(output, 'assets'));

    // Second we will copy over the built static pages
    //mkdirp(here(output));
    
    // Third we will copy over the built slides
    mkdirp(path.join(output, 'slides'));
    
    // Finally we will copy over the built posts (directory by directory)
    mkdirp(path.join(output, 'blog')); 

    /*var assets = 'public/assets';
    mkdirp.sync(assets);
    fs.writeFileSync(assets + '/pure.css', fs.readFileSync('bower_components/pure/pure.css'));
    fs.writeFileSync(assets + '/style.css', fs.readFileSync('elements/style.css'));
    
    for(var path in paths.allPaths()) {
      if(path!=='posts') {
        mkdirp.sync('public' + path);
        fs.writeFileSync('public' + path + '/index.html', page(path));
        console.log(path);
      }
    }

    mkdirp.sync('public/blog');
    for(var post in paths.allPosts()) {
      fs.writeFileSync('public/blog/' + post + '.html', page('/blog/' + post));
      console.log('blog/' + post + '.html');
    }
    */

  }

  console.log('build complete');

});

