import { cloneState as n } from "./index38.js";
function i() {
  return [];
}
function c(e, t) {
  var l, o;
  (o = (l = e.options).onCellSelectionChange) == null || o.call(l, t);
}
function u(e, t) {
  c(e, n(e.initialState.cellSelection) ?? i());
}
function a(e) {
  e.atoms.cellSelection && (e.options.autoResetAll ?? e.options.autoResetCellSelection ?? !0) && e._reactivity.schedule(() => u(e));
}
export {
  i as getDefaultCellSelectionState,
  a as table_autoResetCellSelection,
  u as table_resetCellSelection,
  c as table_setCellSelection
};
