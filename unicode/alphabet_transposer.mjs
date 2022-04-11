// -*- coding: utf-8, tab-width: 2 -*-
/* eslint-env browser */

function byid(id) { return document.getElementById(id); }

function cpa(s) { return (s && s.codePointAt(0)); }
cpa.ucA = cpa('A');
cpa.lcA = cpa('a');
cpa.one = cpa('1');

function fcp(c) { return (c ? String.fromCodePoint(c) : ''); }
function toHex(c) { return c && c.toString(16); }
function lcStr(x) { return String(x).toLowerCase(); }
function entry2cls([k, v]) { return (v && (!v.call) && (lcStr(k) + '-' + v)); }

function replaceAlphabet(al, orig, uc, lc, num) {
  const c = cpa(orig);
  if (uc && al.ucC) { return fcp(al.ucC + c - cpa.ucA); }
  if (lc && al.lcC) { return fcp(al.lcC + c - cpa.lcA); }
  if (num) {
    if (num === '0') { return (al.zero || orig); }
    if (al.one) { return fcp(al.c1 + c - cpa.one); }
  }
  return orig;
}
replaceAlphabet.rgx = /([A-Z])|([a-z])|(\d)/g;

const uniKeys = [
  'ucA',
  'lcA',
  'one',
  'zero',
];

const alDefs = byid('al');
const inText = byid('tx');

function cleanAlDefs() {
  let v = alDefs.value;
  v = v.replace(/\([^\(\)]*\)/g, '');
  v = v.replace(/(^|:|\s)U\+(\w+) [ -~]*/g,
    function unu(m, b, h) { return b + fcp(parseInt(m && h, 16)); });
  v = v.replace(/\n\s*\^/g, '');
  v = v.replace(/(\n)\s+/g, '$1');
  return v;
}
alDefs.value = cleanAlDefs();


function transpose() {
  const alphabets = cleanAlDefs().match(/\S+/g).map(function learn(m) {
    const [mUc, mLc, m0, m1] = m.split(':');
    const al = {};
    al.ucA = mUc;
    al.ucC = cpa(al.ucA);
    al.lcA = (mLc || mUc);
    al.lcC = cpa(al.lcA);
    al.zero = (m0 || '');
    al.c0 = cpa(al.zero);
    (function one() {
      if (m1) {
        al.one = m1;
        al.c1 = cpa(m1);
        return 1;
      }
      if (al.c0) {
        al.c1 = al.c0 + 1;
        al.one = fcp(al.c1);
        return 0;
      }
    }());
    al.rpl = replaceAlphabet.bind(null, al);
    return al;
  });
  const userText = inText.value.trim();
  const dest = byid('out');
  dest.innerHTML = '';
  alphabets.forEach(function render(al) {
    const li = document.createElement('li');
    uniKeys.forEach(k => li.setAttribute(k.toLowerCase(), (al[k] || '')));
    const ds = {
      ...al,
      ucH: toHex(al.ucC),
      lcH: toHex(al.lcC),
      h0: toHex(al.c0),
      h1: toHex(al.c1),
    };
    uniKeys.forEach(k => delete ds[k]);
    li.className = Object.entries(ds).map(entry2cls).filter(Boolean).join(' ');
    const hint = document.querySelector('#hint-' + ds.ucH);
    if (hint) {
      const hp = document.createElement('p');
      hp.className = 'hint';
      hp.innerHTML += hint.innerHTML;
      li.appendChild(hp);
    }
    const txp = document.createElement('p');
    txp.className = 'tx';
    txp.innerText = userText.replace(replaceAlphabet.rgx, al.rpl);
    li.appendChild(txp);
    dest.appendChild(li);
  });
}

document.forms[0].onsubmit = transpose;
inText.onkeyup = transpose;

transpose();
