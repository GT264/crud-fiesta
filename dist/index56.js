import { createCoreRowModel as r } from "./index15.js";
function w(o) {
  var e, d;
  return o._rowModels.coreRowModel || (o._rowModels.coreRowModel = ((d = (e = o.options.features).coreRowModel) == null ? void 0 : d.call(e, o)) ?? r()(o)), o._rowModels.coreRowModel();
}
function M(o) {
  return o.getCoreRowModel();
}
function t(o) {
  var e, d;
  return o._rowModels.filteredRowModel || (o._rowModels.filteredRowModel = (d = (e = o.options.features).filteredRowModel) == null ? void 0 : d.call(e, o)), o.options.manualFiltering || !o._rowModels.filteredRowModel ? o.getPreFilteredRowModel() : o._rowModels.filteredRowModel();
}
function l(o) {
  return o.getFilteredRowModel();
}
function i(o) {
  var e, d;
  return o._rowModels.groupedRowModel || (o._rowModels.groupedRowModel = (d = (e = o.options.features).groupedRowModel) == null ? void 0 : d.call(e, o)), o.options.manualGrouping || !o._rowModels.groupedRowModel ? o.getPreGroupedRowModel() : o._rowModels.groupedRowModel();
}
function R(o) {
  return o.getGroupedRowModel();
}
function u(o) {
  var e, d;
  return o._rowModels.sortedRowModel || (o._rowModels.sortedRowModel = (d = (e = o.options.features).sortedRowModel) == null ? void 0 : d.call(e, o)), o.options.manualSorting || !o._rowModels.sortedRowModel ? o.getPreSortedRowModel() : o._rowModels.sortedRowModel();
}
function s(o) {
  return o.getSortedRowModel();
}
function g(o) {
  var e, d;
  return o._rowModels.expandedRowModel || (o._rowModels.expandedRowModel = (d = (e = o.options.features).expandedRowModel) == null ? void 0 : d.call(e, o)), o.options.manualExpanding || !o._rowModels.expandedRowModel ? o.getPreExpandedRowModel() : o._rowModels.expandedRowModel();
}
function p(o) {
  return o.getExpandedRowModel();
}
function f(o) {
  var e, d;
  return o._rowModels.paginatedRowModel || (o._rowModels.paginatedRowModel = (d = (e = o.options.features).paginatedRowModel) == null ? void 0 : d.call(e, o)), o.options.manualPagination || !o._rowModels.paginatedRowModel ? o.getPrePaginatedRowModel() : o._rowModels.paginatedRowModel();
}
function _(o) {
  return o.getPaginatedRowModel();
}
export {
  w as table_getCoreRowModel,
  g as table_getExpandedRowModel,
  t as table_getFilteredRowModel,
  i as table_getGroupedRowModel,
  f as table_getPaginatedRowModel,
  s as table_getPreExpandedRowModel,
  M as table_getPreFilteredRowModel,
  l as table_getPreGroupedRowModel,
  p as table_getPrePaginatedRowModel,
  R as table_getPreSortedRowModel,
  _ as table_getRowModel,
  u as table_getSortedRowModel
};
