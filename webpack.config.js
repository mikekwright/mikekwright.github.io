var here = require('path-here');

var siteConfig = {
  context: here('site'), 
  entry: here('site', 'index.js'),
  output: {
    filename: 'bundle.js', 
    path: here('site')
  },
  resolve: {
    extensions: ['', '.js', '.jade', '.md'],
    modulesDirectories: [ 'shared', here('node_modules') ]
  },
  module: {
   loaders: [
      { test: /\.jade$/, loader: 'jade?doctype=xhtml', exclude: here('node_modules') },
      { test: /\.md$/, loader: 'html!markdown', exclude: here('node_modules') }
      //{ test: /\.js?$/, loader: 'babel', exclude: 'node_modules' }
    ]
  }

};

module.exports = siteConfig;

