import { defineComponent as D, ref as g, openBlock as a, createElementBlock as r, createElementVNode as s, createVNode as u, unref as c, withDirectives as F, vModelText as L, withCtx as b, toDisplayString as i, Fragment as w, renderList as C, createTextVNode as P, createBlock as R, createCommentVNode as T, renderSlot as M } from "vue";
import { usePage as j } from "@inertiajs/vue3";
import { Search as A, ChevronLeft as E, ChevronRight as I, ArrowUp as O, ArrowDown as U, Loader2 as q } from "lucide-vue-next";
import x from "./index15.js";
const Q = { class: "space-y-4" }, G = { class: "flex items-center justify-between" }, H = { class: "relative w-64" }, J = ["placeholder"], K = { class: "flex items-center gap-2" }, W = { class: "text-sm text-muted-foreground" }, X = { class: "rounded-md border" }, Y = { class: "w-full caption-bottom text-sm" }, Z = { class: "[&_tr]:border-b" }, ee = { class: "border-b transition-colors hover:bg-muted/50" }, te = ["onClick"], se = { class: "flex items-center gap-1" }, oe = { key: 0 }, le = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, ne = { class: "[&_tr:last-child]:border-0" }, ae = {
  key: 0,
  class: "border-b transition-colors"
}, re = ["colspan"], ie = {
  key: 1,
  class: "border-b transition-colors"
}, de = ["colspan"], ue = { class: "text-muted-foreground" }, ce = { class: "p-4 align-middle text-center" }, me = { class: "flex items-center justify-end gap-2" }, fe = { class: "text-sm text-muted-foreground" }, xe = /* @__PURE__ */ D({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(t, { emit: $ }) {
    const N = t, p = $, V = j();
    function m(l) {
      var e;
      return ((e = V.props.crudLang) == null ? void 0 : e[l]) ?? l;
    }
    const n = g(1), y = g(null), f = g(1), k = g("");
    let _;
    function v(l) {
      n.value = l, p("paginate", { page: l - 1, rows: N.perPage });
    }
    function S(l) {
      y.value = l, f.value = y.value === l && f.value === 1 ? -1 : 1, p("sort", { sortField: l, sortOrder: f.value });
    }
    function z() {
      clearTimeout(_), _ = setTimeout(() => p("search", { query: k.value }), 300);
    }
    function B(l, e) {
      if (!e.relation) return l[e.field];
      const { relation: o, display_field: d } = e.relation, h = l[o];
      return h && typeof h == "object" && d in h ? h[d] : l[e.field];
    }
    return (l, e) => (a(), r("div", Q, [
      s("div", G, [
        s("div", H, [
          u(c(A), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          F(s("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (o) => k.value = o),
            placeholder: m("crud.datatable.search_placeholder"),
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: z
          }, null, 40, J), [
            [L, k.value]
          ])
        ]),
        s("div", K, [
          u(x, {
            variant: "outline",
            size: "sm",
            disabled: n.value <= 1,
            onClick: e[1] || (e[1] = (o) => v(n.value - 1))
          }, {
            default: b(() => [
              u(c(E), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"]),
          s("span", W, i(t.totalRecords > 0 ? (n.value - 1) * t.perPage + 1 : 0) + "-" + i(Math.min(n.value * t.perPage, t.totalRecords)) + " " + i(m("crud.datatable.of") || "of") + " " + i(t.totalRecords), 1),
          u(x, {
            variant: "outline",
            size: "sm",
            disabled: n.value * t.perPage >= t.totalRecords,
            onClick: e[2] || (e[2] = (o) => v(n.value + 1))
          }, {
            default: b(() => [
              u(c(I), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      s("div", X, [
        s("table", Y, [
          s("thead", Z, [
            s("tr", ee, [
              (a(!0), r(w, null, C(t.columns, (o) => (a(), r("th", {
                key: o.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (d) => S(o.field)
              }, [
                s("div", se, [
                  P(i(o.header) + " ", 1),
                  y.value === o.field ? (a(), r("span", oe, [
                    f.value === 1 ? (a(), R(c(O), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (a(), R(c(U), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : T("", !0)
                ])
              ], 8, te))), 128)),
              s("th", le, i(m("crud.button.actions")), 1)
            ])
          ]),
          s("tbody", ne, [
            t.loading ? (a(), r("tr", ae, [
              s("td", {
                colspan: t.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                u(c(q), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, re)
            ])) : t.items.length === 0 ? (a(), r("tr", ie, [
              s("td", {
                colspan: t.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                s("p", ue, i(m("crud.datatable.no_data")), 1)
              ], 8, de)
            ])) : T("", !0),
            (a(!0), r(w, null, C(t.items, (o) => (a(), r("tr", {
              key: o.id,
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (a(!0), r(w, null, C(t.columns, (d) => (a(), r("td", {
                key: d.field,
                class: "p-4 align-middle"
              }, i(d.relation ? B(o, d) : o[d.field]), 1))), 128)),
              s("td", ce, [
                M(l.$slots, "actions", { row: o })
              ])
            ]))), 128))
          ])
        ])
      ]),
      s("div", me, [
        u(x, {
          variant: "outline",
          size: "sm",
          disabled: n.value <= 1,
          onClick: e[3] || (e[3] = (o) => v(n.value - 1))
        }, {
          default: b(() => [...e[5] || (e[5] = [
            P(" Previous ", -1)
          ])]),
          _: 1
        }, 8, ["disabled"]),
        s("span", fe, " Page " + i(n.value) + " of " + i(Math.max(1, Math.ceil(t.totalRecords / t.perPage))), 1),
        u(x, {
          variant: "outline",
          size: "sm",
          disabled: n.value * t.perPage >= t.totalRecords,
          onClick: e[4] || (e[4] = (o) => v(n.value + 1))
        }, {
          default: b(() => [...e[6] || (e[6] = [
            P(" Next ", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  xe as default
};
