import { assignPrototypeAPIs as o } from "./index38.js";
import { cell_getContext as r, cell_renderValue as n, cell_getValue as c } from "./index40.js";
const g = { assignCellPrototype: (l, t) => {
  o("coreCellsFeature", l, t, {
    cell_getValue: { fn: (e) => c(e) },
    cell_renderValue: { fn: (e) => n(e) },
    cell_getContext: {
      fn: (e) => r(e),
      memoDeps: (e) => [e]
    }
  });
} };
export {
  g as coreCellsFeature
};
