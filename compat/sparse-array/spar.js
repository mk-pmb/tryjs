/*jslint indent: 2, maxlen: 80, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';

  var arrPt = Array.prototype, factories;

  function flag(n, b) {
    return (b ? '+' + n.toUpperCase() + ' ' : ' ' + n + '\u2212');
  }

  function deleteElem(a, i) {
    delete a[i];
    return a;
  }

  function setElem(a, i, v) {
    a[i] = v;
    return a;
  }

  function rpad10(x) { return (String(x) + '             ').substr(0, 10); }

  function checkElem(a, i) {
    var facts = (flag('has',   Object.prototype.hasOwnProperty.call(a, i))
      + ' ' + flag('in', (i in a))
      + ' ' + rpad10(a[i])
      + ' ' + rpad10(a.join(':'))
      );
    facts += ' ' + rpad10(a.splice(i, 1)[0]);
    return facts.replace(/\s+$/, '');
  }


  function checkOneSubject(name) {
    var f = factories[name], i = 1;
    console.log(name + ':');
    console.log('    orig:  ' + checkElem(f(), i));
    arrPt[i] = true;
    console.log('    mod :  ' + checkElem(f(), i));
    delete arrPt[i];
  }

  factories = (function () {
    var f = {};
    f.undef = function () { return [0, undefined, 2]; };
    f.unset = function () { return setElem([0, 1, 2], 1, undefined); };
    f.del   = function () { return deleteElem([0, 1, 2], 1); };
    f.set   = function () { return setElem([0], 2, 2); };
    return f;
  }());

  checkOneSubject('del');
  checkOneSubject('set');
  checkOneSubject('undef');
  checkOneSubject('unset');














}());
