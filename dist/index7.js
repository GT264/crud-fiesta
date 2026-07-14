import { defineComponent as S, ref as _, openBlock as p, createBlock as f, unref as d, withCtx as a, createElementBlock as k, Fragment as B, renderList as C, createSlots as N, createTextVNode as P, toDisplayString as g, createVNode as y, renderSlot as D, createElementVNode as o } from "vue";
import { usePage as I } from "@inertiajs/vue3";
import R from "primevue/datatable";
import h from "primevue/column";
import j from "primevue/inputtext";
const E = { class: "flex items-center justify-between" }, L = { class: "p-input-icon-left" }, O = { class: "text-center py-8" }, q = { class: "text-gray-500" }, G = /* @__PURE__ */ S({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(l, { emit: b }) {
    const n = b, v = I();
    function u(e) {
      var t;
      return ((t = v.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const c = _("");
    let m;
    const x = (e) => {
      n("paginate", { page: e.page, rows: e.rows });
    }, T = (e) => {
      n("sort", { sortField: e.sortField, sortOrder: e.sortOrder });
    }, F = (e) => {
      n("filter", { globalFilter: e.globalFilter });
    };
    function V(e, t) {
      if (!t.relation) return e[t.field];
      const { relation: r, display_field: i } = t.relation, s = e[r];
      return s && typeof s == "object" && i in s ? s[i] : e[t.field];
    }
    const w = () => {
      clearTimeout(m), m = setTimeout(() => {
        n("search", { query: c.value });
      }, 300);
    };
    return (e, t) => (p(), f(d(R), {
      value: l.items,
      paginator: !0,
      rows: l.perPage,
      "total-records": l.totalRecords,
      loading: l.loading,
      lazy: !0,
      "global-filter-fields": ["*"],
      "responsive-layout": "scroll",
      onPage: x,
      onSort: T,
      onFilter: F
    }, {
      header: a(() => [
        o("div", E, [
          o("span", L, [
            t[1] || (t[1] = o("i", { class: "pi pi-search" }, null, -1)),
            y(d(j), {
              modelValue: c.value,
              "onUpdate:modelValue": t[0] || (t[0] = (r) => c.value = r),
              placeholder: u("crud.datatable.search_placeholder"),
              onInput: w
            }, null, 8, ["modelValue", "placeholder"])
          ])
        ])
      ]),
      empty: a(() => [
        o("div", O, [
          o("p", q, g(u("crud.datatable.no_data")), 1)
        ])
      ]),
      loadingicon: a(() => [...t[2] || (t[2] = [
        o("i", { class: "pi pi-spin pi-spinner" }, null, -1)
      ])]),
      default: a(() => [
        (p(!0), k(B, null, C(l.columns, (r) => (p(), f(d(h), {
          key: r.field,
          field: r.field,
          header: r.header,
          sortable: !0
        }, N({ _: 2 }, [
          r.relation ? {
            name: "body",
            fn: a(({ data: i }) => [
              P(g(V(i, r)), 1)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["field", "header"]))), 128)),
        y(d(h), {
          header: u("crud.button.actions"),
          "body-style": { width: "8rem" },
          style: { "text-align": "center" }
        }, {
          body: a(({ data: r }) => [
            D(e.$slots, "actions", { row: r })
          ]),
          _: 3
        }, 8, ["header"])
      ]),
      _: 3
    }, 8, ["value", "rows", "total-records", "loading"]));
  }
});
export {
  G as default
};
