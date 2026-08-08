import { hasOwn as o, flattenBy as u, makeObjectMap as i } from "./index38.js";
import { constructCell as c } from "./index57.js";
function h(e) {
  const t = e.table.getRowsInDisplayOrder(), n = e._displayIndexCache;
  return t[n] === e ? n : -1;
}
function d(e) {
  const t = e.getPrePaginatedRowModel().rows;
  if (e.options.paginateExpandedRows === !1) {
    const n = [], l = (a) => {
      var s;
      a._displayIndexCache = n.length, n.push(a), a.subRows.length && ((s = a.getIsExpanded) != null && s.call(a)) && a.subRows.forEach(l);
    };
    return t.forEach(l), n;
  }
  for (let n = 0; n < t.length; n++) t[n]._displayIndexCache = n;
  return t;
}
function p(e, t) {
  if (o(e._valuesCache, t)) return e._valuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return e._valuesCache[t] = n.accessorFn(e.original, e.index), e._valuesCache[t];
}
function R(e, t) {
  if (o(e._uniqueValuesCache, t)) return e._uniqueValuesCache[t];
  const n = e.table.getColumn(t);
  if (n != null && n.accessorFn)
    return n.columnDef.getUniqueValues ? (e._uniqueValuesCache[t] = n.columnDef.getUniqueValues(e.original, e.index), e._uniqueValuesCache[t]) : (e._uniqueValuesCache[t] = [e.getValue(t)], e._uniqueValuesCache[t]);
}
function _(e, t) {
  return e.getValue(t) ?? e.table.options.renderFallbackValue;
}
function C(e) {
  return u(e.subRows, (t) => t.subRows);
}
function w(e) {
  const t = e.getCoreRowModel().flatRows;
  let n = 0;
  for (let l = 0; l < t.length; l++) n = Math.max(n, t[l].depth);
  return n;
}
function b(e) {
  if (e.parentId)
    return e.table.getCoreRowModel().rowsById[e.parentId] ?? e.table.getRow(e.parentId, !0);
}
function V(e) {
  const t = [];
  let n = e;
  for (; ; ) {
    const l = n.getParentRow();
    if (!l) break;
    t.push(l), n = l;
  }
  return t.reverse();
}
function y(e) {
  const t = e.table.getAllLeafColumns();
  let n = e._cellsCache;
  n || (n = e._cellsCache = /* @__PURE__ */ new WeakMap());
  const l = new Array(t.length);
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    let r = n.get(s);
    r || (r = c(s, e, e.table), n.set(s, r)), l[a] = r;
  }
  return l;
}
function x(e) {
  const t = i(), n = e.getAllCells();
  for (let l = 0; l < n.length; l++) {
    const a = n[l];
    t[a.column.id] = a;
  }
  return t;
}
function M(e, t, n, l) {
  var a, s;
  return ((s = (a = t.options).getRowId) == null ? void 0 : s.call(a, e, n, l)) ?? (l ? `${l.id}.${n}` : String(n));
}
function q(e, t, n) {
  let l = (n ? e.getPrePaginatedRowModel() : e.getRowModel()).rowsById[t];
  if (!l && (l = e.getCoreRowModel().rowsById[t], !l))
    throw process.env.NODE_ENV === "development" ? new Error(`getRow could not find row with ID: ${t}`) : new Error();
  return l;
}
export {
  y as row_getAllCells,
  x as row_getAllCellsByColumnId,
  h as row_getDisplayIndex,
  C as row_getLeafRows,
  b as row_getParentRow,
  V as row_getParentRows,
  R as row_getUniqueValues,
  p as row_getValue,
  _ as row_renderValue,
  w as table_getMaxSubRowDepth,
  q as table_getRow,
  M as table_getRowId,
  d as table_getRowsInDisplayOrder
};
