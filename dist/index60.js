import { assignTableAPIs as s } from "./index38.js";
import { table_setOptions as r, table_reset as o } from "./index61.js";
const b = { constructTableAPIs: (e) => {
  s("coreTablesFeature", e, {
    table_reset: { fn: () => o(e) },
    table_setOptions: { fn: (t) => r(e, t) }
  });
} };
export {
  b as coreTablesFeature
};
