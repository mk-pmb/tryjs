/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var stats = [];
stats.incr = function (key) { stats[key] = (stats[key] || 0) + 1; }

module.exports = stats;
