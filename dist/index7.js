import { defineComponent as w, ref as x, openBlock as d, createBlock as m, unref as n, withCtx as a, createElementBlock as v, Fragment as F, renderList as T, createVNode as p, renderSlot as C, createElementVNode as o } from "vue";
import V from "primevue/datatable";
import c from "primevue/column";
import k from "primevue/inputtext";
const B = { class: "flex items-center justify-between" }, I = { class: "p-input-icon-left" }, D = /* @__PURE__ */ w({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(r, { emit: f }) {
    const s = f, i = x("");
    let u;
    const g = (e) => {
      s("paginate", { page: e.page, rows: e.rows });
    }, y = (e) => {
      s("sort", { sortField: e.sortField, sortOrder: e.sortOrder });
    }, b = (e) => {
      s("filter", { globalFilter: e.globalFilter });
    }, h = () => {
      clearTimeout(u), u = setTimeout(() => {
        s("search", { query: i.value });
      }, 300);
    };
    return (e, t) => (d(), m(n(V), {
      value: r.items,
      paginator: !0,
      rows: r.perPage,
      "total-records": r.totalRecords,
      loading: r.loading,
      lazy: !0,
      "global-filter-fields": ["*"],
      "responsive-layout": "scroll",
      onPage: g,
      onSort: y,
      onFilter: b
    }, {
      header: a(() => [
        o("div", B, [
          o("span", I, [
            t[1] || (t[1] = o("i", { class: "pi pi-search" }, null, -1)),
            p(n(k), {
              modelValue: i.value,
              "onUpdate:modelValue": t[0] || (t[0] = (l) => i.value = l),
              placeholder: "Cerca...",
              onInput: h
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      empty: a(() => [...t[2] || (t[2] = [
        o("div", { class: "text-center py-8" }, [
          o("p", { class: "text-gray-500" }, "Nessun dato disponibile")
        ], -1)
      ])]),
      loadingicon: a(() => [...t[3] || (t[3] = [
        o("i", { class: "pi pi-spin pi-spinner" }, null, -1)
      ])]),
      default: a(() => [
        (d(!0), v(F, null, T(r.columns, (l) => (d(), m(n(c), {
          key: l.field,
          field: l.field,
          header: l.header,
          sortable: !0
        }, null, 8, ["field", "header"]))), 128)),
        p(n(c), {
          header: "Azioni",
          "body-style": { width: "8rem" },
          style: { "text-align": "center" }
        }, {
          body: a(({ data: l }) => [
            C(e.$slots, "actions", { row: l })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["value", "rows", "total-records", "loading"]));
  }
});
export {
  D as default
};
