/*jslint indent: 2, maxlen: 80, browser: true */
(function (sys) {
  'use strict';

  function runes(r) {
    function i(c) { return (i[c] || c); }
    var a = '';
    if (r.join) { r = r.join(' '); }
    r.replace(/(\S)\S+/g, function (x, c) {
      a += '\\' + c;
      i[c] = x.slice(1);
    });
    a = new RegExp('[' + a + ']', 'g');
    return function (s) { return s.replace(a, i); };
  }
  runes.obj = function (o) {
    var r = o[''];
    delete o[''];
    return JSON.parse(runes(r)(JSON.stringify(o)));
  };

  sys.config(runes.obj({ '': 'µsystemjs- ¶plugin- Ωbabel ¥json ^../',
    baseURL: '^^^^',
    map: {
      'µ¶Ω': 'µ¶Ω/¶Ω.js',
      'µΩ-build': 'µ¶Ω/µΩ-browser.js',
      'µ¶¥': 'µ¶¥/¥.js',
    },
    meta: { '*.¥': { loader: 'µ¶¥' }, },
    transpiler: 'µ¶Ω',
  }));

  sys.import('./4.es.jsm').then(function (imp) {
    var modFunc = imp.default;
    console.log({ modFunc: modFunc });
    console.log(modFunc());
  });
}(window.SystemJS));
