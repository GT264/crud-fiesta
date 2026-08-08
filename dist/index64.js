function i(e, t) {
  if (Object.is(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [n, s] of e) if (!t.has(n) || !Object.is(s, t.get(n))) return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const n of e) if (!t.has(n)) return !1;
    return !0;
  }
  if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime();
  const r = f(e);
  if (r.length !== f(t).length) return !1;
  for (let n = 0; n < r.length; n++) if (!Object.prototype.hasOwnProperty.call(t, r[n]) || !Object.is(e[r[n]], t[r[n]])) return !1;
  return !0;
}
function f(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e));
}
export {
  i as shallow
};
