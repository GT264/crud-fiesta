import { callMemoOrStaticFn as h } from "./index38.js";
import { column_getIsVisible as g } from "./index43.js";
import { constructHeader as H } from "./index41.js";
function p(i, t = 1) {
  let e = t;
  for (let r = 0; r < i.length; r++) {
    const n = i[r];
    h(n, "getIsVisible", g) && n.columns.length && (e = Math.max(e, p(n.columns, t + 1)));
  }
  return e;
}
function w(i, t) {
  return String(t);
}
function P(i, t, e, r) {
  let n = i ?? "";
  return t && (n = n ? `${n}_${t}` : String(t)), e && (n = n ? `${n}_${e}` : e), r && (n = n ? `${n}_${r}` : r), n;
}
function $(i, t) {
  let e = 0;
  for (let r = 0; r < i.length; r++) i[r].column === t && e++;
  return e;
}
function b(i, t, e, r, n, o) {
  const a = {
    depth: t,
    id: w(r, t),
    headers: []
  }, u = [];
  for (let l = 0; l < i.length; l++) {
    if (!(l in i)) continue;
    const s = i[l], d = u[u.length - 1], x = s.column.depth === a.depth;
    let c, f = !1;
    if (x && s.column.parent ? c = s.column.parent : (c = s.column, f = !0), d && d.column === c) d.subHeaders.push(s);
    else {
      const m = H(e, c, {
        id: P(r, t, c.id, s.id),
        isPlaceholder: f,
        placeholderId: f ? String($(u, c)) : void 0,
        depth: t,
        index: u.length
      });
      m.subHeaders.push(s), u.push(m);
    }
    a.headers.push(s), s.headerGroup = a;
  }
  for (let l = 0; l < o.length; l++) o[l](a);
  n.push(a), t > 0 && b(u, t - 1, e, r, n, o);
}
function S(i) {
  for (let t = 0; t < i.length; t++) {
    const e = i[t];
    if (!h(e.column, "getIsVisible", g)) continue;
    let r = 0;
    if (e.subHeaders.length) {
      S(e.subHeaders);
      for (let n = 0; n < e.subHeaders.length; n++) {
        const o = e.subHeaders[n];
        h(o.column, "getIsVisible", g) && (r += o.colSpan);
      }
    } else r = 1;
    if (e.colSpan = r, e.isPlaceholder && e.subHeaders.length === 1 && e.subHeaders[0].column === e.column) {
      let n = 1, o = e.subHeaders[0];
      for (; o; )
        o.rowSpan = 0, n++, o = o.subHeaders.length === 1 && o.subHeaders[0].column === e.column ? o.subHeaders[0] : void 0;
      e.rowSpan = n;
    } else e.rowSpan = 1;
  }
}
function v(i, t, e, r) {
  var l;
  const n = p(i), o = [], a = e._headerGroupInstanceInitFns, u = new Array(t.length);
  for (let s = 0; s < t.length; s++)
    s in t && (u[s] = H(e, t[s], {
      depth: n,
      index: s
    }));
  return b(u, n - 1, e, r, o, a), o.reverse(), S(((l = o[0]) == null ? void 0 : l.headers) ?? []), o;
}
export {
  v as buildHeaderGroups
};
