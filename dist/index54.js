import { isFunction as f, cloneState as l } from "./index38.js";
import { sortFn_basic as a, reSplitAlphaNumeric as u } from "./index50.js";
function c(t, e) {
  var n, o;
  (o = (n = t.options).onSortingChange) == null || o.call(n, e);
}
function g(t, e) {
  c(t, l(t.initialState.sorting ?? []));
}
function d(t) {
  t.atoms.sorting && (t.options.autoResetAll ?? t.options.autoResetSorting ?? !1) && g(t);
}
function p(t) {
  const e = t.table._rowModelFns.sortFns, n = t.table.getFilteredRowModel().flatRows.slice(0, 10);
  let o, s = !1;
  for (let r = 0; r < n.length; r++) {
    const i = n[r].getValue(t.id);
    if (Object.prototype.toString.call(i) === "[object Date]") {
      o = "datetime";
      break;
    }
    if (typeof i == "string" && (s = !0, i.split(u).length > 1)) {
      o = "alphanumeric";
      break;
    }
  }
  if (!o && s && (o = "text"), o) {
    let r = e == null ? void 0 : e[o];
    if (r || (process.env.NODE_ENV === "development" && console.warn(`sortFn '${o}' (auto) for column '${t.id}' is not registered`), o === "alphanumeric" && (r = e == null ? void 0 : e.text)), r) return r;
  }
  return a;
}
function m(t) {
  const e = t.table._rowModelFns.sortFns;
  if (f(t.columnDef.sortFn)) return t.columnDef.sortFn;
  if (t.columnDef.sortFn === "auto") return p(t);
  const n = e == null ? void 0 : e[t.columnDef.sortFn];
  return process.env.NODE_ENV === "development" && !n && console.warn(`sortFn '${String(t.columnDef.sortFn)}' for column '${t.id}' is not registered`), n ?? a;
}
function _(t) {
  return (t.columnDef.enableSorting ?? !0) && (t.table.options.enableSorting ?? !0) && !!t.accessorFn;
}
export {
  p as column_getAutoSortFn,
  _ as column_getCanSort,
  m as column_getSortFn,
  d as table_autoResetSorting,
  g as table_resetSorting,
  c as table_setSorting
};
