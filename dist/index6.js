import { route as c } from "./index11.js";
function s() {
  function e(r, t) {
    return c(r, t);
  }
  function i(r, t, n) {
    if (n) {
      const u = r[n.relation];
      return u && typeof u[n.display_field] < "u" ? String(u[n.display_field] ?? "") : "";
    }
    return String(r[t] ?? "");
  }
  function f(r, t, n) {
    return t !== r || !n ? null : n === "asc" ? "ArrowUp" : "ArrowDown";
  }
  function o(r, t, n) {
    return t !== r || !n ? "asc" : n === "asc" ? "desc" : null;
  }
  return { buildRoute: e, formatColumnValue: i, getSortIcon: f, getNextSortOrder: o };
}
export {
  s as useCrudFiesta
};
