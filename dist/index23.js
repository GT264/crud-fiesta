import { encode as x, maybeMap as Q, isBuffer as G } from "./index37.js";
import M, { formatters as O } from "./index36.js";
const U = Object.prototype.hasOwnProperty, V = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, o) {
    return e + "[" + o + "]";
  },
  repeat: function(e) {
    return e;
  }
}, u = Array.isArray, _ = Array.prototype.push, B = function(a, e) {
  _.apply(a, u(e) ? e : [e]);
}, q = Date.prototype.toISOString, H = M, r = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: x,
  encodeValuesOnly: !1,
  format: H,
  formatter: O[H],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return q.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, J = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, P = {}, C = function(e, o, n, l, f, c, d, b, s, y, m, p, h, E, g, k, N, K) {
  let t = e, S = K, T = 0, v = !1;
  for (; (S = S.get(P)) !== void 0 && !v; ) {
    const i = S.get(e);
    if (T += 1, typeof i < "u") {
      if (i === T)
        throw new RangeError("Cyclic object value");
      v = !0;
    }
    typeof S.get(P) > "u" && (T = 0);
  }
  if (typeof y == "function" ? t = y(o, t) : t instanceof Date ? t = h(t) : n === "comma" && u(t) && (t = Q(t, function(i) {
    return i instanceof Date ? h(i) : i;
  })), t === null) {
    if (c)
      return s && !k ? s(o, r.encoder, N, "key", E) : o;
    t = "";
  }
  if (J(t) || G(t)) {
    if (s) {
      const i = k ? o : s(o, r.encoder, N, "key", E);
      return [
        g(i) + "=" + g(s(t, r.encoder, N, "value", E))
      ];
    }
    return [g(o) + "=" + g(String(t))];
  }
  const I = [];
  if (typeof t > "u")
    return I;
  let D;
  if (n === "comma" && u(t))
    k && s && (t = Q(t, s)), D = [{ value: t.length > 0 ? t.join(",") || null : void 0 }];
  else if (u(y))
    D = y;
  else {
    const i = Object.keys(t);
    D = m ? i.sort(m) : i;
  }
  const z = b ? o.replace(/\./g, "%2E") : o, j = l && u(t) && t.length === 1 ? z + "[]" : z;
  if (f && u(t) && t.length === 0)
    return j + "[]";
  for (let i = 0; i < D.length; ++i) {
    const w = D[i], A = typeof w == "object" && typeof w.value < "u" ? w.value : t[w];
    if (d && A === null)
      continue;
    const F = p && b ? w.replace(/\./g, "%2E") : w, W = u(t) ? typeof n == "function" ? n(j, F) : j : j + (p ? "." + F : "[" + F + "]");
    K.set(e, T);
    const R = /* @__PURE__ */ new WeakMap();
    R.set(P, K), B(
      I,
      C(
        A,
        W,
        n,
        l,
        f,
        c,
        d,
        b,
        n === "comma" && k && u(t) ? null : s,
        y,
        m,
        p,
        h,
        E,
        g,
        k,
        N,
        R
      )
    );
  }
  return I;
}, L = function(e) {
  if (!e)
    return r;
  if (typeof e.allowEmptyArrays < "u" && typeof e.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof e.encodeDotInKeys < "u" && typeof e.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const o = e.charset || r.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let n = M;
  if (typeof e.format < "u") {
    if (!U.call(O, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  const l = O[n];
  let f = r.filter;
  (typeof e.filter == "function" || u(e.filter)) && (f = e.filter);
  let c;
  if (e.arrayFormat in V ? c = e.arrayFormat : "indices" in e ? c = e.indices ? "indices" : "repeat" : c = r.arrayFormat, "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const d = typeof e.allowDots > "u" ? e.encodeDotInKeys === !0 ? !0 : r.allowDots : !!e.allowDots;
  return {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : r.addQueryPrefix,
    allowDots: d,
    allowEmptyArrays: typeof e.allowEmptyArrays == "boolean" ? !!e.allowEmptyArrays : r.allowEmptyArrays,
    arrayFormat: c,
    charset: o,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : r.charsetSentinel,
    commaRoundTrip: e.commaRoundTrip,
    delimiter: typeof e.delimiter > "u" ? r.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : r.encode,
    encodeDotInKeys: typeof e.encodeDotInKeys == "boolean" ? e.encodeDotInKeys : r.encodeDotInKeys,
    encoder: typeof e.encoder == "function" ? e.encoder : r.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : r.encodeValuesOnly,
    filter: f,
    format: n,
    formatter: l,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : r.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : r.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : r.strictNullHandling
  };
};
function Z(a, e) {
  let o = a;
  const n = L(e);
  let l, f;
  typeof n.filter == "function" ? (f = n.filter, o = f("", o)) : u(n.filter) && (f = n.filter, l = f);
  const c = [];
  if (typeof o != "object" || o === null)
    return "";
  const d = V[n.arrayFormat], b = d === "comma" && n.commaRoundTrip;
  l || (l = Object.keys(o)), n.sort && l.sort(n.sort);
  const s = /* @__PURE__ */ new WeakMap();
  for (let p = 0; p < l.length; ++p) {
    const h = l[p];
    n.skipNulls && o[h] === null || B(
      c,
      C(
        o[h],
        h,
        d,
        b,
        n.allowEmptyArrays,
        n.strictNullHandling,
        n.skipNulls,
        n.encodeDotInKeys,
        n.encode ? n.encoder : null,
        n.filter,
        n.sort,
        n.allowDots,
        n.serializeDate,
        n.format,
        n.formatter,
        n.encodeValuesOnly,
        n.charset,
        s
      )
    );
  }
  const y = c.join(n.delimiter);
  let m = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? m += "utf8=%26%2310003%3B&" : m += "utf8=%E2%9C%93&"), y.length > 0 ? m + y : "";
}
export {
  Z as stringify
};
