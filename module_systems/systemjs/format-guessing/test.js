/*jslint indent: 2, maxlen: 80, browser: true */
(function (sys) {
  'use strict';
  sys.import('./4.es.jsm').then(function (imp) {
    var modFunc = imp.default;
    console.log({ modFunc: modFunc });
    console.log(modFunc());
  });
}(window.System));
