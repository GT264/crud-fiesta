import { functionalUpdate as g } from "./index38.js";
const u = 0;
function x(n) {
  (n.options.autoResetAll ?? n.options.autoResetPageIndex ?? !n.options.manualPagination) && d(n);
}
function s(n, a) {
  var e, t;
  const o = (i) => g(a, i);
  return (t = (e = n.options).onPaginationChange) == null ? void 0 : t.call(e, o);
}
function p(n, a) {
  s(n, (o) => {
    let e = g(a, o.pageIndex);
    const t = typeof n.options.pageCount > "u" || n.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : n.options.pageCount - 1;
    return e = Math.max(0, Math.min(e, t)), {
      ...o,
      pageIndex: e
    };
  });
}
function d(n, a) {
  var t, i;
  const o = ((i = (t = n.atoms.pagination) == null ? void 0 : t.get()) == null ? void 0 : i.pageIndex) ?? u, e = u;
  e !== o && p(n, e);
}
export {
  x as table_autoResetPageIndex,
  d as table_resetPageIndex,
  p as table_setPageIndex,
  s as table_setPagination
};
