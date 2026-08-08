import { assignTableAPIs as s, assignPrototypeAPIs as w } from "./index38.js";
import { table_getMaxSubRowDepth as n, table_getRow as l, table_getRowId as a, table_getRowsInDisplayOrder as g, row_renderValue as _, row_getValue as p, row_getUniqueValues as R, row_getParentRows as d, row_getParentRow as f, row_getLeafRows as m, row_getAllCells as u, row_getAllCellsByColumnId as i, row_getDisplayIndex as D } from "./index59.js";
const A = {
  assignRowPrototype: (o, t) => {
    w("coreRowsFeature", o, t, {
      row_getDisplayIndex: { fn: (e) => D(e) },
      row_getAllCellsByColumnId: {
        fn: (e) => i(e),
        memoDeps: (e) => [e.getAllCells()]
      },
      row_getAllCells: {
        fn: (e) => u(e),
        memoDeps: (e) => [e.table.getAllLeafColumns()]
      },
      row_getLeafRows: {
        fn: (e) => m(e),
        memoDeps: (e) => [e.subRows]
      },
      row_getParentRow: { fn: (e) => f(e) },
      row_getParentRows: { fn: (e) => d(e) },
      row_getUniqueValues: { fn: (e, r) => R(e, r) },
      row_getValue: { fn: (e, r) => p(e, r) },
      row_renderValue: { fn: (e, r) => _(e, r) }
    });
  },
  constructTableAPIs: (o) => {
    s("coreRowsFeature", o, {
      table_getRowsInDisplayOrder: {
        fn: () => g(o),
        memoDeps: () => {
          var t;
          return [
            o.getPrePaginatedRowModel().rows,
            o.options.paginateExpandedRows,
            o.options.paginateExpandedRows === !1 ? (t = o.atoms.expanded) == null ? void 0 : t.get() : void 0
          ];
        }
      },
      table_getRowId: { fn: (t, e, r) => a(t, o, e, r) },
      table_getRow: { fn: (t, e) => l(o, t, e) },
      table_getMaxSubRowDepth: {
        fn: () => n(o),
        memoDeps: () => [o.getCoreRowModel()]
      }
    });
  }
};
export {
  A as coreRowsFeature
};
