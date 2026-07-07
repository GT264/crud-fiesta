import a from "./index6.js";
import m from "./index7.js";
import s from "./index8.js";
import n from "./index9.js";
const c = {
  CrudIndex: a,
  CrudDataTable: m,
  CrudForm: s,
  CrudActions: n
}, u = {
  install: (r) => {
    Object.entries(c).forEach(([o, t]) => {
      r.component(o, t);
    });
  }
};
export {
  n as CrudActions,
  m as CrudDataTable,
  s as CrudForm,
  a as CrudIndex,
  u as default
};
