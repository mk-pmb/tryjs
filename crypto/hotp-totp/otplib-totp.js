/*jslint indent: 2, maxlen: 80 */
/* -*- tab-width: 2 -*- */
/*globals define:true*/
define(function (require) {
  'use strict';
  var win = require('cjs-minifake://window'), qrystr = require('qrystr'),
    totp = win.otplib.totp, timeSlotDuration_msec = 30e3,
    byid = function (id) { return win.document.getElementById(id); },
    keyIn32 = byid('key32'),
    decodeBase32 = require('hi-base32').decode.asBytes,
    keyIn64 = byid('key64'),
    encodeBase64 = win.btoa,
    decodeBase64 = win.atob,
    tanOut = byid('tan'), freshOut = byid('fresh');


  function cleanUp(tx) {
    // work-around for https://github.com/emn178/hi-base32/issues/8
    return tx.replace(/\W/g, '').toUpperCase();
  }

  function byteArray2binStr(a) { return String.fromCharCode.apply(null, a); }
  function hex2(n) { return ('0' + n.toString(16)).slice(-2); }
  function hex(a) { return a.map(hex2).join(' '); }
  win.hex = hex;

  function readKeyBytes() {
    var tx = keyIn64.value.trim(), key;
    if (keyIn64.cachedText === tx) { return keyIn64.cachedKey; }
    key = decodeBase64(tx.replace(/\-/g, '+').replace(/_/g, '/'));
    keyIn64.cachedKey = key;
    keyIn64.cachedText = tx;
    return key;
  }

  function reTan() {
    if (reTan.timer) { clearTimeout(reTan.timer); }
    var key, tan = '!error!', fail = false,
      dura = timeSlotDuration_msec, now = Date.now(),
      until = Math.ceil(now / dura) * dura, wait;
    try {
      key = readKeyBytes();
      tan = (key ? totp.generate(key).replace(/^(\d{3})/g, '$1 ')
        : '(no key)');
    } catch (err) {
      fail = String(err);
    }
    tanOut.innerHTML = tan;
    wait = Math.max(until + 5 - now, 50);
    freshOut.innerHTML = (fail || String(new Date(until)).slice(16));
    reTan.timer = setTimeout(reTan, wait);
  }
  byid('key64').onchange = reTan;
  byid('key64').onkeyup = reTan;

  (function loadSettings() {
    var qry = qrystr(win.location.hash);
    if (qry.key64) { keyIn64.value = qry.key64; }
  }());

  byid('base32to64').onclick = function () {
    var bytes = decodeBase32(cleanUp(keyIn32.value));
    keyIn64.value = encodeBase64(byteArray2binStr(bytes));
    reTan();
  };

  byid('key2hash').onclick = function () {
    win.location.hash = qrystr({
      key64: keyIn64.value.replace(/\+/g, '-').replace(/\//g, '_'
        ).replace(/\=+$/, '')
    });
  };

  reTan();
});
