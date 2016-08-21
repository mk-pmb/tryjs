/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var stats = require('./stats'), prop = 'cold',
  modName = module.filename.match(/(\w+)\.js$/)[1],
  hello = "I'm " + modName + " and I'm " + prop + "!";

stats.incr(modName);
console.log(hello);
module.exports = hello;
