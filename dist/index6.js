import { defineComponent as W, ref as k, computed as X, onUnmounted as Y, openBlock as n, createElementBlock as i, createElementVNode as s, createVNode as v, unref as g, withDirectives as h, vModelText as T, withCtx as U, toDisplayString as d, Fragment as b, renderList as x, createTextVNode as D, createBlock as L, createCommentVNode as F, vModelSelect as E, renderSlot as Z } from "vue";
import { usePage as ee } from "@inertiajs/vue3";
import { Search as te, ChevronLeft as le, ChevronRight as ne, ArrowUp as oe, ArrowDown as se, Loader2 as ie } from "lucide-vue-next";
import P from "./index15.js";
const ae = { class: "space-y-4" }, re = { class: "flex items-center justify-between" }, de = { class: "relative w-64" }, ue = ["placeholder"], ce = { class: "flex items-center gap-2" }, fe = { class: "text-sm text-muted-foreground" }, me = { class: "rounded-md border" }, ve = { class: "w-full caption-bottom text-sm" }, pe = { class: "[&_tr]:border-b" }, ge = { class: "border-b transition-colors hover:bg-muted/50" }, he = ["onClick"], be = { class: "flex items-center gap-1" }, xe = { key: 0 }, ye = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, _e = {
  key: 0,
  class: "border-b bg-muted/20"
}, ke = ["onUpdate:modelValue", "onChange"], we = { value: "" }, Ce = ["value"], Ve = ["onUpdate:modelValue", "onChange"], Te = ["value"], Ue = ["onUpdate:modelValue", "onInput"], Fe = {
  key: 3,
  class: "flex items-center gap-1"
}, Pe = ["onUpdate:modelValue", "placeholder", "onInput"], $e = ["onUpdate:modelValue", "placeholder", "onInput"], Ie = { class: "[&_tr:last-child]:border-0" }, Re = {
  key: 0,
  class: "border-b transition-colors"
}, Ne = ["colspan"], Se = {
  key: 1,
  class: "border-b transition-colors"
}, De = ["colspan"], Me = { class: "text-muted-foreground" }, je = { class: "p-4 align-middle text-center" }, ze = { class: "flex items-center justify-end gap-2" }, Ae = { class: "text-sm text-muted-foreground" }, qe = /* @__PURE__ */ W({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 },
    keyName: { default: "id" }
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(a, { emit: O }) {
    const y = a, w = O, q = ee();
    function m(l) {
      var t;
      return ((t = q.props.crudLang) == null ? void 0 : t[l]) ?? l;
    }
    const f = k(1), $ = k(null), C = k(1), I = k("");
    let R;
    const c = k({}), N = {}, Q = X(() => y.columns.some((l) => l.filter_config != null));
    function p(l) {
      const t = y.columns.find((e) => e.field === l);
      return t == null ? void 0 : t.filter_config;
    }
    function G() {
      const l = {};
      for (const t of y.columns) {
        if (!t.filter_config) continue;
        const e = t.field, u = t.filter_config;
        if (u.type === "date_range") {
          const r = c.value[e + "_start"], _ = c.value[e + "_end"];
          (r || _) && (l[e] = { type: "date_range", value: { start: r || "", end: _ || "" } });
        } else {
          const r = c.value[e];
          r != null && r !== "" && (!Array.isArray(r) || r.length > 0) && (l[e] = { type: u.type, value: r });
        }
      }
      return l;
    }
    function M() {
      w("filter", { globalFilter: G() });
    }
    function j(l) {
      M();
    }
    function S(l) {
      clearTimeout(N[l]), N[l] = setTimeout(() => M(), 300);
    }
    function V(l) {
      f.value = l, w("paginate", { page: l - 1, rows: y.perPage });
    }
    function H(l) {
      const t = $.value;
      $.value = l, C.value = t === l && C.value === 1 ? -1 : 1, w("sort", { sortField: l, sortOrder: C.value });
    }
    function J() {
      clearTimeout(R), R = setTimeout(() => w("search", { query: I.value }), 300);
    }
    Y(() => {
      clearTimeout(R), Object.values(N).forEach(clearTimeout);
    });
    function K(l, t) {
      if (!t.relation) return l[t.field];
      const { relation: e, display_field: u } = t.relation, r = l[e];
      return r && typeof r == "object" && u in r ? r[u] : l[t.field];
    }
    return (l, t) => (n(), i("div", ae, [
      s("div", re, [
        s("div", de, [
          v(g(te), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          h(s("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => I.value = e),
            placeholder: m("crud.datatable.search_placeholder"),
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: J
          }, null, 40, ue), [
            [T, I.value]
          ])
        ]),
        s("div", ce, [
          v(P, {
            variant: "outline",
            size: "sm",
            disabled: f.value <= 1,
            onClick: t[1] || (t[1] = (e) => V(f.value - 1))
          }, {
            default: U(() => [
              v(g(le), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"]),
          s("span", fe, d(a.totalRecords > 0 ? (f.value - 1) * a.perPage + 1 : 0) + "-" + d(Math.min(f.value * a.perPage, a.totalRecords)) + " " + d(m("crud.datatable.of") || "of") + " " + d(a.totalRecords), 1),
          v(P, {
            variant: "outline",
            size: "sm",
            disabled: f.value * a.perPage >= a.totalRecords,
            onClick: t[2] || (t[2] = (e) => V(f.value + 1))
          }, {
            default: U(() => [
              v(g(ne), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      s("div", me, [
        s("table", ve, [
          s("thead", pe, [
            s("tr", ge, [
              (n(!0), i(b, null, x(a.columns, (e) => (n(), i("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (u) => H(e.field)
              }, [
                s("div", be, [
                  D(d(m(e.header)) + " ", 1),
                  $.value === e.field ? (n(), i("span", xe, [
                    C.value === 1 ? (n(), L(g(oe), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (n(), L(g(se), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : F("", !0)
                ])
              ], 8, he))), 128)),
              s("th", ye, d(m("crud.button.actions")), 1)
            ]),
            Q.value ? (n(), i("tr", _e, [
              (n(!0), i(b, null, x(a.columns, (e) => {
                var u, r, _, z, A, B;
                return n(), i("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((u = p(e.field)) == null ? void 0 : u.type) === "select" ? h((n(), i("select", {
                    key: 0,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (o) => j(e.field)
                  }, [
                    s("option", we, d(m("crud.datatable.filters.select_placeholder")), 1),
                    (n(!0), i(b, null, x((r = p(e.field)) == null ? void 0 : r.options, (o) => (n(), i("option", {
                      key: o.value,
                      value: o.value
                    }, d(o.label), 9, Ce))), 128))
                  ], 40, ke)), [
                    [E, c.value[e.field]]
                  ]) : ((_ = p(e.field)) == null ? void 0 : _.type) === "multiselect" ? h((n(), i("select", {
                    key: 1,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (o) => j(e.field)
                  }, [
                    (n(!0), i(b, null, x((z = p(e.field)) == null ? void 0 : z.options, (o) => (n(), i("option", {
                      key: o.value,
                      value: o.value
                    }, d(o.label), 9, Te))), 128))
                  ], 40, Ve)), [
                    [E, c.value[e.field]]
                  ]) : ((A = p(e.field)) == null ? void 0 : A.type) === "date" ? h((n(), i("input", {
                    key: 2,
                    "onUpdate:modelValue": (o) => c.value[e.field] = o,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (o) => S(e.field)
                  }, null, 40, Ue)), [
                    [T, c.value[e.field]]
                  ]) : ((B = p(e.field)) == null ? void 0 : B.type) === "date_range" ? (n(), i("div", Fe, [
                    h(s("input", {
                      "onUpdate:modelValue": (o) => c.value[e.field + "_start"] = o,
                      type: "date",
                      placeholder: m("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (o) => S(e.field)
                    }, null, 40, Pe), [
                      [T, c.value[e.field + "_start"]]
                    ]),
                    h(s("input", {
                      "onUpdate:modelValue": (o) => c.value[e.field + "_end"] = o,
                      type: "date",
                      placeholder: m("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (o) => S(e.field)
                    }, null, 40, $e), [
                      [T, c.value[e.field + "_end"]]
                    ])
                  ])) : F("", !0)
                ]);
              }), 128)),
              t[5] || (t[5] = s("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : F("", !0)
          ]),
          s("tbody", Ie, [
            a.loading ? (n(), i("tr", Re, [
              s("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                v(g(ie), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, Ne)
            ])) : a.items.length === 0 ? (n(), i("tr", Se, [
              s("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                s("p", Me, d(m("crud.datatable.no_data")), 1)
              ], 8, De)
            ])) : F("", !0),
            (n(!0), i(b, null, x(a.items, (e) => (n(), i("tr", {
              key: e[y.keyName],
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (n(!0), i(b, null, x(a.columns, (u) => (n(), i("td", {
                key: u.field,
                class: "p-4 align-middle"
              }, d(u.relation ? K(e, u) : e[u.field]), 1))), 128)),
              s("td", je, [
                Z(l.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      s("div", ze, [
        v(P, {
          variant: "outline",
          size: "sm",
          disabled: f.value <= 1,
          onClick: t[3] || (t[3] = (e) => V(f.value - 1))
        }, {
          default: U(() => [
            D(d(m("crud.datatable.previous")), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        s("span", Ae, " Page " + d(f.value) + " of " + d(Math.max(1, Math.ceil(a.totalRecords / a.perPage))), 1),
        v(P, {
          variant: "outline",
          size: "sm",
          disabled: f.value * a.perPage >= a.totalRecords,
          onClick: t[4] || (t[4] = (e) => V(f.value + 1))
        }, {
          default: U(() => [
            D(d(m("crud.datatable.next")), 1)
          ]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  qe as default
};
