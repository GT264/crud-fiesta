import { defineComponent as x, ref as v, openBlock as d, createBlock as m, unref as r, withCtx as s, createElementBlock as F, Fragment as T, renderList as V, createVNode as p, renderSlot as k, createElementVNode as o, toDisplayString as B } from "vue";
import C from "primevue/datatable";
import f from "primevue/column";
import S from "primevue/inputtext";
import { trans as u } from "laravel-vue-i18n";
const D = { class: "flex items-center justify-between" }, I = { class: "p-input-icon-left" }, P = { class: "text-center py-8" }, _ = { class: "text-gray-500" }, q = /* @__PURE__ */ x({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(a, { emit: g }) {
    const n = g, i = v("");
    let c;
    const h = (e) => {
      n("paginate", { page: e.page, rows: e.rows });
    }, y = (e) => {
      n("sort", { sortField: e.sortField, sortOrder: e.sortOrder });
    }, b = (e) => {
      n("filter", { globalFilter: e.globalFilter });
    }, w = () => {
      clearTimeout(c), c = setTimeout(() => {
        n("search", { query: i.value });
      }, 300);
    };
    return (e, l) => (d(), m(r(C), {
      value: a.items,
      paginator: !0,
      rows: a.perPage,
      "total-records": a.totalRecords,
      loading: a.loading,
      lazy: !0,
      "global-filter-fields": ["*"],
      "responsive-layout": "scroll",
      onPage: h,
      onSort: y,
      onFilter: b
    }, {
      header: s(() => [
        o("div", D, [
          o("span", I, [
            l[1] || (l[1] = o("i", { class: "pi pi-search" }, null, -1)),
            p(r(S), {
              modelValue: i.value,
              "onUpdate:modelValue": l[0] || (l[0] = (t) => i.value = t),
              placeholder: r(u)("crud.datatable.search_placeholder"),
              onInput: w
            }, null, 8, ["modelValue", "placeholder"])
          ])
        ])
      ]),
      empty: s(() => [
        o("div", P, [
          o("p", _, B(r(u)("crud.datatable.no_data")), 1)
        ])
      ]),
      loadingicon: s(() => [...l[2] || (l[2] = [
        o("i", { class: "pi pi-spin pi-spinner" }, null, -1)
      ])]),
      default: s(() => [
        (d(!0), F(T, null, V(a.columns, (t) => (d(), m(r(f), {
          key: t.field,
          field: t.field,
          header: t.header,
          sortable: !0
        }, null, 8, ["field", "header"]))), 128)),
        p(r(f), {
          header: r(u)("crud.button.actions"),
          "body-style": { width: "8rem" },
          style: { "text-align": "center" }
        }, {
          body: s(({ data: t }) => [
            k(e.$slots, "actions", { row: t })
          ]),
          _: 3
        }, 8, ["header"])
      ]),
      _: 3
    }, 8, ["value", "rows", "total-records", "loading"]));
  }
});
export {
  q as default
};
