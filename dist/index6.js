import { defineComponent as Y, ref as y, computed as Z, onUnmounted as ee, openBlock as l, createElementBlock as o, createElementVNode as s, createVNode as v, unref as _, withDirectives as p, vModelText as U, Fragment as g, renderList as h, toDisplayString as r, vModelSelect as D, createCommentVNode as C, withCtx as T, createTextVNode as M, createBlock as E, renderSlot as te } from "vue";
import { usePage as ne } from "@inertiajs/vue3";
import { Search as le, ChevronLeft as oe, ChevronRight as se, ArrowUp as ae, ArrowDown as ie, Loader2 as re } from "lucide-vue-next";
import F from "./index15.js";
const de = { class: "space-y-4" }, ue = { class: "flex items-center justify-between" }, ce = { class: "relative w-64" }, fe = ["placeholder"], me = { class: "flex items-center gap-2" }, ve = ["value"], pe = { class: "text-xs text-muted-foreground whitespace-nowrap" }, ge = { class: "text-sm text-muted-foreground" }, he = { class: "rounded-md border" }, be = { class: "w-full caption-bottom text-sm" }, xe = { class: "[&_tr]:border-b" }, ye = { class: "border-b transition-colors hover:bg-muted/50" }, _e = ["onClick"], ke = { class: "flex items-center gap-1" }, we = { key: 0 }, Ce = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground w-32" }, Pe = {
  key: 0,
  class: "border-b bg-muted/20"
}, Ve = ["onUpdate:modelValue", "onChange"], Ue = { value: "" }, Te = ["value"], Fe = ["onUpdate:modelValue", "onChange"], $e = ["value"], Ie = ["onUpdate:modelValue", "onInput"], Re = {
  key: 3,
  class: "flex items-center gap-1"
}, Ne = ["onUpdate:modelValue", "placeholder", "onInput"], Oe = ["onUpdate:modelValue", "placeholder", "onInput"], Se = { class: "[&_tr:last-child]:border-0" }, De = {
  key: 0,
  class: "border-b transition-colors"
}, Me = ["colspan"], je = {
  key: 1,
  class: "border-b transition-colors"
}, ze = ["colspan"], Ae = { class: "text-muted-foreground" }, Be = { class: "p-4 align-middle text-center" }, Le = { class: "flex items-center justify-end gap-2" }, Ee = { class: "text-sm text-muted-foreground" }, Je = /* @__PURE__ */ Y({
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
  setup(a, { emit: q }) {
    const b = a, k = q, Q = ne();
    function c(n) {
      var t;
      return ((t = Q.props.crudLang) == null ? void 0 : t[n]) ?? n;
    }
    const f = y(1), $ = y(null), P = y(1), I = y("");
    let R;
    const m = y({}), N = {}, G = Z(() => b.columns.some((n) => n.filter_config != null));
    function x(n) {
      const t = b.columns.find((e) => e.field === n);
      return t == null ? void 0 : t.filter_config;
    }
    function H() {
      const n = {};
      for (const t of b.columns) {
        if (!t.filter_config) continue;
        const e = t.field, u = t.filter_config;
        if (u.type === "date_range") {
          const d = m.value[e + "_start"], w = m.value[e + "_end"];
          (d || w) && (n[e] = { type: "date_range", value: { start: d || "", end: w || "" } });
        } else {
          const d = m.value[e];
          d != null && d !== "" && (!Array.isArray(d) || d.length > 0) && (n[e] = { type: u.type, value: d });
        }
      }
      return n;
    }
    function j() {
      k("filter", { globalFilter: H() });
    }
    function z(n) {
      j();
    }
    function O(n) {
      clearTimeout(N[n]), N[n] = setTimeout(() => j(), 300);
    }
    function V(n) {
      f.value = n, k("paginate", { page: n - 1, rows: b.perPage });
    }
    const S = y(b.perPage);
    function J() {
      f.value = 1, k("perPageChange", S.value);
    }
    function K(n) {
      const t = $.value;
      $.value = n, P.value = t === n && P.value === 1 ? -1 : 1, k("sort", { sortField: n, sortOrder: P.value });
    }
    function W() {
      clearTimeout(R), R = setTimeout(() => k("search", { query: I.value }), 300);
    }
    ee(() => {
      clearTimeout(R), Object.values(N).forEach(clearTimeout);
    });
    function X(n, t) {
      if (!t.relation) return n[t.field];
      const { relation: e, display_field: u } = t.relation, d = n[e];
      return d && typeof d == "object" && u in d ? d[u] : n[t.field];
    }
    return (n, t) => (l(), o("div", de, [
      s("div", ue, [
        s("div", ce, [
          v(_(le), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          p(s("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => I.value = e),
            placeholder: c("crud.datatable.search_placeholder"),
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: W
          }, null, 40, fe), [
            [U, I.value]
          ])
        ]),
        s("div", me, [
          a.perPageOptions.length > 0 ? p((l(), o("select", {
            key: 0,
            "onUpdate:modelValue": t[1] || (t[1] = (e) => S.value = e),
            class: "flex h-9 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onChange: J
          }, [
            (l(!0), o(g, null, h(a.perPageOptions, (e) => (l(), o("option", {
              key: e,
              value: e
            }, r(e), 9, ve))), 128))
          ], 544)), [
            [D, S.value]
          ]) : C("", !0),
          s("span", pe, r(c("crud.datatable.per_page")), 1),
          v(F, {
            variant: "outline",
            size: "sm",
            disabled: f.value <= 1,
            onClick: t[2] || (t[2] = (e) => V(f.value - 1))
          }, {
            default: T(() => [
              v(_(oe), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"]),
          s("span", ge, r(a.totalRecords > 0 ? (f.value - 1) * a.perPage + 1 : 0) + "-" + r(Math.min(f.value * a.perPage, a.totalRecords)) + " " + r(c("crud.datatable.of")) + " " + r(a.totalRecords), 1),
          v(F, {
            variant: "outline",
            size: "sm",
            disabled: f.value * a.perPage >= a.totalRecords,
            onClick: t[3] || (t[3] = (e) => V(f.value + 1))
          }, {
            default: T(() => [
              v(_(se), { class: "h-4 w-4" })
            ]),
            _: 1
          }, 8, ["disabled"])
        ])
      ]),
      s("div", he, [
        s("table", be, [
          s("thead", xe, [
            s("tr", ye, [
              (l(!0), o(g, null, h(a.columns, (e) => (l(), o("th", {
                key: e.field,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (u) => K(e.field)
              }, [
                s("div", ke, [
                  M(r(c(e.header)) + " ", 1),
                  $.value === e.field ? (l(), o("span", we, [
                    P.value === 1 ? (l(), E(_(ae), {
                      key: 0,
                      class: "h-3 w-3"
                    })) : (l(), E(_(ie), {
                      key: 1,
                      class: "h-3 w-3"
                    }))
                  ])) : C("", !0)
                ])
              ], 8, _e))), 128)),
              s("th", Ce, r(c("crud.button.actions")), 1)
            ]),
            G.value ? (l(), o("tr", Pe, [
              (l(!0), o(g, null, h(a.columns, (e) => {
                var u, d, w, A, B, L;
                return l(), o("th", {
                  key: "filter-" + e.field,
                  class: "px-4 py-1.5 align-middle"
                }, [
                  ((u = x(e.field)) == null ? void 0 : u.type) === "select" ? p((l(), o("select", {
                    key: 0,
                    "onUpdate:modelValue": (i) => m.value[e.field] = i,
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (i) => z(e.field)
                  }, [
                    s("option", Ue, r(c("crud.datatable.filters.select_placeholder")), 1),
                    (l(!0), o(g, null, h((d = x(e.field)) == null ? void 0 : d.options, (i) => (l(), o("option", {
                      key: i.value,
                      value: i.value
                    }, r(i.label), 9, Te))), 128))
                  ], 40, Ve)), [
                    [D, m.value[e.field]]
                  ]) : ((w = x(e.field)) == null ? void 0 : w.type) === "multiselect" ? p((l(), o("select", {
                    key: 1,
                    "onUpdate:modelValue": (i) => m.value[e.field] = i,
                    multiple: "",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onChange: (i) => z(e.field)
                  }, [
                    (l(!0), o(g, null, h((A = x(e.field)) == null ? void 0 : A.options, (i) => (l(), o("option", {
                      key: i.value,
                      value: i.value
                    }, r(i.label), 9, $e))), 128))
                  ], 40, Fe)), [
                    [D, m.value[e.field]]
                  ]) : ((B = x(e.field)) == null ? void 0 : B.type) === "date" ? p((l(), o("input", {
                    key: 2,
                    "onUpdate:modelValue": (i) => m.value[e.field] = i,
                    type: "date",
                    class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    onInput: (i) => O(e.field)
                  }, null, 40, Ie)), [
                    [U, m.value[e.field]]
                  ]) : ((L = x(e.field)) == null ? void 0 : L.type) === "date_range" ? (l(), o("div", Re, [
                    p(s("input", {
                      "onUpdate:modelValue": (i) => m.value[e.field + "_start"] = i,
                      type: "date",
                      placeholder: c("crud.datatable.filters.date_from"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (i) => O(e.field)
                    }, null, 40, Ne), [
                      [U, m.value[e.field + "_start"]]
                    ]),
                    p(s("input", {
                      "onUpdate:modelValue": (i) => m.value[e.field + "_end"] = i,
                      type: "date",
                      placeholder: c("crud.datatable.filters.date_to"),
                      class: "flex h-7 w-full rounded border border-input bg-transparent px-2 py-0 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      onInput: (i) => O(e.field)
                    }, null, 40, Oe), [
                      [U, m.value[e.field + "_end"]]
                    ])
                  ])) : C("", !0)
                ]);
              }), 128)),
              t[6] || (t[6] = s("th", { class: "px-4 py-1.5 align-middle w-32" }, null, -1))
            ])) : C("", !0)
          ]),
          s("tbody", Se, [
            a.loading ? (l(), o("tr", De, [
              s("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                v(_(re), { class: "inline-block h-5 w-5 animate-spin text-muted-foreground" })
              ], 8, Me)
            ])) : a.items.length === 0 ? (l(), o("tr", je, [
              s("td", {
                colspan: a.columns.length + 1,
                class: "p-4 align-middle text-center"
              }, [
                s("p", Ae, r(c("crud.datatable.no_data")), 1)
              ], 8, ze)
            ])) : C("", !0),
            (l(!0), o(g, null, h(a.items, (e) => (l(), o("tr", {
              key: e[b.keyName],
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (l(!0), o(g, null, h(a.columns, (u) => (l(), o("td", {
                key: u.field,
                class: "p-4 align-middle"
              }, r(u.relation ? X(e, u) : e[u.field]), 1))), 128)),
              s("td", Be, [
                te(n.$slots, "actions", { row: e })
              ])
            ]))), 128))
          ])
        ])
      ]),
      s("div", Le, [
        v(F, {
          variant: "outline",
          size: "sm",
          disabled: f.value <= 1,
          onClick: t[4] || (t[4] = (e) => V(f.value - 1))
        }, {
          default: T(() => [
            M(r(c("crud.datatable.previous")), 1)
          ]),
          _: 1
        }, 8, ["disabled"]),
        s("span", Ee, r(c("crud.datatable.page")) + " " + r(f.value) + " " + r(c("crud.datatable.of")) + " " + r(Math.max(1, Math.ceil(a.totalRecords / a.perPage))), 1),
        v(F, {
          variant: "outline",
          size: "sm",
          disabled: f.value * a.perPage >= a.totalRecords,
          onClick: t[5] || (t[5] = (e) => V(f.value + 1))
        }, {
          default: T(() => [
            M(r(c("crud.datatable.next")), 1)
          ]),
          _: 1
        }, 8, ["disabled"])
      ])
    ]));
  }
});
export {
  Je as default
};
