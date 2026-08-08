import { merge as x, compact as w, decode as A, maybeMap as k, combine as h, isOverflow as S } from "./index33.js";
const b = Object.prototype.hasOwnProperty, P = Array.isArray, y = {
  allowDots: !1,
  allowEmptyArrays: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decodeDotInKeys: !1,
  decoder: A,
  delimiter: "&",
  depth: 5,
  duplicates: "combine",
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, E = function(l) {
  return l.replace(/&#(\d+);/g, function(f, e) {
    return String.fromCharCode(parseInt(e, 10));
  });
}, g = function(l, f) {
  return l && typeof l == "string" && f.comma && l.indexOf(",") > -1 ? l.split(",") : l;
}, N = "utf8=%26%2310003%3B", _ = "utf8=%E2%9C%93", L = function(f, e) {
  const n = { __proto__: null }, c = e.ignoreQueryPrefix ? f.replace(/^\?/, "") : f, u = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit, r = c.split(e.delimiter, u);
  let i = -1, t, a = e.charset;
  if (e.charsetSentinel)
    for (t = 0; t < r.length; ++t)
      r[t].indexOf("utf8=") === 0 && (r[t] === _ ? a = "utf-8" : r[t] === N && (a = "iso-8859-1"), i = t, t = r.length);
  for (t = 0; t < r.length; ++t) {
    if (t === i)
      continue;
    const s = r[t], p = s.indexOf("]="), m = p === -1 ? s.indexOf("=") : p + 1;
    let d, o;
    m === -1 ? (d = e.decoder(s, y.decoder, a, "key"), o = e.strictNullHandling ? null : "") : (d = e.decoder(s.slice(0, m), y.decoder, a, "key"), o = k(g(s.slice(m + 1), e), function(j) {
      return e.decoder(j, y.decoder, a, "value");
    })), o && e.interpretNumericEntities && a === "iso-8859-1" && (o = E(o)), s.indexOf("[]=") > -1 && (o = P(o) ? [o] : o);
    const O = b.call(n, d);
    O && e.duplicates === "combine" ? n[d] = h(n[d], o, e.arrayLimit, e.plainObjects) : (!O || e.duplicates === "last") && (n[d] = o);
  }
  return n;
}, I = function(l, f, e, n) {
  let c = n ? f : g(f, e);
  for (let u = l.length - 1; u >= 0; --u) {
    let r;
    const i = l[u];
    if (i === "[]" && e.parseArrays)
      S(c) ? r = c : r = e.allowEmptyArrays && (c === "" || e.strictNullHandling && c === null) ? [] : h([], c, e.arrayLimit, e.plainObjects);
    else {
      r = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      const t = i.charAt(0) === "[" && i.charAt(i.length - 1) === "]" ? i.slice(1, -1) : i, a = e.decodeDotInKeys ? t.replace(/%2E/g, ".") : t, s = parseInt(a, 10);
      !e.parseArrays && a === "" ? r = { 0: c } : !isNaN(s) && i !== a && String(s) === a && s >= 0 && e.parseArrays && s <= e.arrayLimit ? (r = [], r[s] = c) : a !== "__proto__" && (r[a] = c);
    }
    c = r;
  }
  return c;
}, D = function(f, e, n, c) {
  if (!f)
    return;
  const u = n.allowDots ? f.replace(/\.([^.[]+)/g, "[$1]") : f, r = /(\[[^[\]]*])/, i = /(\[[^[\]]*])/g;
  let t = n.depth > 0 && r.exec(u);
  const a = t ? u.slice(0, t.index) : u, s = [];
  if (a) {
    if (!n.plainObjects && b.call(Object.prototype, a) && !n.allowPrototypes)
      return;
    s.push(a);
  }
  let p = 0;
  for (; n.depth > 0 && (t = i.exec(u)) !== null && p < n.depth; ) {
    if (p += 1, !n.plainObjects && b.call(Object.prototype, t[1].slice(1, -1)) && !n.allowPrototypes)
      return;
    s.push(t[1]);
  }
  return t && s.push("[" + u.slice(t.index) + "]"), I(s, e, n, c);
}, Q = function(f) {
  return y;
};
function H(l, f) {
  const e = Q();
  if (l === "" || l === null || typeof l > "u")
    return e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n = typeof l == "string" ? L(l, e) : l;
  let c = e.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const u = Object.keys(n);
  for (let r = 0; r < u.length; ++r) {
    const i = u[r], t = D(i, n[i], e, typeof l == "string");
    c = x(c, t, e);
  }
  return e.allowSparse === !0 ? c : w(c);
}
export {
  H as parse
};
