import { callMemoOrStaticFn as m, makeObjectMap as a } from "./index38.js";
import { table_getOrderColumnsFn as f } from "./index66.js";
import { constructColumn as C } from "./index44.js";
function _(t) {
  return [t, ...t.columns.flatMap((l) => l.getFlatColumns())];
}
function A(t) {
  if (t.columns.length) {
    const l = t.columns.flatMap((n) => n.getLeafColumns());
    return m(t.table, "getOrderColumns", f)(l);
  }
  return [t];
}
function F(t) {
  return {
    header: (l) => {
      const n = l.header.column.columnDef;
      return n.accessorKey ? n.accessorKey : n.accessorFn ? n.id : null;
    },
    cell: (l) => {
      var n, e;
      return ((e = (n = l.renderValue()) == null ? void 0 : n.toString) == null ? void 0 : e.call(n)) ?? null;
    },
    ...Object.values(t._features).reduce((l, n) => {
      var e;
      return Object.assign(l, (e = n.getDefaultColumnDef) == null ? void 0 : e.call(n));
    }, {}),
    ...t.options.defaultColumn
  };
}
function i(t, l, n, e = 0) {
  const o = new Array(l.length);
  for (let u = 0; u < l.length; u++) {
    if (!(u in l)) continue;
    const r = l[u], s = C(t, r, e, n), c = r;
    s.columns = c.columns ? i(t, c.columns, s, e + 1) : [], o[u] = s;
  }
  return o;
}
function b(t) {
  return i(t, t.options.columns);
}
function O(t) {
  return t.getAllColumns().flatMap((l) => l.getFlatColumns());
}
function h(t) {
  const l = a(), n = t.getAllFlatColumns();
  for (let e = 0; e < n.length; e++) {
    const o = n[e];
    l[o.id] = o;
  }
  return l;
}
function y(t) {
  const l = t.getAllColumns().flatMap((n) => n.getLeafColumns());
  return m(t, "getOrderColumns", f)(l);
}
function D(t) {
  const l = a(), n = t.getAllLeafColumns();
  for (let e = 0; e < n.length; e++) {
    const o = n[e];
    l[o.id] = o;
  }
  return l;
}
function L(t, l) {
  const n = t.getAllFlatColumnsById()[l];
  return process.env.NODE_ENV === "development" && !n && console.warn(`[Table] Column with id '${l}' does not exist.`), n;
}
export {
  _ as column_getFlatColumns,
  A as column_getLeafColumns,
  b as table_getAllColumns,
  O as table_getAllFlatColumns,
  h as table_getAllFlatColumnsById,
  y as table_getAllLeafColumns,
  D as table_getAllLeafColumnsById,
  L as table_getColumn,
  F as table_getDefaultColumnDef
};
