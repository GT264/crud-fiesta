import { tableMemo as w, skipFirstRun as R, makeObjectMap as a } from "./index38.js";
import { constructRow as d } from "./index49.js";
import { table_autoResetCellSelection as p } from "./index51.js";
import { table_autoResetExpanded as g } from "./index52.js";
import { table_autoResetPageIndex as l } from "./index53.js";
import { table_autoResetSorting as S } from "./index54.js";
function k() {
  return (o) => w({
    feature: "coreRowModelsFeature",
    table: o,
    fnName: "table.getCoreRowModel",
    memoDeps: () => [o.options.data],
    fn: () => M(o, o.options.data),
    onAfterUpdate: R(() => {
      g(o), l(o), S(o), p(o);
    })
  });
}
function c(o, s, e, u = 0, i) {
  var m;
  const f = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r], t = d(o, o.getRowId(n, r, i), n, r, u, void 0, i == null ? void 0 : i.id);
    s.flatRows.push(t), s.rowsById[t.id] = t, f.push(t), o.options.getSubRows && (t.originalSubRows = o.options.getSubRows(n, r), (m = t.originalSubRows) != null && m.length && (t.subRows = c(o, s, t.originalSubRows, u + 1, t)));
  }
  return f;
}
function M(o, s) {
  const e = {
    rows: [],
    flatRows: [],
    rowsById: a()
  };
  return e.rows = c(o, e, s), e;
}
export {
  k as createCoreRowModel
};
