//var template = require('jade?includeInline=false!./template.jade')();
//document.write(template);
var template = require('html!markdown!./template.md');
console.log(template);
console.log(template());
document.write(template);
