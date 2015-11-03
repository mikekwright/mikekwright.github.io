var here = require('path-here');

var siteConfig = {
  context: here('site'), 
  entry: here('site', 'index.js'),
  output: {
    filename: 'bundle.js', 
    path: here('site')
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.jade', '.md'],
    modulesDirectories: [ 'shared', here('node_modules') ]
  },
  module: {
   loaders: [
      { test: /\.js$/, loader: 'babel', query: { presets: ['react', 'es2015'] } },
      { test: /\.jade$/, loader: 'jade?doctype=xhtml', exclude: here('node_modules') },
      { test: /\.md$/, loader: 'html!markdown', exclude: here('node_modules') }
    ]
  }

};

module.exports = siteConfig;

