import { assignTableAPIs as o } from "./index38.js";
import { table_getRowModel as t, table_getPaginatedRowModel as d, table_getPrePaginatedRowModel as l, table_getExpandedRowModel as r, table_getPreExpandedRowModel as a, table_getSortedRowModel as g, table_getPreSortedRowModel as w, table_getGroupedRowModel as M, table_getPreGroupedRowModel as R, table_getFilteredRowModel as _, table_getPreFilteredRowModel as n, table_getCoreRowModel as P } from "./index56.js";
const i = { constructTableAPIs: (e) => {
  o("coreRowModelsFeature", e, {
    table_getCoreRowModel: { fn: () => P(e) },
    table_getPreFilteredRowModel: { fn: () => n(e) },
    table_getFilteredRowModel: { fn: () => _(e) },
    table_getPreGroupedRowModel: { fn: () => R(e) },
    table_getGroupedRowModel: { fn: () => M(e) },
    table_getPreSortedRowModel: { fn: () => w(e) },
    table_getSortedRowModel: { fn: () => g(e) },
    table_getPreExpandedRowModel: { fn: () => a(e) },
    table_getExpandedRowModel: { fn: () => r(e) },
    table_getPrePaginatedRowModel: { fn: () => l(e) },
    table_getPaginatedRowModel: { fn: () => d(e) },
    table_getRowModel: { fn: () => t(e) }
  });
} };
export {
  i as coreRowModelsFeature
};
