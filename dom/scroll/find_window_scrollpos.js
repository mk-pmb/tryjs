/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
/*globals window: true, define: true */
(function () {
  'use strict';
  var EX = {};

  EX.findScrollPosition = (function () {
    var copyTo, how;
    copyTo = function exportToWindowOrSomething(destObj) {
      if (destObj) { copyTo.dest = destObj; }
      if (copyTo.dest) { copyTo.dest.findScrollPosition = how; }
    };
    how = function findScrollPosition_proxy(win) {
      return (how.detect || how)(win);
    };
    how.detect = function findScrollPosition_detector(win) {
      if (!win) { win = window; }
      var doc = win.document;
      return (how.mayB('db', doc.body, 'scrollLeft', 'scrollTop')
        || how.mayB('dE', doc.documentElement, 'scrollLeft', 'scrollTop')
        || how.mayB('pO', win, 'pageXOffset', 'pageYOffset')
        || [0, 0]);
    };
    how.mayB = function (strategyName, obj, xProp, yProp) {
      if (EX.findScrollPosition.debug) {
        console.log('strat', strategyName, 'obj', obj, 'x', obj[xProp]);
      }
      if ((obj && typeof obj[xProp]) !== 'number') { return; }
      if ((obj[xProp] === 0) && (obj[yProp] === 0)) { return; }
      how = how.optimize(obj, xProp, yProp);
      how.copyTo = copyTo;
      EX.findScrollPosition = how;
      how.copyTo();
      return how();
    };
    how.optimize = function (o, x, y) {
      return function findScrollPosition_optimized() { return [o[x], o[y]]; };
    };
    how.copyTo = copyTo;
    return how;
  }());


  EX.lurkSetBodyCls = function (win, tolerance) {
    var lurk, body, throttled, tolX = 0, tolY = 0,
      clsRgx = /(^|\s)scrolled-(up|left|vert|horiz)(?=$|\s)/g;
    if (!win) { win = window; }
    switch (tolerance && typeof tolerance) {
    case 'number':
    case 'string':
      tolX = tolY = ((+tolerance) || 0);
      break;
    case 'object':
      tolX = ((+tolerance[0]) || 0);
      tolY = ((+tolerance[1]) || 0);
      break;
    }
    lurk = function () {
      var sp = EX.findScrollPosition(win), sr = (sp[0] > tolX ? 1 : 0),
        sd = (sp[1] > tolY ? 2 : 0), fl = sr + sd;
      if (fl === lurk.flags) { return; }
      lurk.flags = fl;
      sp = body.className;
      sp = sp && String(sp || '').replace(clsRgx, '$1');
      body.className = ('scrolled-' + (sd ? 'vert' : 'up') +
        ' scrolled-' + (sr ? 'horiz' : 'left') + ' ' + (sp || '')
        ).replace(/\s+$/, '');
    };
    throttled = (EX.throttled || (win.setTimeout || false).throttled);
    if (throttled.x) { lurk = throttled.bind(null, lurk, 125); }
    lurk.flags = -1;
    body = win.document.getElementsByTagName('body')[0];
    if (win.addEventListener instanceof Function) {
      win.addEventListener('scroll', lurk, false);
    } else {
      win.attachEvent('onscroll', lurk);
    }
    lurk();
  };


  //$__UMD_EXPORT__$(EX)
  (((typeof module) === 'object') && ((module || false
    ).exports instanceof Object) ? module : {}).exports = EX;
  if (((typeof define) === 'function') && define.amd) { define(EX); }
}());
