import { defineComponent as V, useSlots as B, computed as h, openBlock as o, createElementBlock as r, createElementVNode as l, renderSlot as v, createVNode as x, unref as u, createTextVNode as y, withCtx as E, Fragment as b, renderList as p, toDisplayString as c, createCommentVNode as g, createBlock as D, normalizeClass as L } from "vue";
import { Link as I } from "@inertiajs/vue3";
import { useTable as T } from "./index14.js";
import { createCoreRowModel as U } from "./index15.js";
import { createSortedRowModel as H } from "./index16.js";
import { useCrudFiesta as q } from "./index6.js";
import G from "./index4.js";
import J from "./index17.js";
import Q from "./index18.js";
import W from "./index19.js";
import X from "./index20.js";
import Y from "./index21.js";
import Z from "./index22.js";
import _ from "./index23.js";
import { useDebounceFn as ee } from "./index24.js";
const te = { class: "rounded-md border" }, ne = { class: "flex flex-wrap items-center gap-3 p-4 border-b" }, oe = { class: "relative flex-1 max-w-sm" }, re = ["value"], se = { class: "relative inline-block text-left" }, ie = {
  key: 0,
  class: "flex flex-wrap items-center gap-2 px-4 py-2 border-b bg-muted/30"
}, le = ["onClick"], ae = { class: "overflow-x-auto" }, ue = { class: "w-full caption-bottom text-sm" }, de = { class: "[&_tr]:border-b" }, ce = { class: "border-b transition-colors hover:bg-muted/50" }, ge = ["onClick"], fe = {
  key: 1,
  class: "inline-flex items-center gap-1"
}, me = { class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground" }, be = { key: 0 }, pe = { key: 1 }, ve = ["colspan"], xe = { key: 2 }, ye = { key: 1 }, he = { class: "p-4 align-middle" }, ke = {
  key: 1,
  class: "flex flex-wrap items-center justify-between gap-2 p-4 border-t"
}, Ce = { class: "text-sm text-muted-foreground" }, Pe = { class: "flex items-center gap-1" }, we = ["disabled"], De = {
  key: 1,
  class: "px-1 text-muted-foreground"
}, $e = ["onClick"], Se = {
  key: 2,
  class: "px-1 text-muted-foreground"
}, Fe = ["disabled"], Ae = {
  key: 0,
  class: "flex items-center gap-2"
}, je = ["value"], Ke = ["value"], Qe = /* @__PURE__ */ V({
  __name: "CfDataTable",
  props: {
    columnsDetails: {},
    data: {},
    columnFilters: {},
    sortField: {},
    sortOrder: {},
    filters: {},
    routePrefix: {},
    keyName: {},
    crudButtons: {},
    actionsLabel: {},
    pagination: {},
    perPage: {},
    perPageOptions: {},
    loading: { type: Boolean, default: !1 },
    searchValue: { default: "" }
  },
  emits: ["sort", "filter", "clearFilters", "pageChange", "perPageChange", "export", "search", "edit", "delete"],
  setup(n, { emit: $ }) {
    const a = n, d = $, S = B(), { formatColumnValue: k, getSortIcon: F, getNextSortOrder: Oe, buildRoute: A } = q(), j = ee((s) => {
      d("search", s);
    }, 300);
    function K(s) {
      d("sort", s);
    }
    function C(s) {
      return s in S;
    }
    const O = h(
      () => a.columnsDetails.map((s) => ({
        accessorKey: s.field,
        header: s.header,
        meta: s
      }))
    ), P = T({
      get data() {
        return a.data;
      },
      get columns() {
        return O.value;
      },
      getCoreRowModel: U(),
      getSortedRowModel: H(),
      manualSorting: !0,
      manualPagination: !0,
      get pageCount() {
        return a.pagination.lastPage;
      },
      state: {
        get sorting() {
          return !a.sortField || !a.sortOrder ? [] : [{ id: a.sortField, desc: a.sortOrder === "desc" }];
        },
        get pagination() {
          return { pageIndex: a.pagination.currentPage - 1, pageSize: a.perPage };
        }
      }
    }), z = h(() => {
      const s = a.filters || {};
      return Object.keys(s).filter((t) => {
        const e = s[t];
        return e !== null && e !== "" && !(Array.isArray(e) && e.length === 0);
      }).length;
    }), N = h(() => {
      const s = [], t = a.filters || {};
      for (const [e, i] of Object.entries(t)) {
        if (i === null || i === "" || Array.isArray(i) && i.length === 0) continue;
        const f = a.columnsDetails.find((M) => M.field === e), m = (f == null ? void 0 : f.header) ?? e;
        s.push({ field: e, label: m, value: Array.isArray(i) ? i.join(", ") : String(i) });
      }
      return s;
    }), R = h(() => {
      const { currentPage: s, lastPage: t } = a.pagination, e = [], i = Math.max(1, s - 2), f = Math.min(t, s + 2);
      for (let m = i; m <= f; m++) e.push(m);
      return e;
    }), w = (s) => F(s, a.sortField, a.sortOrder);
    return (s, t) => (o(), r("div", te, [
      l("div", ne, [
        v(s.$slots, "toolbar-prepend"),
        l("div", oe, [
          x(u(J), { class: "absolute left-2.5 top-2.5 size-4 text-muted-foreground" }),
          l("input", {
            type: "text",
            value: n.searchValue,
            placeholder: "Search...",
            class: "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            onInput: t[0] || (t[0] = (e) => u(j)(e.target.value))
          }, null, 40, re)
        ]),
        l("div", se, [
          l("button", {
            type: "button",
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2",
            onClick: t[1] || (t[1] = (e) => d("export", "xlsx"))
          }, [
            x(u(Q), { class: "size-4" }),
            t[10] || (t[10] = y(" Export ", -1))
          ])
        ]),
        t[12] || (t[12] = l("div", { class: "flex-1" }, null, -1)),
        v(s.$slots, "create-button", {}, () => [
          x(u(I), {
            href: u(A)(n.routePrefix + ".create"),
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 gap-2"
          }, {
            default: E(() => [
              x(u(W), { class: "size-4" }),
              t[11] || (t[11] = y(" Create ", -1))
            ]),
            _: 1
          }, 8, ["href"])
        ]),
        v(s.$slots, "toolbar-append")
      ]),
      z.value > 0 ? (o(), r("div", ie, [
        t[13] || (t[13] = l("span", { class: "text-sm text-muted-foreground" }, "Active filters:", -1)),
        (o(!0), r(b, null, p(N.value, (e) => (o(), r("span", {
          key: e.field,
          class: "inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-0.5 text-xs font-semibold"
        }, [
          y(c(e.label) + ": " + c(e.value) + " ", 1),
          l("button", {
            type: "button",
            class: "ml-1 rounded-full hover:bg-muted p-0.5",
            onClick: (i) => d("filter", e.field, null)
          }, " × ", 8, le)
        ]))), 128)),
        l("button", {
          type: "button",
          class: "text-xs text-muted-foreground hover:text-foreground underline",
          onClick: t[2] || (t[2] = (e) => d("clearFilters"))
        }, " Clear all ")
      ])) : g("", !0),
      l("div", ae, [
        l("table", ue, [
          l("thead", de, [
            l("tr", ce, [
              (o(!0), r(b, null, p(u(P).getFlatHeaders(), (e) => (o(), r("th", {
                key: e.id,
                class: "h-10 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer select-none",
                onClick: (i) => K(e.column.columnDef.accessorKey)
              }, [
                C(`header-${e.column.columnDef.accessorKey}`) ? v(s.$slots, `header-${e.column.columnDef.accessorKey}`, {
                  key: 0,
                  column: e.column
                }) : (o(), r("span", fe, [
                  y(c(e.column.columnDef.header) + " ", 1),
                  w(e.column.columnDef.accessorKey) === "ArrowUp" ? (o(), D(u(X), {
                    key: 0,
                    class: "size-3"
                  })) : g("", !0),
                  w(e.column.columnDef.accessorKey) === "ArrowDown" ? (o(), D(u(Y), {
                    key: 1,
                    class: "size-3"
                  })) : g("", !0)
                ]))
              ], 8, ge))), 128)),
              l("th", me, c(n.actionsLabel), 1)
            ])
          ]),
          n.loading ? (o(), r("tbody", be, [
            (o(!0), r(b, null, p(n.perPage, (e) => (o(), r("tr", {
              key: "sk-" + e,
              class: "border-b animate-pulse"
            }, [
              (o(!0), r(b, null, p(n.columnsDetails, (i) => (o(), r("td", {
                key: i.field,
                class: "p-4"
              }, [...t[14] || (t[14] = [
                l("div", { class: "h-4 bg-muted rounded w-3/4" }, null, -1)
              ])]))), 128)),
              t[15] || (t[15] = l("td", { class: "p-4" }, [
                l("div", { class: "h-4 bg-muted rounded w-16" })
              ], -1))
            ]))), 128))
          ])) : n.data.length === 0 ? (o(), r("tbody", pe, [
            l("tr", null, [
              l("td", {
                colspan: n.columnsDetails.length + 1,
                class: "p-8 text-center text-muted-foreground"
              }, [
                v(s.$slots, "empty", {}, () => [
                  t[16] || (t[16] = y(" No records found. ", -1))
                ])
              ], 8, ve)
            ])
          ])) : (o(), r("tbody", xe, [
            (o(!0), r(b, null, p(u(P).getRowModel().rows, (e) => (o(), r("tr", {
              key: e.id,
              class: "border-b transition-colors hover:bg-muted/50"
            }, [
              (o(!0), r(b, null, p(e.getAllCells(), (i) => {
                var f, m;
                return o(), r("td", {
                  key: i.id,
                  class: "p-4 align-middle"
                }, [
                  C(`cell-${i.column.columnDef.accessorKey}`) ? v(s.$slots, `cell-${i.column.columnDef.accessorKey}`, {
                    key: 0,
                    row: e.original,
                    column: i.column,
                    value: u(k)(e.original, i.column.columnDef.accessorKey, (f = i.column.columnDef.meta) == null ? void 0 : f.relation)
                  }) : (o(), r("span", ye, c(u(k)(e.original, i.column.columnDef.accessorKey, (m = i.column.columnDef.meta) == null ? void 0 : m.relation)), 1))
                ]);
              }), 128)),
              l("td", he, [
                v(s.$slots, "actions", {
                  row: e.original
                }, () => [
                  x(G, {
                    buttons: n.crudButtons,
                    row: e.original,
                    "route-prefix": n.routePrefix,
                    "key-name": n.keyName,
                    onEdit: t[3] || (t[3] = (i) => d("edit", i)),
                    onDelete: t[4] || (t[4] = (i) => d("delete", i))
                  }, null, 8, ["buttons", "row", "route-prefix", "key-name"])
                ])
              ])
            ]))), 128))
          ]))
        ])
      ]),
      n.pagination.lastPage > 1 ? (o(), r("div", ke, [
        l("div", Ce, " Showing " + c(n.pagination.from ?? 0) + "–" + c(n.pagination.to ?? 0) + " of " + c(n.pagination.total), 1),
        l("div", Pe, [
          l("button", {
            type: "button",
            disabled: n.pagination.currentPage <= 1,
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8",
            onClick: t[5] || (t[5] = (e) => d("pageChange", n.pagination.currentPage - 1))
          }, [
            x(u(Z), { class: "size-4" })
          ], 8, we),
          n.pagination.currentPage > 3 ? (o(), r("button", {
            key: 0,
            type: "button",
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3",
            onClick: t[6] || (t[6] = (e) => d("pageChange", 1))
          }, " 1 ")) : g("", !0),
          n.pagination.currentPage > 3 ? (o(), r("span", De, "…")) : g("", !0),
          (o(!0), r(b, null, p(R.value, (e) => (o(), r("button", {
            key: e,
            type: "button",
            class: L([
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-8 px-3",
              e === n.pagination.currentPage ? "border border-input bg-primary text-primary-foreground" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            ]),
            onClick: (i) => d("pageChange", e)
          }, c(e), 11, $e))), 128)),
          n.pagination.currentPage < n.pagination.lastPage - 2 ? (o(), r("span", Se, "…")) : g("", !0),
          n.pagination.currentPage < n.pagination.lastPage - 2 ? (o(), r("button", {
            key: 3,
            type: "button",
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3",
            onClick: t[7] || (t[7] = (e) => d("pageChange", n.pagination.lastPage))
          }, c(n.pagination.lastPage), 1)) : g("", !0),
          l("button", {
            type: "button",
            disabled: n.pagination.currentPage >= n.pagination.lastPage,
            class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8",
            onClick: t[8] || (t[8] = (e) => d("pageChange", n.pagination.currentPage + 1))
          }, [
            x(u(_), { class: "size-4" })
          ], 8, Fe)
        ]),
        n.perPageOptions.length > 1 ? (o(), r("div", Ae, [
          t[17] || (t[17] = l("span", { class: "text-sm text-muted-foreground" }, "Per page", -1)),
          l("select", {
            value: n.perPage,
            class: "h-8 rounded-md border border-input bg-background px-2 py-1 text-sm",
            onChange: t[9] || (t[9] = (e) => d("perPageChange", Number(e.target.value)))
          }, [
            (o(!0), r(b, null, p(n.perPageOptions, (e) => (o(), r("option", {
              key: e,
              value: e
            }, c(e), 9, Ke))), 128))
          ], 40, je)
        ])) : g("", !0)
      ])) : g("", !0)
    ]));
  }
});
export {
  Qe as default
};
