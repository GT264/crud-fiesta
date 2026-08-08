import { makeObjectMap as o, cloneState as i } from "./index38.js";
function u(e) {
  e.atoms.expanded && (e.options.autoResetAll ?? e.options.autoResetExpanded ?? !e.options.manualExpanding) && e._reactivity.schedule(() => p(e));
}
function d(e, n) {
  var t, a;
  (a = (t = e.options).onExpandedChange) == null || a.call(t, n);
}
function p(e, n) {
  const t = e.initialState.expanded;
  d(e, t === !0 ? !0 : Object.assign(o(), i(t ?? {})));
}
export {
  u as table_autoResetExpanded,
  p as table_resetExpanded,
  d as table_setExpanded
};
