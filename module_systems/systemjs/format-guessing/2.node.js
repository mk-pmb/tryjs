/*jslint indent: 2, maxlen: 80, node: true */
'use strict';
var info = require('./1.json');
function greet() {
  return info.greeting + ' ' + info.audience;
}
module.exports = greet;
