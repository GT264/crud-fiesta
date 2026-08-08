function t(e) {
  return e.row.getValue(e.column.id);
}
function n(e) {
  return e.getValue() ?? e.table.options.renderFallbackValue;
}
function r(e) {
  return {
    table: e.table,
    column: e.column,
    row: e.row,
    cell: e,
    getValue: () => e.getValue(),
    renderValue: () => e.renderValue()
  };
}
export {
  r as cell_getContext,
  t as cell_getValue,
  n as cell_renderValue
};
