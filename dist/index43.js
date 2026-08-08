import { callMemoOrStaticFn as s, hasOwn as r } from "./index38.js";
function n(i) {
  var l;
  const t = (l = i.table.atoms.columnVisibility) == null ? void 0 : l.get();
  if (!t) return !0;
  const e = i.columns;
  return e.length ? e.some((o) => s(o, "getIsVisible", n)) : (r(t, i.id) ? t[i.id] : void 0) ?? !0;
}
function m(i) {
  return i.getAllLeafColumns().filter((t) => s(t, "getIsVisible", n));
}
export {
  n as column_getIsVisible,
  m as table_getVisibleLeafColumns
};
