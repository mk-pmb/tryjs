/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
module.exports = (function () {
  'use strict';
  var EX = {};  // <- container helps me copy-paste stuff into other bundles

  EX.throttled = function (func, soon, retval) {
    if (func.throttleTimer !== undefined) { return retval; }
    func.throttleTimer = setTimeout(function () {
      func.throttleTimer = undefined;
      return func();
    }, soon);
    return retval;
  };

  return EX.throttled;
}());
