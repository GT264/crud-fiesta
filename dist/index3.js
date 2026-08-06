import r from "./index5.js";
import n from "./index6.js";
const a = {
  CrudIndex: r,
  CrudDataTable: n
}, m = {
  install: (t) => {
    Object.entries(a).forEach(([o, e]) => {
      t.component(o, e);
    });
  }
};
export {
  n as CrudDataTable,
  r as CrudIndex,
  m as default
};
