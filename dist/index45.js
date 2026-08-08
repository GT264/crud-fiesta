import { assignTableAPIs as m, assignPrototypeAPIs as s } from "./index38.js";
import { table_getColumn as u, table_getAllLeafColumnsById as g, table_getAllLeafColumns as a, table_getAllFlatColumnsById as p, table_getAllFlatColumns as C, table_getAllColumns as f, table_getDefaultColumnDef as r, column_getLeafColumns as _, column_getFlatColumns as i } from "./index46.js";
const D = {
  assignColumnPrototype: (o, l) => {
    s("coreColumnsFeature", o, l, {
      column_getFlatColumns: {
        fn: (e) => i(e),
        memoDeps: (e) => [e.table.options.columns]
      },
      column_getLeafColumns: {
        fn: (e) => _(e),
        memoDeps: (e) => {
          var t, n;
          return [
            (t = e.table.atoms.columnOrder) == null ? void 0 : t.get(),
            (n = e.table.atoms.grouping) == null ? void 0 : n.get(),
            e.table.options.columns,
            e.table.options.groupedColumnMode
          ];
        }
      }
    });
  },
  constructTableAPIs: (o) => {
    m("coreColumnsFeature", o, {
      table_getDefaultColumnDef: {
        fn: () => r(o),
        memoDeps: () => [o.options.defaultColumn]
      },
      table_getAllColumns: {
        fn: () => f(o),
        memoDeps: () => [o.options.columns]
      },
      table_getAllFlatColumns: {
        fn: () => C(o),
        memoDeps: () => [o.options.columns]
      },
      table_getAllFlatColumnsById: {
        fn: () => p(o),
        memoDeps: () => [o.options.columns]
      },
      table_getAllLeafColumns: {
        fn: () => a(o),
        memoDeps: () => {
          var l, e;
          return [
            (l = o.atoms.columnOrder) == null ? void 0 : l.get(),
            (e = o.atoms.grouping) == null ? void 0 : e.get(),
            o.options.columns,
            o.options.groupedColumnMode
          ];
        }
      },
      table_getAllLeafColumnsById: {
        fn: () => g(o),
        memoDeps: () => [o.getAllLeafColumns()]
      },
      table_getColumn: { fn: (l) => u(o, l) }
    });
  }
};
export {
  D as coreColumnsFeature
};
