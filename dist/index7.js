import { defineComponent as T, ref as v, openBlock as u, createBlock as p, unref as n, withCtx as l, createElementBlock as F, Fragment as V, renderList as B, createVNode as m, renderSlot as C, createElementVNode as o, toDisplayString as P } from "vue";
import { usePage as S } from "@inertiajs/vue3";
import k from "primevue/datatable";
import f from "primevue/column";
import D from "primevue/inputtext";
const I = { class: "flex items-center justify-between" }, _ = { class: "p-input-icon-left" }, E = { class: "text-center py-8" }, L = { class: "text-gray-500" }, z = /* @__PURE__ */ T({
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
    const s = g, h = S();
    function i(e) {
      var t;
      return ((t = h.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const d = v("");
    let c;
    const y = (e) => {
      s("paginate", { page: e.page, rows: e.rows });
    }, b = (e) => {
      s("sort", { sortField: e.sortField, sortOrder: e.sortOrder });
    }, w = (e) => {
      s("filter", { globalFilter: e.globalFilter });
    }, x = () => {
      clearTimeout(c), c = setTimeout(() => {
        s("search", { query: d.value });
      }, 300);
    };
    return (e, t) => (u(), p(n(k), {
      value: a.items,
      paginator: !0,
      rows: a.perPage,
      "total-records": a.totalRecords,
      loading: a.loading,
      lazy: !0,
      "global-filter-fields": ["*"],
      "responsive-layout": "scroll",
      onPage: y,
      onSort: b,
      onFilter: w
    }, {
      header: l(() => [
        o("div", I, [
          o("span", _, [
            t[1] || (t[1] = o("i", { class: "pi pi-search" }, null, -1)),
            m(n(D), {
              modelValue: d.value,
              "onUpdate:modelValue": t[0] || (t[0] = (r) => d.value = r),
              placeholder: i("crud.datatable.search_placeholder"),
              onInput: x
            }, null, 8, ["modelValue", "placeholder"])
          ])
        ])
      ]),
      empty: l(() => [
        o("div", E, [
          o("p", L, P(i("crud.datatable.no_data")), 1)
        ])
      ]),
      loadingicon: l(() => [...t[2] || (t[2] = [
        o("i", { class: "pi pi-spin pi-spinner" }, null, -1)
      ])]),
      default: l(() => [
        (u(!0), F(V, null, B(a.columns, (r) => (u(), p(n(f), {
          key: r.field,
          field: r.field,
          header: r.header,
          sortable: !0
        }, null, 8, ["field", "header"]))), 128)),
        m(n(f), {
          header: i("crud.button.actions"),
          "body-style": { width: "8rem" },
          style: { "text-align": "center" }
        }, {
          body: l(({ data: r }) => [
            C(e.$slots, "actions", { row: r })
          ]),
          _: 3
        }, 8, ["header"])
      ]),
      _: 3
    }, 8, ["value", "rows", "total-records", "loading"]));
  }
});
export {
  z as default
};
