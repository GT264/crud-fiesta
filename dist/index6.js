import { defineComponent as Y, ref as x, computed as Z, onUnmounted as ee, openBlock as l, createElementBlock as o, createElementVNode as a, createVNode as C, unref as P, withDirectives as g, vModelText as V, Fragment as v, renderList as h, createTextVNode as O, toDisplayString as c, createBlock as E, createCommentVNode as k, vModelSelect as S, renderSlot as te, withCtx as L } from "vue";
import { usePage as ne } from "@inertiajs/vue3";
import { Search as le, ArrowUp as oe, ArrowDown as se, Loader2 as ae } from "lucide-vue-next";
import z from "./index15.js";
const ie = { class: "space-y-4" }, re = { class: "flex items-center justify-between" }, de = { class: "relative w-64" }, ue = ["placeholder"], ce = { class: "rounded-md border" }, fe = { class: "w-full caption-bottom text-sm" }, pe = { class: "[&_tr]:border-b" }, me = { class: "border-b transition-colors hover:bg-muted/50" }, ge = ["onClick"], ve = { class: "flex items-center gap-1" }, he = { key: 0 }, be = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, _e = {
  key: 0,
  class: "border-b bg-muted/20"
}, xe = ["onUpdate:modelValue", "onChange"], ye = { value: "" }, ke = ["value"], we = ["onUpdate:modelValue", "onChange"], Ce = ["value"], Pe = ["onUpdate:modelValue", "onInput"], Ve = {
  key: 3,
  class: "flex items-center gap-1"
}, Ue = ["onUpdate:modelValue", "placeholder", "onInput"], Te = ["onUpdate:modelValue", "placeholder", "onInput"], Fe = { class: "[&_tr:last-child]:border-0" }, $e = {
  key: 0,
  class: "border-b transition-colors"
}, Ie = ["colspan"], Ne = {
  key: 1,
  class: "border-b transition-colors"
}, Oe = ["colspan"], Se = { class: "text-muted-foreground" }, je = { class: "p-4 align-middle text-center" }, De = { class: "flex items-center justify-end gap-2" }, Ae = { class: "flex items-center gap-2" }, Be = ["value"], Me = { class: "text-xs text-muted-foreground whitespace-nowrap" }, Re = { class: "text-sm text-muted-foreground" }, Qe = /* @__PURE__ */ Y({
  __name: "CrudDataTable",
  props: {
    items: {},
    columns: {},
    totalRecords: {},
    perPage: { default: 25 },
    perPageOptions: { default: () => [10, 25, 50, 100] },
    loading: { type: Boolean, default: !1 },
    keyName: { default: "id" }
  },
  emits: ["paginate", "sort", "filter", "search", "perPageChange"],
  setup(d, { emit: q }) {
    const b = d, y = q, Q = ne();
    function f(n, t) {
      var r;
      let e = ((r = Q.props.crudLang) == null ? void 0 : r[n]) ?? n;
      if (t)
        for (const [i, m] of Object.entries(t))
          e = e.replace(`:${i}`, String(m));
      return e;
    }
    const p = x(1), U = x(null), w = x(1), T = x("");
    let F;
    const u = x({}), $ = {}, G = Z(() => b.columns.some((n) => n.filter_config != null));
    function _(n) {
      const t = b.columns.find((e) => e.field === n);
      return t == null ? void 0 : t.filter_config;
    }
    function H() {
      const n = {};
      for (const t of b.columns) {
        if (!t.filter_config) continue;
        const e = t.field, r = t.filter_config;
        if (r.type === "date_range") {
          const i = u.value[e + "_start"], m = u.value[e + "_end"];
          (i || m) && (n[e] = { type: "date_range", value: { start: i || "", end: m || "" } });
        } else {
          const i = u.value[e];
          i != null && i !== "" && (!Array.isArray(i) || i.length > 0) && (n[e] = { type: r.type, value: i });
        }
      }
      return n;
    }
    function j() {
      y("filter", { globalFilter: H() });
    }
    function D(n) {
      j();
    }
    function I(n) {
      clearTimeout($[n]), $[n] = setTimeout(() => j(), 300);
    }
    function A(n) {
      p.value = n, y("paginate", { page: n - 1, rows: b.perPage });
    }
    const N = x(b.perPage);
    function J() {
      p.value = 1, y("perPageChange", N.value);
    }
    function K(n) {
      const t = U.value;
      U.value = n, w.value = t === n && w.value === 1 ? -1 : 1, y("sort", { sortField: n, sortOrder: w.value });
    }
    function W() {
      clearTimeout(F), F = setTimeout(() => y("search", { query: T.value }), 300);
    }
    ee(() => {
      clearTimeout(F), Object.values($).forEach(clearTimeout);
    });
    function X(n, t) {
      if (!t.relation) return n[t.field];
      const { relation: e, display_field: r } = t.relation, i = n[e];
      return i && typeof i == "object" && r in i ? i[r] : n[t.field];
    }
    return (n, t) => (l(), o("div", ie, [
      a("div", re, [
        a("div", de, [
          C(P(le), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          g(a("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => T.value = e),
            placeholder: f("crud.datatable.search_placeholder"),
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: W
          }, null, 40, ue), [
            [V, T.value]
          ])
        ])
      ]),
      a("div", ce, [
        a("table", fe, [
          a("thead", pe, [
            a("tr", me, [
              (l(!0), o(v, null, h(d.columns, (e) => (l(), o("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (r) => K(e.field)
              }, [
                a("div", ve, [
                  O(c(f(e.header)) + " ", 1),
                  U.value === e.field ? (l(), o("span", he, [
                    w.value === 1 ? (l(), E(P(oe), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (l(), E(P(se), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : k("", !0)
                ])
              ], 8, ge))), 128)),
              a("th", be, c(f("crud.button.actions")), 1)
            ]),
            G.value ? (l(), o("tr", _e, [
              (l(!0), o(v, null, h(d.columns, (e) => {
                var r, i, m, B, M, R;
                return l(), o("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((r = _(e.field)) == null ? void 0 : r.type) === "select" ? g((l(), o("select", {
                    key: 0,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (s) => D(e.field)
                  }, [
                    a("option", ye, c(f("crud.datatable.filters.select_placeholder")), 1),
                    (l(!0), o(v, null, h((i = _(e.field)) == null ? void 0 : i.options, (s) => (l(), o("option", {
                      key: s.value,
                      value: s.value
                    }, c(s.label), 9, ke))), 128))
                  ], 40, xe)), [
                    [S, u.value[e.field]]
                  ]) : ((m = _(e.field)) == null ? void 0 : m.type) === "multiselect" ? g((l(), o("select", {
                    key: 1,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (s) => D(e.field)
                  }, [
                    (l(!0), o(v, null, h((B = _(e.field)) == null ? void 0 : B.options, (s) => (l(), o("option", {
                      key: s.value,
                      value: s.value
                    }, c(s.label), 9, Ce))), 128))
                  ], 40, we)), [
                    [S, u.value[e.field]]
                  ]) : ((M = _(e.field)) == null ? void 0 : M.type) === "date" ? g((l(), o("input", {
                    key: 2,
                    "onUpdate:modelValue": (s) => u.value[e.field] = s,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (s) => I(e.field)
                  }, null, 40, Pe)), [
                    [V, u.value[e.field]]
                  ]) : ((R = _(e.field)) == null ? void 0 : R.type) === "date_range" ? (l(), o("div", Ve, [
                    g(a("input", {
                      "onUpdate:modelValue": (s) => u.value[e.field + "_start"] = s,
                      type: "date",
                      placeholder: f("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (s) => I(e.field)
                    }, null, 40, Ue), [
                      [V, u.value[e.field + "_start"]]
                    ]),
                    g(a("input", {
                      "onUpdate:modelValue": (s) => u.value[e.field + "_end"] = s,
                      type: "date",
                      placeholder: f("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (s) => I(e.field)
                    }, null, 40, Te), [
                      [V, u.value[e.field + "_end"]]
                    ])
                  ])) : k("", !0)
                ]);
              }), 128)),
              t[4] || (t[4] = a("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : k("", !0)
          ]),
          a("tbody", Fe, [
            d.loading ? (l(), o("tr", $e, [
              a("td", {
                colspan: d.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                C(P(ae), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, Ie)
            ])) : d.items.length === 0 ? (l(), o("tr", Ne, [
              a("td", {
                colspan: d.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                a("p", Se, c(f("crud.datatable.no_data")), 1)
              ], 8, Oe)
            ])) : k("", !0),
            (l(!0), o(v, null, h(d.items, (e) => (l(), o("tr", {
              key: e[b.keyName],
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (l(!0), o(v, null, h(d.columns, (r) => (l(), o("td", {
                key: r.field,
                class: "p-4 align-middle"
              }, c(r.relation ? X(e, r) : e[r.field]), 1))), 128)),
              a("td", je, [
                te(n.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      a("div", De, [
        a("div", Ae, [
          d.perPageOptions.length > 0 ? g((l(), o("select", {
            key: 0,
            "onUpdate:modelValue": t[1] || (t[1] = (e) => N.value = e),
            class: "flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onChange: J
          }, [
            (l(!0), o(v, null, h(d.perPageOptions, (e) => (l(), o("option", {
              key: e,
              value: e
            }, c(e), 9, Be))), 128))
          ], 544)), [
            [S, N.value]
          ]) : k("", !0),
          a("span", Me, c(f("crud.datatable.per_page")), 1)
        ]),
        C(z, {
          variant: "outline",
          size: "sm",
          disabled: p.value <= 1,
          onClick: t[2] || (t[2] = (e) => A(p.value - 1))
        }, {
          default: L(() => [
            O(c(f("crud.datatable.previous")), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        a("span", Re, c(f("crud.datatable.current_of_total", { current: p.value, total: Math.max(1, Math.ceil(d.totalRecords / d.perPage)) })), 1),
        C(z, {
          variant: "outline",
          size: "sm",
          disabled: p.value * d.perPage >= d.totalRecords,
          onClick: t[3] || (t[3] = (e) => A(p.value + 1))
        }, {
          default: L(() => [
            O(c(f("crud.datatable.next")), 1)
          ]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  Qe as default
};
