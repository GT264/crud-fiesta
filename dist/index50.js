const I = /([0-9]+)/gm;
function h(n) {
  const e = Object.assign((r, t, c) => {
    let s = r.getValue(c), i = t.getValue(c);
    const o = e.resolveDataValue;
    return o && (s = o(s), i = o(i)), e.sort(s, i, r, t, c);
  }, n);
  return e;
}
h({
  resolveDataValue: (n) => C(n).toLowerCase(),
  sort: (n, e) => d(n, e)
});
h({
  resolveDataValue: (n) => C(n),
  sort: (n, e) => d(n, e)
});
h({
  resolveDataValue: (n) => C(n).toLowerCase(),
  sort: (n, e) => p(n, e)
});
h({
  resolveDataValue: (n) => C(n),
  sort: (n, e) => p(n, e)
});
h({
  resolveDataValue: (n) => N(n),
  sort: (n, e) => n > e ? 1 : n < e ? -1 : 0
});
const k = h({ sort: (n, e) => p(n, e) });
function p(n, e) {
  return n === e ? 0 : n > e ? 1 : -1;
}
function N(n) {
  return n instanceof Date ? n.getTime() : n;
}
function C(n) {
  return typeof n == "number" ? isNaN(n) || n === 1 / 0 || n === -1 / 0 ? "" : String(n) : typeof n == "string" ? n : "";
}
function d(n, e) {
  let r = 0, t = 0;
  const c = n.length, s = e.length;
  for (; r < c && t < s; ) {
    const i = g(n.charCodeAt(r)), o = g(e.charCodeAt(t)), a = m(n, r, i), u = m(e, t, o);
    if (!i && !o) {
      const f = v(n, r, a, e, t, u);
      if (f) return f;
      r = a, t = u;
      continue;
    }
    if (i !== o) return i ? 1 : -1;
    const l = w(n, r, a, e, t, u);
    if (l) return l;
    r = a, t = u;
  }
  return L(n, r) - L(e, t);
}
function g(n) {
  return n >= 48 && n <= 57;
}
function m(n, e, r) {
  let t = e + 1;
  for (; t < n.length && g(n.charCodeAt(t)) === r; ) t++;
  return t;
}
function v(n, e, r, t, c, s) {
  const i = r - e, o = s - c, a = i < o ? i : o;
  for (let u = 0; u < a; u++) {
    const l = n.charCodeAt(e + u), f = t.charCodeAt(c + u);
    if (l > f) return 1;
    if (f > l) return -1;
  }
  return i > o ? 1 : o > i ? -1 : 0;
}
function w(n, e, r, t, c, s) {
  let i = e;
  for (; i < r && n.charCodeAt(i) === 48; ) i++;
  let o = c;
  for (; o < s && t.charCodeAt(o) === 48; ) o++;
  const a = r - i, u = s - o;
  if (a === 0 && u === 0) return 0;
  if (a <= 15 && u <= 15) {
    const A = V(n, i, r), D = V(t, o, s);
    return A > D ? 1 : D > A ? -1 : 0;
  }
  const l = parseInt(n.slice(e, r), 10), f = parseInt(t.slice(c, s), 10);
  return l > f ? 1 : f > l ? -1 : 0;
}
function V(n, e, r) {
  let t = 0;
  for (let c = e; c < r; c++) t = t * 10 + n.charCodeAt(c) - 48;
  return t;
}
function L(n, e) {
  let r = 0, t = e;
  for (; t < n.length; )
    r++, t = m(n, t, g(n.charCodeAt(t)));
  return r;
}
export {
  h as constructSortFn,
  I as reSplitAlphaNumeric,
  k as sortFn_basic
};
