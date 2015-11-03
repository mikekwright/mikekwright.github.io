var here = require('path-here');

var siteConfig = {
  entry: { 
    bundle: here('site', 'devEntry.js'),
    bundleStatic: here('site', 'staticEntry.js')
  },
  output: {
    filename: '[name].js', 
    path: here('_deploy')
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

