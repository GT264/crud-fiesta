import { defineComponent as Y, ref as k, computed as L, onUnmounted as Z, openBlock as t, createElementBlock as l, createElementVNode as n, createVNode as v, unref as i, withDirectives as b, vModelText as V, withCtx as w, toDisplayString as u, createTextVNode as T, Fragment as h, renderList as x, createBlock as q, createCommentVNode as C, vModelSelect as O, renderSlot as ee } from "vue";
import { Search as te, Download as le, ArrowUp as ne, ArrowDown as oe, Loader2 as se } from "lucide-vue-next";
import S from "./index15.js";
import ae from "./index16.js";
import { useCrudTranslation as ie } from "./index17.js";
import { buildFilterPayload as re } from "./index18.js";
const de = { class: "space-y-4" }, ue = { class: "flex items-center justify-between" }, ce = { class: "flex items-center gap-2" }, fe = { class: "relative w-64" }, me = ["placeholder"], pe = { class: "inline-block border border-border rounded px-2 py-0.5 text-xs bg-muted" }, ge = { class: "rounded-md border" }, ve = { class: "w-full caption-bottom text-sm" }, be = { class: "[&_tr]:border-b" }, he = { class: "border-b transition-colors hover:bg-muted/50" }, xe = ["onClick"], _e = { class: "flex items-center gap-1" }, ye = { key: 0 }, ke = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, we = {
  key: 0,
  class: "border-b bg-muted/20"
}, Ce = ["onUpdate:modelValue", "onChange"], Pe = { value: "" }, Ve = ["value"], Te = ["onUpdate:modelValue", "onChange"], Ue = ["value"], Fe = ["onUpdate:modelValue", "onInput"], $e = {
  key: 3,
  class: "flex items-center gap-1"
}, Ie = ["onUpdate:modelValue", "placeholder", "onInput"], Ne = ["onUpdate:modelValue", "placeholder", "onInput"], De = { class: "[&_tr:last-child]:border-0" }, Oe = {
  key: 0,
  class: "border-b transition-colors"
}, Se = ["colspan"], Me = {
  key: 1,
  class: "border-b transition-colors"
}, je = ["colspan"], Be = { class: "text-muted-foreground" }, Re = { class: "p-4 align-middle text-center" }, ze = { class: "flex items-center justify-end gap-2" }, Ee = { class: "flex items-center gap-2" }, Ae = ["value"], Le = { class: "text-xs text-muted-foreground whitespace-nowrap" }, qe = { class: "text-sm text-muted-foreground" }, Xe = /* @__PURE__ */ Y({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    perPageOptions: { default: () => [10, 25, 50, 100] },
    loading: { type: Boolean, default: !1 },
    keyName: { default: "id" },
    routePrefix: { default: "" }
  },
  emits: ["paginate", "sort", "filter", "search", "perPageChange", "export"],
  setup(r, { emit: Q }) {
    const _ = r, m = Q, { crudT: d } = ie(), p = k(1), U = k(null), P = k(1), F = k("");
    let $;
    const c = k({}), I = {}, G = L(() => _.columns.some((a) => a.filter_config != null));
    function y(a) {
      const s = _.columns.find((e) => e.field === a);
      return s == null ? void 0 : s.filter_config;
    }
    function M() {
      m("filter", { globalFilter: re(_.columns, c.value) });
    }
    function j(a) {
      M();
    }
    function N(a) {
      clearTimeout(I[a]), I[a] = setTimeout(() => M(), 300);
    }
    function B(a) {
      p.value = a, m("paginate", { page: a - 1, rows: _.perPage });
    }
    const D = k(_.perPage);
    function H() {
      p.value = 1, m("perPageChange", D.value);
    }
    function J(a) {
      const s = U.value;
      U.value = a, P.value = s === a && P.value === 1 ? -1 : 1, m("sort", { sortField: a, sortOrder: P.value });
    }
    function K() {
      clearTimeout($), $ = setTimeout(() => m("search", { query: F.value }), 300);
    }
    Z(() => {
      clearTimeout($), Object.values(I).forEach(clearTimeout);
    });
    function W(a, s) {
      if (!s.relation) return a[s.field];
      const { relation: e, display_field: f } = s.relation, g = a[e];
      return g && typeof g == "object" && f in g ? g[f] : a[s.field];
    }
    const X = L(() => [
      {
        label: d("crud.export.excel"),
        command: () => m("export", "xlsx")
      },
      {
        label: d("crud.export.csv"),
        command: () => m("export", "csv")
      }
    ]);
    return (a, s) => (t(), l("div", de, [
      n("div", ue, [
        n("div", ce, [
          n("div", fe, [
            v(i(te), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
            b(n("input", {
              "onUpdate:modelValue": s[0] || (s[0] = (e) => F.value = e),
              placeholder: i(d)("crud.datatable.search_placeholder"),
              class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onInput: K
            }, null, 40, me), [
              [V, F.value]
            ])
          ]),
          v(ae, { items: X.value }, {
            trigger: w(() => [
              v(S, {
                variant: "outline",
                size: "sm"
              }, {
                default: w(() => [
                  v(i(le), { class: "h-4 w-4 mr-1" }),
                  T(" " + u(i(d)("crud.export.label")), 1)
                ]),
                _: 1
              })
            ]),
            item: w(({ item: e }) => [
              n("span", pe, u(e.label), 1)
            ]),
            _: 1
          }, 8, ["items"])
        ])
      ]),
      n("div", ge, [
        n("table", ve, [
          n("thead", be, [
            n("tr", he, [
              (t(!0), l(h, null, x(r.columns, (e) => (t(), l("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (f) => J(e.field)
              }, [
                n("div", _e, [
                  T(u(i(d)(e.header)) + " ", 1),
                  U.value === e.field ? (t(), l("span", ye, [
                    P.value === 1 ? (t(), q(i(ne), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (t(), q(i(oe), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : C("", !0)
                ])
              ], 8, xe))), 128)),
              n("th", ke, u(i(d)("crud.button.actions")), 1)
            ]),
            G.value ? (t(), l("tr", we, [
              (t(!0), l(h, null, x(r.columns, (e) => {
                var f, g, R, z, E, A;
                return t(), l("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((f = y(e.field)) == null ? void 0 : f.type) === "select" ? b((t(), l("select", {
                    key: 0,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (o) => j(e.field)
                  }, [
                    n("option", Pe, u(i(d)("crud.datatable.filters.select_placeholder")), 1),
                    (t(!0), l(h, null, x((g = y(e.field)) == null ? void 0 : g.options, (o) => (t(), l("option", {
                      key: o.value,
                      value: o.value
                    }, u(o.label), 9, Ve))), 128))
                  ], 40, Ce)), [
                    [O, c.value[e.field]]
                  ]) : ((R = y(e.field)) == null ? void 0 : R.type) === "multiselect" ? b((t(), l("select", {
                    key: 1,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (o) => j(e.field)
                  }, [
                    (t(!0), l(h, null, x((z = y(e.field)) == null ? void 0 : z.options, (o) => (t(), l("option", {
                      key: o.value,
                      value: o.value
                    }, u(o.label), 9, Ue))), 128))
                  ], 40, Te)), [
                    [O, c.value[e.field]]
                  ]) : ((E = y(e.field)) == null ? void 0 : E.type) === "date" ? b((t(), l("input", {
                    key: 2,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (o) => N(e.field)
                  }, null, 40, Fe)), [
                    [V, c.value[e.field]]
                  ]) : ((A = y(e.field)) == null ? void 0 : A.type) === "date_range" ? (t(), l("div", $e, [
                    b(n("input", {
                      "onUpdate:modelValue": (o) => c.value[e.field + "_start"] = o,
                      type: "date",
                      placeholder: i(d)("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (o) => N(e.field)
                    }, null, 40, Ie), [
                      [V, c.value[e.field + "_start"]]
                    ]),
                    b(n("input", {
                      "onUpdate:modelValue": (o) => c.value[e.field + "_end"] = o,
                      type: "date",
                      placeholder: i(d)("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (o) => N(e.field)
                    }, null, 40, Ne), [
                      [V, c.value[e.field + "_end"]]
                    ])
                  ])) : C("", !0)
                ]);
              }), 128)),
              s[4] || (s[4] = n("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : C("", !0)
          ]),
          n("tbody", De, [
            r.loading ? (t(), l("tr", Oe, [
              n("td", {
                colspan: r.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                v(i(se), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, Se)
            ])) : r.items.length === 0 ? (t(), l("tr", Me, [
              n("td", {
                colspan: r.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                n("p", Be, u(i(d)("crud.datatable.no_data")), 1)
              ], 8, je)
            ])) : C("", !0),
            (t(!0), l(h, null, x(r.items, (e) => (t(), l("tr", {
              key: e[_.keyName],
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (t(!0), l(h, null, x(r.columns, (f) => (t(), l("td", {
                key: f.field,
                class: "p-4 align-middle"
              }, u(f.relation ? W(e, f) : e[f.field]), 1))), 128)),
              n("td", Re, [
                ee(a.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      n("div", ze, [
        n("div", Ee, [
          r.perPageOptions.length > 0 ? b((t(), l("select", {
            key: 0,
            "onUpdate:modelValue": s[1] || (s[1] = (e) => D.value = e),
            class: "flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onChange: H
          }, [
            (t(!0), l(h, null, x(r.perPageOptions, (e) => (t(), l("option", {
              key: e,
              value: e
            }, u(e), 9, Ae))), 128))
          ], 544)), [
            [O, D.value]
          ]) : C("", !0),
          n("span", Le, u(i(d)("crud.datatable.per_page")), 1)
        ]),
        v(S, {
          variant: "outline",
          size: "sm",
          disabled: p.value <= 1,
          onClick: s[2] || (s[2] = (e) => B(p.value - 1))
        }, {
          default: w(() => [
            T(u(i(d)("crud.datatable.previous")), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        n("span", qe, u(i(d)("crud.datatable.current_of_total", { current: p.value, total: Math.max(1, Math.ceil(r.totalRecords / r.perPage)) })), 1),
        v(S, {
          variant: "outline",
          size: "sm",
          disabled: p.value * r.perPage >= r.totalRecords,
          onClick: s[3] || (s[3] = (e) => B(p.value + 1))
        }, {
          default: w(() => [
            T(u(i(d)("crud.datatable.next")), 1)
          ]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  Xe as default
};
