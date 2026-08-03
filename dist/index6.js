import { defineComponent as ee, ref as k, computed as L, onUnmounted as te, openBlock as l, createElementBlock as o, createElementVNode as s, createVNode as v, unref as w, withDirectives as b, vModelText as U, withCtx as P, toDisplayString as c, createTextVNode as T, Fragment as h, renderList as x, createBlock as q, createCommentVNode as C, vModelSelect as D, renderSlot as ne } from "vue";
import { usePage as le } from "@inertiajs/vue3";
import { Search as oe, Download as se, ArrowUp as ae, ArrowDown as ie, Loader2 as re } from "lucide-vue-next";
import j from "./index15.js";
import de from "./index16.js";
const ue = { class: "space-y-4" }, ce = { class: "flex items-center justify-between" }, fe = { class: "flex items-center gap-2" }, pe = { class: "relative w-64" }, me = ["placeholder"], ge = { class: "inline-block border border-border rounded px-2 py-0.5 text-xs bg-muted" }, ve = { class: "rounded-md border" }, be = { class: "w-full caption-bottom text-sm" }, he = { class: "[&_tr]:border-b" }, xe = { class: "border-b transition-colors hover:bg-muted/50" }, _e = ["onClick"], ye = { class: "flex items-center gap-1" }, ke = { key: 0 }, we = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, Pe = {
  key: 0,
  class: "border-b bg-muted/20"
}, Ce = ["onUpdate:modelValue", "onChange"], Ve = { value: "" }, Ue = ["value"], Te = ["onUpdate:modelValue", "onChange"], Fe = ["value"], $e = ["onUpdate:modelValue", "onInput"], Ie = {
  key: 3,
  class: "flex items-center gap-1"
}, Ne = ["onUpdate:modelValue", "placeholder", "onInput"], Oe = ["onUpdate:modelValue", "placeholder", "onInput"], Se = { class: "[&_tr:last-child]:border-0" }, De = {
  key: 0,
  class: "border-b transition-colors"
}, je = ["colspan"], Me = {
  key: 1,
  class: "border-b transition-colors"
}, Ae = ["colspan"], Be = { class: "text-muted-foreground" }, Re = { class: "p-4 align-middle text-center" }, ze = { class: "flex items-center justify-end gap-2" }, Ee = { class: "flex items-center gap-2" }, Le = ["value"], qe = { class: "text-xs text-muted-foreground whitespace-nowrap" }, Qe = { class: "text-sm text-muted-foreground" }, Xe = /* @__PURE__ */ ee({
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
  setup(d, { emit: Q }) {
    const _ = d, p = Q, G = le();
    function u(n, t) {
      var r;
      let e = ((r = G.props.crudLang) == null ? void 0 : r[n]) ?? n;
      if (t)
        for (const [i, g] of Object.entries(t))
          e = e.replace(`:${i}`, String(g));
      return e;
    }
    const m = k(1), F = k(null), V = k(1), $ = k("");
    let I;
    const f = k({}), N = {}, H = L(() => _.columns.some((n) => n.filter_config != null));
    function y(n) {
      const t = _.columns.find((e) => e.field === n);
      return t == null ? void 0 : t.filter_config;
    }
    function J() {
      const n = {};
      for (const t of _.columns) {
        if (!t.filter_config) continue;
        const e = t.field, r = t.filter_config;
        if (r.type === "date_range") {
          const i = f.value[e + "_start"], g = f.value[e + "_end"];
          (i || g) && (n[e] = { type: "date_range", value: { start: i || "", end: g || "" } });
        } else {
          const i = f.value[e];
          i != null && i !== "" && (!Array.isArray(i) || i.length > 0) && (n[e] = { type: r.type, value: i });
        }
      }
      return n;
    }
    function M() {
      p("filter", { globalFilter: J() });
    }
    function A(n) {
      M();
    }
    function O(n) {
      clearTimeout(N[n]), N[n] = setTimeout(() => M(), 300);
    }
    function B(n) {
      m.value = n, p("paginate", { page: n - 1, rows: _.perPage });
    }
    const S = k(_.perPage);
    function K() {
      m.value = 1, p("perPageChange", S.value);
    }
    function W(n) {
      const t = F.value;
      F.value = n, V.value = t === n && V.value === 1 ? -1 : 1, p("sort", { sortField: n, sortOrder: V.value });
    }
    function X() {
      clearTimeout(I), I = setTimeout(() => p("search", { query: $.value }), 300);
    }
    te(() => {
      clearTimeout(I), Object.values(N).forEach(clearTimeout);
    });
    function Y(n, t) {
      if (!t.relation) return n[t.field];
      const { relation: e, display_field: r } = t.relation, i = n[e];
      return i && typeof i == "object" && r in i ? i[r] : n[t.field];
    }
    const Z = L(() => [
      {
        label: u("crud.export.excel"),
        command: () => p("export", "xlsx")
      },
      {
        label: u("crud.export.csv"),
        command: () => p("export", "csv")
      }
    ]);
    return (n, t) => (l(), o("div", ue, [
      s("div", ce, [
        s("div", fe, [
          s("div", pe, [
            v(w(oe), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
            b(s("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (e) => $.value = e),
              placeholder: u("crud.datatable.search_placeholder"),
              class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              onInput: X
            }, null, 40, me), [
              [U, $.value]
            ])
          ]),
          v(de, { items: Z.value }, {
            trigger: P(() => [
              v(j, {
                variant: "outline",
                size: "sm"
              }, {
                default: P(() => [
                  v(w(se), { class: "h-4 w-4 mr-1" }),
                  T(" " + c(u("crud.export.label")), 1)
                ]),
                _: 1
              })
            ]),
            item: P(({ item: e }) => [
              s("span", ge, c(e.label), 1)
            ]),
            _: 1
          }, 8, ["items"])
        ])
      ]),
      s("div", ve, [
        s("table", be, [
          s("thead", he, [
            s("tr", xe, [
              (l(!0), o(h, null, x(d.columns, (e) => (l(), o("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (r) => W(e.field)
              }, [
                s("div", ye, [
                  T(c(u(e.header)) + " ", 1),
                  F.value === e.field ? (l(), o("span", ke, [
                    V.value === 1 ? (l(), q(w(ae), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (l(), q(w(ie), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : C("", !0)
                ])
              ], 8, _e))), 128)),
              s("th", we, c(u("crud.button.actions")), 1)
            ]),
            H.value ? (l(), o("tr", Pe, [
              (l(!0), o(h, null, x(d.columns, (e) => {
                var r, i, g, R, z, E;
                return l(), o("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((r = y(e.field)) == null ? void 0 : r.type) === "select" ? b((l(), o("select", {
                    key: 0,
                    "onUpdate:modelValue": (a) => f.value[e.field] = a,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (a) => A(e.field)
                  }, [
                    s("option", Ve, c(u("crud.datatable.filters.select_placeholder")), 1),
                    (l(!0), o(h, null, x((i = y(e.field)) == null ? void 0 : i.options, (a) => (l(), o("option", {
                      key: a.value,
                      value: a.value
                    }, c(a.label), 9, Ue))), 128))
                  ], 40, Ce)), [
                    [D, f.value[e.field]]
                  ]) : ((g = y(e.field)) == null ? void 0 : g.type) === "multiselect" ? b((l(), o("select", {
                    key: 1,
                    "onUpdate:modelValue": (a) => f.value[e.field] = a,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (a) => A(e.field)
                  }, [
                    (l(!0), o(h, null, x((R = y(e.field)) == null ? void 0 : R.options, (a) => (l(), o("option", {
                      key: a.value,
                      value: a.value
                    }, c(a.label), 9, Fe))), 128))
                  ], 40, Te)), [
                    [D, f.value[e.field]]
                  ]) : ((z = y(e.field)) == null ? void 0 : z.type) === "date" ? b((l(), o("input", {
                    key: 2,
                    "onUpdate:modelValue": (a) => f.value[e.field] = a,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (a) => O(e.field)
                  }, null, 40, $e)), [
                    [U, f.value[e.field]]
                  ]) : ((E = y(e.field)) == null ? void 0 : E.type) === "date_range" ? (l(), o("div", Ie, [
                    b(s("input", {
                      "onUpdate:modelValue": (a) => f.value[e.field + "_start"] = a,
                      type: "date",
                      placeholder: u("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (a) => O(e.field)
                    }, null, 40, Ne), [
                      [U, f.value[e.field + "_start"]]
                    ]),
                    b(s("input", {
                      "onUpdate:modelValue": (a) => f.value[e.field + "_end"] = a,
                      type: "date",
                      placeholder: u("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (a) => O(e.field)
                    }, null, 40, Oe), [
                      [U, f.value[e.field + "_end"]]
                    ])
                  ])) : C("", !0)
                ]);
              }), 128)),
              t[4] || (t[4] = s("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : C("", !0)
          ]),
          s("tbody", Se, [
            d.loading ? (l(), o("tr", De, [
              s("td", {
                colspan: d.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                v(w(re), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, je)
            ])) : d.items.length === 0 ? (l(), o("tr", Me, [
              s("td", {
                colspan: d.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                s("p", Be, c(u("crud.datatable.no_data")), 1)
              ], 8, Ae)
            ])) : C("", !0),
            (l(!0), o(h, null, x(d.items, (e) => (l(), o("tr", {
              key: e[_.keyName],
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (l(!0), o(h, null, x(d.columns, (r) => (l(), o("td", {
                key: r.field,
                class: "p-4 align-middle"
              }, c(r.relation ? Y(e, r) : e[r.field]), 1))), 128)),
              s("td", Re, [
                ne(n.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      s("div", ze, [
        s("div", Ee, [
          d.perPageOptions.length > 0 ? b((l(), o("select", {
            key: 0,
            "onUpdate:modelValue": t[1] || (t[1] = (e) => S.value = e),
            class: "flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onChange: K
          }, [
            (l(!0), o(h, null, x(d.perPageOptions, (e) => (l(), o("option", {
              key: e,
              value: e
            }, c(e), 9, Le))), 128))
          ], 544)), [
            [D, S.value]
          ]) : C("", !0),
          s("span", qe, c(u("crud.datatable.per_page")), 1)
        ]),
        v(j, {
          variant: "outline",
          size: "sm",
          disabled: m.value <= 1,
          onClick: t[2] || (t[2] = (e) => B(m.value - 1))
        }, {
          default: P(() => [
            T(c(u("crud.datatable.previous")), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        s("span", Qe, c(u("crud.datatable.current_of_total", { current: m.value, total: Math.max(1, Math.ceil(d.totalRecords / d.perPage)) })), 1),
        v(j, {
          variant: "outline",
          size: "sm",
          disabled: m.value * d.perPage >= d.totalRecords,
          onClick: t[3] || (t[3] = (e) => B(m.value + 1))
        }, {
          default: P(() => [
            T(c(u("crud.datatable.next")), 1)
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
