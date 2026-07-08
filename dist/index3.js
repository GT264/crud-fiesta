import t from "./index6.js";
import s from "./index7.js";
import m from "./index8.js";
import n from "./index9.js";
const c = {
  CrudIndex: t,
  CrudDataTable: s,
  CrudForm: m,
  CrudActions: n
}, u = {
  install: (r) => {
    Object.entries(c).forEach(([o, a]) => {
      r.component(o, a);
    });
  }
};
export {
  n as CrudActions,
  s as CrudDataTable,
  m as CrudForm,
  t as CrudIndex,
  u as default
};
