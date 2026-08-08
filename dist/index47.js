import { assignTableAPIs as a, assignPrototypeAPIs as n } from "./index38.js";
import { table_getLeafHeaders as m, table_getFlatHeaders as g, table_getFooterGroups as p, table_getHeaderGroups as d, header_getContext as u, header_getLeafHeaders as i } from "./index48.js";
const f = {
  assignHeaderPrototype: (e, r) => {
    n("coreHeadersFeature", e, r, {
      header_getLeafHeaders: {
        fn: (o) => i(o),
        memoDeps: (o) => [o.column.table.options.columns]
      },
      header_getContext: {
        fn: (o) => u(o),
        memoDeps: (o) => [o.column.table.options.columns]
      }
    });
  },
  constructTableAPIs: (e) => {
    a("coreHeadersFeature", e, {
      table_getHeaderGroups: {
        fn: () => d(e),
        memoDeps: () => {
          var r, o, t, s;
          return [
            e.options.columns,
            (r = e.atoms.columnOrder) == null ? void 0 : r.get(),
            (o = e.atoms.grouping) == null ? void 0 : o.get(),
            (t = e.atoms.columnPinning) == null ? void 0 : t.get(),
            (s = e.atoms.columnVisibility) == null ? void 0 : s.get(),
            e.options.groupedColumnMode
          ];
        }
      },
      table_getFooterGroups: {
        fn: () => p(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getFlatHeaders: {
        fn: () => g(e),
        memoDeps: () => [e.getHeaderGroups()]
      },
      table_getLeafHeaders: {
        fn: () => m(e),
        memoDeps: () => [e.getHeaderGroups()]
      }
    });
  }
};
export {
  f as coreHeadersFeature
};
