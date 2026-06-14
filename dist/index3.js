import t from "./index5.js";
import s from "./index6.js";
import m from "./index7.js";
import n from "./index8.js";
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
