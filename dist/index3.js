import t from "./index5.js";
import m from "./index6.js";
import n from "./index7.js";
import s from "./index8.js";
const e = {
  CrudIndex: t,
  CrudDataTable: m,
  CrudForm: n,
  CrudActions: s
}, u = {
  install: (r) => {
    Object.entries(e).forEach(([o, a]) => {
      r.component(o, a);
    });
  }
};
export {
  s as CrudActions,
  m as CrudDataTable,
  n as CrudForm,
  t as CrudIndex,
  u as default
};
