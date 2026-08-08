import { RFC1738 as M } from "./index32.js";
const y = Object.prototype.hasOwnProperty, h = Array.isArray, b = /* @__PURE__ */ new WeakMap();
var O = function(e, n) {
  return b.set(e, n), e;
};
function j(c) {
  return b.has(c);
}
var m = function(e) {
  return b.get(e);
}, v = function(e, n) {
  b.set(e, n);
};
const a = (function() {
  const c = [];
  for (let e = 0; e < 256; ++e)
    c.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return c;
})(), w = function(e) {
  for (; e.length > 1; ) {
    const n = e.pop(), o = n.obj[n.prop];
    if (h(o)) {
      const r = [];
      for (let u = 0; u < o.length; ++u)
        typeof o[u] < "u" && r.push(o[u]);
      n.obj[n.prop] = r;
    }
  }
}, g = function(e, n) {
  const o = n && n.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let r = 0; r < e.length; ++r)
    typeof e[r] < "u" && (o[r] = e[r]);
  return o;
}, C = function c(e, n, o) {
  if (!n)
    return e;
  if (typeof n != "object") {
    if (h(e))
      e.push(n);
    else if (e && typeof e == "object")
      if (j(e)) {
        var r = m(e) + 1;
        e[r] = n, v(e, r);
      } else (o && (o.plainObjects || o.allowPrototypes) || !y.call(Object.prototype, n)) && (e[n] = !0);
    else
      return [e, n];
    return e;
  }
  if (!e || typeof e != "object") {
    if (j(n)) {
      for (var u = Object.keys(n), i = o && o.plainObjects ? { __proto__: null, 0: e } : { 0: e }, s = 0; s < u.length; s++) {
        var p = parseInt(u[s], 10);
        i[p + 1] = n[u[s]];
      }
      return O(i, m(n) + 1);
    }
    return [e].concat(n);
  }
  let x = e;
  return h(e) && !h(n) && (x = g(e, o)), h(e) && h(n) ? (n.forEach(function(f, l) {
    if (y.call(e, l)) {
      const t = e[l];
      t && typeof t == "object" && f && typeof f == "object" ? e[l] = c(t, f, o) : e.push(f);
    } else
      e[l] = f;
  }), e) : Object.keys(n).reduce(function(f, l) {
    const t = n[l];
    return y.call(f, l) ? f[l] = c(f[l], t, o) : f[l] = t, f;
  }, x);
}, I = function(c, e, n) {
  const o = c.replace(/\+/g, " ");
  if (n === "iso-8859-1")
    return o.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(o);
  } catch {
    return o;
  }
}, d = 1024, k = function(e, n, o, r, u) {
  if (e.length === 0)
    return e;
  let i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), o === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(p) {
      return "%26%23" + parseInt(p.slice(2), 16) + "%3B";
    });
  let s = "";
  for (let p = 0; p < i.length; p += d) {
    const x = i.length >= d ? i.slice(p, p + d) : i, f = [];
    for (let l = 0; l < x.length; ++l) {
      let t = x.charCodeAt(l);
      if (t === 45 || // -
      t === 46 || // .
      t === 95 || // _
      t === 126 || // ~
      t >= 48 && t <= 57 || // 0-9
      t >= 65 && t <= 90 || // a-z
      t >= 97 && t <= 122 || // A-Z
      u === M && (t === 40 || t === 41)) {
        f[f.length] = x.charAt(l);
        continue;
      }
      if (t < 128) {
        f[f.length] = a[t];
        continue;
      }
      if (t < 2048) {
        f[f.length] = a[192 | t >> 6] + a[128 | t & 63];
        continue;
      }
      if (t < 55296 || t >= 57344) {
        f[f.length] = a[224 | t >> 12] + a[128 | t >> 6 & 63] + a[128 | t & 63];
        continue;
      }
      l += 1, t = 65536 + ((t & 1023) << 10 | x.charCodeAt(l) & 1023), f[f.length] = a[240 | t >> 18] + a[128 | t >> 12 & 63] + a[128 | t >> 6 & 63] + a[128 | t & 63];
    }
    s += f.join("");
  }
  return s;
}, B = function(e) {
  const n = [{ obj: { o: e }, prop: "o" }], o = [];
  for (let r = 0; r < n.length; ++r) {
    const u = n[r], i = u.obj[u.prop], s = Object.keys(i);
    for (let p = 0; p < s.length; ++p) {
      const x = s[p], f = i[x];
      typeof f == "object" && f !== null && o.indexOf(f) === -1 && (n.push({ obj: i, prop: x }), o.push(f));
    }
  }
  return w(n), e;
}, S = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, T = function(e, n, o, r) {
  if (j(e)) {
    var u = m(e) + 1;
    return e[u] = n, v(e, u), e;
  }
  var i = [].concat(e, n);
  return i.length > o ? O(g(i, { plainObjects: r }), i.length - 1) : i;
}, _ = function(e, n) {
  if (h(e)) {
    const o = [];
    for (let r = 0; r < e.length; r += 1)
      o.push(n(e[r]));
    return o;
  }
  return n(e);
};
export {
  g as arrayToObject,
  T as combine,
  B as compact,
  I as decode,
  k as encode,
  S as isBuffer,
  j as isOverflow,
  _ as maybeMap,
  C as merge
};
