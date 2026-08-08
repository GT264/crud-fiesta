import n from "./index2.js";
import t from "./index3.js";
import m from "./index4.js";
import s from "./index5.js";
import { useCrudFiesta as d } from "./index6.js";
const e = {
  install(o) {
    o.component("CfIndex", n), o.component("CfDataTable", t), o.component("CfActions", m), o.component("CfForm", s);
  }
}, i = {
  install(o) {
  }
}, C = {
  "Pages/Index": n
};
export {
  m as CfActions,
  t as CfDataTable,
  s as CfForm,
  n as CfIndex,
  e as CrudPlugin,
  i as ShadcnPlugin,
  C as crudPages,
  d as useCrudFiesta
};
