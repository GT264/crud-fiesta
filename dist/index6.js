import { defineComponent as W, ref as _, computed as X, openBlock as n, createElementBlock as i, createElementVNode as o, createVNode as m, unref as g, withDirectives as h, vModelText as P, withCtx as F, toDisplayString as c, Fragment as b, renderList as x, createTextVNode as N, createBlock as j, createCommentVNode as U, vModelSelect as E, renderSlot as Y } from "vue";
import { usePage as Z } from "@inertiajs/vue3";
import { Search as ee, ChevronLeft as te, ChevronRight as le, ArrowUp as ne, ArrowDown as se, Loader2 as oe } from "lucide-vue-next";
import $ from "./index15.js";
const ie = { class: "space-y-4" }, ae = { class: "flex items-center justify-between" }, re = { class: "relative w-64" }, de = ["placeholder"], ue = { class: "flex items-center gap-2" }, ce = { class: "text-sm text-muted-foreground" }, fe = { class: "rounded-md border" }, me = { class: "w-full caption-bottom text-sm" }, ve = { class: "[&_tr]:border-b" }, pe = { class: "border-b transition-colors hover:bg-muted/50" }, ge = ["onClick"], he = { class: "flex items-center gap-1" }, be = { key: 0 }, xe = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, ye = {
  key: 0,
  class: "border-b bg-muted/20"
}, _e = ["onUpdate:modelValue", "onChange"], ke = { value: "" }, we = ["value"], Ce = ["onUpdate:modelValue", "onChange"], Ve = ["value"], Pe = ["onUpdate:modelValue", "onInput"], Fe = {
  key: 3,
  class: "flex items-center gap-1"
}, Ue = ["onUpdate:modelValue", "placeholder", "onInput"], $e = ["onUpdate:modelValue", "placeholder", "onInput"], Te = { class: "[&_tr:last-child]:border-0" }, Ie = {
  key: 0,
  class: "border-b transition-colors"
}, Re = ["colspan"], Ne = {
  key: 1,
  class: "border-b transition-colors"
}, Se = ["colspan"], De = { class: "text-muted-foreground" }, Me = { class: "p-4 align-middle text-center" }, ze = { class: "flex items-center justify-end gap-2" }, Ae = { class: "text-sm text-muted-foreground" }, Oe = /* @__PURE__ */ W({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    loading: { type: Boolean, default: !1 },
    columnFilters: {}
  },
  emits: ["paginate", "sort", "filter", "search"],
  setup(a, { emit: O }) {
    const k = a, w = O, q = Z();
    function v(l) {
      var t;
      return ((t = q.props.crudLang) == null ? void 0 : t[l]) ?? l;
    }
    const f = _(1), T = _(null), C = _(1), I = _("");
    let S;
    const u = _({}), D = {}, Q = X(() => k.columns.some((l) => l.filter_config != null));
    function p(l) {
      const t = k.columns.find((e) => e.field === l);
      return t == null ? void 0 : t.filter_config;
    }
    function G() {
      const l = {};
      for (const t of k.columns) {
        if (!t.filter_config) continue;
        const e = t.field, d = t.filter_config;
        if (d.type === "date_range") {
          const r = u.value[e + "_start"], y = u.value[e + "_end"];
          (r || y) && (l[e] = { type: "date_range", value: { start: r || "", end: y || "" } });
        } else {
          const r = u.value[e];
          r != null && r !== "" && (!Array.isArray(r) || r.length > 0) && (l[e] = { type: d.type, value: r });
        }
      }
      return l;
    }
    function M() {
      w("filter", { globalFilter: G() });
    }
    function z(l) {
      M();
    }
    function R(l) {
      clearTimeout(D[l]), D[l] = setTimeout(() => M(), 300);
    }
    function V(l) {
      f.value = l, w("paginate", { page: l - 1, rows: k.perPage });
    }
    function H(l) {
      T.value = l, C.value = T.value === l && C.value === 1 ? -1 : 1, w("sort", { sortField: l, sortOrder: C.value });
    }
    function J() {
      clearTimeout(S), S = setTimeout(() => w("search", { query: I.value }), 300);
    }
    function K(l, t) {
      if (!t.relation) return l[t.field];
      const { relation: e, display_field: d } = t.relation, r = l[e];
      return r && typeof r == "object" && d in r ? r[d] : l[t.field];
    }
    return (l, t) => (n(), i("div", ie, [
      o("div", ae, [
        o("div", re, [
          m(g(ee), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          h(o("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => I.value = e),
            placeholder: v("crud.datatable.search_placeholder"),
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: J
          }, null, 40, de), [
            [P, I.value]
          ])
        ]),
        o("div", ue, [
          m($, {
            variant: "outline",
            size: "sm",
            disabled: f.value <= 1,
            onClick: t[1] || (t[1] = (e) => V(f.value - 1))
          }, {
            default: F(() => [
              m(g(te), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"]),
          o("span", ce, c(a.totalRecords > 0 ? (f.value - 1) * a.perPage + 1 : 0) + "-" + c(Math.min(f.value * a.perPage, a.totalRecords)) + " " + c(v("crud.datatable.of") || "of") + " " + c(a.totalRecords), 1),
          m($, {
            variant: "outline",
            size: "sm",
            disabled: f.value * a.perPage >= a.totalRecords,
            onClick: t[2] || (t[2] = (e) => V(f.value + 1))
          }, {
            default: F(() => [
              m(g(le), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      o("div", fe, [
        o("table", me, [
          o("thead", ve, [
            o("tr", pe, [
              (n(!0), i(b, null, x(a.columns, (e) => (n(), i("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (d) => H(e.field)
              }, [
                o("div", he, [
                  N(c(e.header) + " ", 1),
                  T.value === e.field ? (n(), i("span", be, [
                    C.value === 1 ? (n(), j(g(ne), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (n(), j(g(se), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : U("", !0)
                ])
              ], 8, ge))), 128)),
              o("th", xe, c(v("crud.button.actions")), 1)
            ]),
            Q.value ? (n(), i("tr", ye, [
              (n(!0), i(b, null, x(a.columns, (e) => {
                var d, r, y, A, B, L;
                return n(), i("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((d = p(e.field)) == null ? void 0 : d.type) === "select" ? h((n(), i("select", {
                    key: 0,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (s) => z(e.field)
                  }, [
                    o("option", ke, c(v("crud.datatable.filters.select_placeholder")), 1),
                    (n(!0), i(b, null, x((r = p(e.field)) == null ? void 0 : r.options, (s) => (n(), i("option", {
                      key: s.value,
                      value: s.value
                    }, c(s.label), 9, we))), 128))
                  ], 40, _e)), [
                    [E, u.value[e.field]]
                  ]) : ((y = p(e.field)) == null ? void 0 : y.type) === "multiselect" ? h((n(), i("select", {
                    key: 1,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (s) => z(e.field)
                  }, [
                    (n(!0), i(b, null, x((A = p(e.field)) == null ? void 0 : A.options, (s) => (n(), i("option", {
                      key: s.value,
                      value: s.value
                    }, c(s.label), 9, Ve))), 128))
                  ], 40, Ce)), [
                    [E, u.value[e.field]]
                  ]) : ((B = p(e.field)) == null ? void 0 : B.type) === "date" ? h((n(), i("input", {
                    key: 2,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (s) => R(e.field)
                  }, null, 40, Pe)), [
                    [P, u.value[e.field]]
                  ]) : ((L = p(e.field)) == null ? void 0 : L.type) === "date_range" ? (n(), i("div", Fe, [
                    h(o("input", {
                      "onUpdate:modelValue": (s) => u.value[e.field + "_start"] = s,
                      type: "date",
                      placeholder: v("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (s) => R(e.field)
                    }, null, 40, Ue), [
                      [P, u.value[e.field + "_start"]]
                    ]),
                    h(o("input", {
                      "onUpdate:modelValue": (s) => u.value[e.field + "_end"] = s,
                      type: "date",
                      placeholder: v("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (s) => R(e.field)
                    }, null, 40, $e), [
                      [P, u.value[e.field + "_end"]]
                    ])
                  ])) : U("", !0)
                ]);
              }), 128)),
              t[5] || (t[5] = o("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : U("", !0)
          ]),
          o("tbody", Te, [
            a.loading ? (n(), i("tr", Ie, [
              o("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                m(g(oe), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, Re)
            ])) : a.items.length === 0 ? (n(), i("tr", Ne, [
              o("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                o("p", De, c(v("crud.datatable.no_data")), 1)
              ], 8, Se)
            ])) : U("", !0),
            (n(!0), i(b, null, x(a.items, (e) => (n(), i("tr", {
              key: e.id,
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (n(!0), i(b, null, x(a.columns, (d) => (n(), i("td", {
                key: d.field,
                class: "p-4 align-middle"
              }, c(d.relation ? K(e, d) : e[d.field]), 1))), 128)),
              o("td", Me, [
                Y(l.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      o("div", ze, [
        m($, {
          variant: "outline",
          size: "sm",
          disabled: f.value <= 1,
          onClick: t[3] || (t[3] = (e) => V(f.value - 1))
        }, {
          default: F(() => [...t[6] || (t[6] = [
            N(" Previous ", -1)
          ])]),
          _: 1
        }, 8, ["disabled"]),
        o("span", Ae, " Page " + c(f.value) + " of " + c(Math.max(1, Math.ceil(a.totalRecords / a.perPage))), 1),
        m($, {
          variant: "outline",
          size: "sm",
          disabled: f.value * a.perPage >= a.totalRecords,
          onClick: t[4] || (t[4] = (e) => V(f.value + 1))
        }, {
          default: F(() => [...t[7] || (t[7] = [
            N(" Next ", -1)
          ])]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  Oe as default
};
