/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var stats = require('./stats');

require('./rain');  //= `I'm rain and I'm wet!`
require('./rain');  //    (no additional output)
require('./snow');  //= `I'm snow and I'm cold!`
require('./snow');  //    (no additional output)
require('./rain');  //    ^
require('./snow');  //    ^
require('./snow');  //    ^
require('./fire');  //= `I'm fire and I'm hot!`

console.log(stats);
//= `[ incr: [Function], rain: 1, snow: 1, fire: 1 ]`
//                       => all modules used the same instance of "stats".
