import { callMemoOrStaticFn as a } from "./index38.js";
import { table_getVisibleLeafColumns as h, column_getIsVisible as g } from "./index43.js";
import { buildHeaderGroups as m } from "./index42.js";
import { getDefaultColumnPinningState as H } from "./index65.js";
function d(e, t) {
  for (let n = 0; n < e.subHeaders.length; n++) d(e.subHeaders[n], t);
  t.push(e);
}
function L(e) {
  const t = [];
  return d(e, t), t;
}
function I(e) {
  return {
    column: e.column,
    header: e,
    table: e.column.table
  };
}
function V(e) {
  var f;
  const { start: t, end: n } = ((f = e.atoms.columnPinning) == null ? void 0 : f.get()) ?? H(), s = e.getAllColumns(), r = a(e, "getVisibleLeafColumns", h);
  if (!t.length && !n.length) return m(s, r, e);
  const l = e.getAllLeafColumnsById(), i = [];
  for (let o = 0; o < t.length; o++) {
    const u = l[t[o]];
    u && a(u, "getIsVisible", g) && i.push(u);
  }
  const c = [];
  for (let o = 0; o < n.length; o++) {
    const u = l[n[o]];
    u && a(u, "getIsVisible", g) && c.push(u);
  }
  const p = r.filter((o) => !t.includes(o.id) && !n.includes(o.id));
  return m(s, [
    ...i,
    ...p,
    ...c
  ], e);
}
function F(e) {
  return [...e.getHeaderGroups()].reverse();
}
function j(e) {
  const t = e.getHeaderGroups(), n = [];
  for (let s = 0; s < t.length; s++) {
    const r = t[s].headers;
    for (let l = 0; l < r.length; l++) n.push(r[l]);
  }
  return n;
}
function x(e) {
  var s;
  const t = ((s = e.getHeaderGroups()[0]) == null ? void 0 : s.headers) ?? [], n = [];
  for (let r = 0; r < t.length; r++) {
    const l = t[r].getLeafHeaders();
    for (let i = 0; i < l.length; i++) n.push(l[i]);
  }
  return n;
}
export {
  I as header_getContext,
  L as header_getLeafHeaders,
  j as table_getFlatHeaders,
  F as table_getFooterGroups,
  V as table_getHeaderGroups,
  x as table_getLeafHeaders
};
