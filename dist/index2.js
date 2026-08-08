import { defineComponent as le, computed as k, ref as i, watch as ie, openBlock as h, createElementBlock as x, createElementVNode as r, renderSlot as p, createTextVNode as O, toDisplayString as y, createCommentVNode as $, normalizeStyle as ue, createVNode as ce, createSlots as de, withCtx as g, renderList as R, normalizeProps as U, guardReactiveProps as L } from "vue";
import { usePage as I, router as B } from "@inertiajs/vue3";
import { toast as f } from "./index28.js";
import fe from "./index3.js";
import { useIntervalFn as me } from "./index22.js";
const pe = { class: "flex items-center justify-between mb-6" }, ve = { class: "text-2xl font-semibold tracking-tight" }, ge = {
  key: 0,
  class: "mb-4 p-3 rounded-md border bg-muted/30"
}, be = { class: "flex items-center justify-between" }, he = { class: "text-sm font-medium" }, xe = {
  key: 0,
  class: "mt-2 h-2 rounded-full bg-muted overflow-hidden"
}, ye = { class: "inline-flex items-center gap-1" }, we = {
  key: 1,
  class: "fixed inset-0 z-50"
}, _e = { class: "fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-lg border-l overflow-y-auto" }, ke = { class: "p-6" }, $e = { class: "flex items-center justify-between mb-6" }, Ce = { class: "text-lg font-semibold" }, Se = {
  key: 2,
  class: "fixed inset-0 z-50 flex items-center justify-center"
}, Pe = { class: "relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg" }, Fe = { class: "flex justify-end gap-2" }, Oe = /* @__PURE__ */ le({
  __name: "CfIndex",
  props: {
    column_data: {},
    columns_details: {},
    column_filters: {},
    route_prefix: {},
    key_name: {},
    model_lang: {},
    crud_buttons: {},
    optional_buttons: {},
    actions_label: {},
    lang: {},
    pagination_per_page: {},
    pagination_per_page_options: {},
    flash: {}
  },
  setup(u) {
    const a = u;
    function E(e) {
      return new URLSearchParams(window.location.search).get(e);
    }
    function K() {
      const e = new URLSearchParams(window.location.search), t = {};
      for (const [n, o] of e.entries())
        if (n.startsWith("filters[")) {
          const s = n.match(/^filters\[([^\]]+)\]$/);
          if (s) {
            const c = s[1];
            t[c] !== void 0 ? Array.isArray(t[c]) ? t[c].push(o) : t[c] = [t[c], o] : t[c] = o;
          }
        }
      return t;
    }
    k(() => a.column_data.current_page);
    const Q = k(() => a.column_data.per_page), D = k(() => E("sort_field")), C = k(() => {
      const e = E("sort_order");
      return e === "1" ? "asc" : e === "-1" ? "desc" : null;
    }), d = i(K()), T = i(E("search") || ""), S = i(!1), W = k(() => ({
      currentPage: a.column_data.current_page,
      lastPage: a.column_data.last_page,
      perPage: a.column_data.per_page,
      total: a.column_data.total,
      from: a.column_data.from,
      to: a.column_data.to
    })), l = i("idle"), m = i({ processed: 0, total: 0 }), P = i(null), q = i(null), { pause: F, resume: J } = me(oe, 2e3, { immediate: !1 });
    let v = null;
    function z() {
      const e = I().props.flash;
      e != null && e.success && f.success(e.success), e != null && e.error && f.error(e.error);
    }
    z(), ie(() => I().props.flash, () => {
      z();
    });
    function M(e) {
      const t = new URLSearchParams(window.location.search);
      for (const [o, s] of Object.entries(e))
        s == null || s === "" ? t.delete(o) : t.set(o, String(s));
      const n = t.toString();
      return n ? `?${n}` : window.location.pathname;
    }
    function b(e) {
      S.value = !0;
      const t = new URL(window.location.href), n = M(e);
      t.search = n, B.get(t.href, {}, {
        preserveState: !0,
        preserveScroll: !0,
        onFinish: () => {
          S.value = !1;
        },
        onError: () => {
          S.value = !1;
        }
      });
    }
    function X(e) {
      const t = D.value, n = C.value;
      let o;
      t !== e || !n ? o = "asc" : n === "asc" ? o = "desc" : o = null, b({
        sort_field: o ? e : null,
        sort_order: o === "asc" ? "1" : o === "desc" ? "-1" : null,
        page: "1"
      });
    }
    function G(e, t) {
      d.value = { ...d.value }, t == null || t === "" || Array.isArray(t) && t.length === 0 ? delete d.value[e] : d.value[e] = t;
      const n = { page: "1" };
      for (const o of Object.keys(d.value)) {
        const s = d.value[o];
        s != null && (n[`filters[${o}]`] = String(s));
      }
      b(n);
    }
    function H() {
      d.value = {};
      const e = new URLSearchParams(window.location.search), t = [];
      for (const o of e.keys())
        o.startsWith("filters[") && t.push(o);
      const n = { page: "1" };
      for (const o of t) n[o] = null;
      b(n);
    }
    function Y(e) {
      b({ page: e });
    }
    function Z(e) {
      b({ per_page: e, page: "1" });
    }
    function ee(e) {
      T.value = e, b({ search: e || null, page: "1" });
    }
    async function te(e) {
      var t;
      try {
        const n = `${a.route_prefix}.exportStart`, s = await (await fetch(route(n), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ((t = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : t.content) || ""
          },
          body: JSON.stringify({
            format: e,
            search: T.value,
            sort_field: D.value,
            sort_order: C.value === "asc" ? 1 : C.value === "desc" ? -1 : null,
            filters: d.value
          })
        })).json();
        P.value = s.export_id, q.value = e, l.value = "queued", m.value = { processed: 0, total: 0 }, J(), v = setTimeout(() => {
          l.value = "timeout", F(), f.error("Export timed out after 5 minutes");
        }, 300 * 1e3);
      } catch {
        f.error("Failed to start export");
      }
    }
    async function oe() {
      if (P.value)
        try {
          const e = `${a.route_prefix}.exportStatus`, n = await (await fetch(route(e, { id: P.value }))).json();
          if (n.status === "not_found") {
            l.value = "failed", F(), f.error("Export not found"), v && clearTimeout(v);
            return;
          }
          if (l.value = n.status, n.processed !== void 0 && (m.value.processed = n.processed), n.total !== void 0 && (m.value.total = n.total), n.status === "completed") {
            F(), v && clearTimeout(v);
            const o = route(`${a.route_prefix}.exportDownload`, { id: P.value });
            window.open(o, "_blank"), f.success("Export completed");
          } else n.status === "failed" && (F(), v && clearTimeout(v), f.error(n.error || "Export failed"));
        } catch {
        }
    }
    const w = i(!1), N = i("create"), A = i({}), V = i(void 0);
    i(!1);
    async function ne() {
      try {
        N.value = "create", V.value = void 0;
        const e = `${a.route_prefix}.create`, n = await (await fetch(route(e))).json();
        A.value = n, w.value = !0;
      } catch {
        f.error("Failed to load create form");
      }
    }
    async function re(e) {
      try {
        N.value = "edit";
        const t = `${a.route_prefix}.edit`, o = await (await fetch(route(t, { id: e }))).json();
        A.value = o.form_details, V.value = o.item, w.value = !0;
      } catch {
        f.error("Failed to load edit form");
      }
    }
    const _ = i(!1), j = i(null);
    function se(e) {
      j.value = e, _.value = !0;
    }
    function ae() {
      if (!j.value) return;
      const e = j.value[a.key_name];
      B.delete(route(`${a.route_prefix}.destroy`, { id: e }), {
        onFinish: () => {
          _.value = !1, j.value = null;
        }
      });
    }
    return (e, t) => {
      var n;
      return h(), x("div", null, [
        r("div", pe, [
          r("h1", ve, [
            p(e.$slots, "title", {}, () => [
              O(y(u.model_lang), 1)
            ])
          ])
        ]),
        l.value !== "idle" ? (h(), x("div", ge, [
          r("div", be, [
            r("span", he, " Export " + y((n = q.value) == null ? void 0 : n.toUpperCase()) + ": " + y(l.value === "queued" ? "Queued..." : l.value === "processing" ? `Processing (${m.value.processed}/${m.value.total})` : l.value === "completed" ? "Complete" : l.value === "failed" ? "Failed" : "Timed out"), 1),
            l.value === "completed" || l.value === "failed" || l.value === "timeout" ? (h(), x("button", {
              key: 0,
              type: "button",
              class: "text-sm underline",
              onClick: t[0] || (t[0] = (o) => l.value = "idle")
            }, " Dismiss ")) : $("", !0)
          ]),
          l.value === "processing" && m.value.total > 0 ? (h(), x("div", xe, [
            r("div", {
              class: "h-full bg-primary transition-all duration-500",
              style: ue({ width: `${m.value.processed / m.value.total * 100}%` })
            }, null, 4)
          ])) : $("", !0)
        ])) : $("", !0),
        ce(fe, {
          "columns-details": u.columns_details,
          data: u.column_data.data,
          "column-filters": u.column_filters,
          "sort-field": D.value,
          "sort-order": C.value,
          filters: d.value,
          "route-prefix": u.route_prefix,
          "key-name": u.key_name,
          "crud-buttons": u.crud_buttons,
          "actions-label": u.actions_label,
          pagination: W.value,
          "per-page": Q.value,
          "per-page-options": u.pagination_per_page_options,
          loading: S.value,
          "search-value": T.value,
          onSort: X,
          onFilter: G,
          onClearFilters: H,
          onPageChange: Y,
          onPerPageChange: Z,
          onExport: te,
          onSearch: ee,
          onEdit: re,
          onDelete: se
        }, de({
          "toolbar-prepend": g(() => [
            p(e.$slots, "toolbar-prepend")
          ]),
          "toolbar-append": g(() => [
            p(e.$slots, "toolbar-append")
          ]),
          "create-button": g(() => [
            r("button", {
              type: "button",
              class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 gap-2",
              onClick: ne
            }, [
              p(e.$slots, "create-button-content", {}, () => [
                t[5] || (t[5] = O(" Create ", -1))
              ])
            ])
          ]),
          empty: g(() => [
            p(e.$slots, "empty", {}, () => [
              t[6] || (t[6] = O(" No records found. ", -1))
            ])
          ]),
          _: 2
        }, [
          R(u.columns_details, (o, s) => ({
            name: `cell-${o.field}`,
            fn: g((c) => [
              p(e.$slots, `cell-${o.field}`, U(L(c)), () => [
                r("span", null, y(c.value), 1)
              ])
            ])
          })),
          R(u.columns_details, (o, s) => ({
            name: `header-${o.field}`,
            fn: g((c) => [
              p(e.$slots, `header-${o.field}`, U(L(c)), () => [
                r("span", ye, y(o.header), 1)
              ])
            ])
          })),
          R(u.columns_details, (o, s) => ({
            name: `filter-${o.field}`,
            fn: g((c) => [
              p(e.$slots, `filter-${o.field}`, U(L(c)))
            ])
          }))
        ]), 1032, ["columns-details", "data", "column-filters", "sort-field", "sort-order", "filters", "route-prefix", "key-name", "crud-buttons", "actions-label", "pagination", "per-page", "per-page-options", "loading", "search-value"]),
        w.value ? (h(), x("div", we, [
          r("div", {
            class: "fixed inset-0 bg-background/80 backdrop-blur-sm",
            onClick: t[1] || (t[1] = (o) => w.value = !1)
          }),
          r("div", _e, [
            r("div", ke, [
              r("div", $e, [
                r("h2", Ce, y(N.value === "create" ? "Create" : "Edit"), 1),
                r("button", {
                  type: "button",
                  class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9",
                  onClick: t[2] || (t[2] = (o) => w.value = !1)
                }, " × ")
              ]),
              t[7] || (t[7] = r("div", { class: "text-muted-foreground text-sm" }, " Form placeholder — CfForm component integration in Phase 7. ", -1))
            ])
          ])
        ])) : $("", !0),
        _.value ? (h(), x("div", Se, [
          r("div", {
            class: "fixed inset-0 bg-background/80 backdrop-blur-sm",
            onClick: t[3] || (t[3] = (o) => _.value = !1)
          }),
          r("div", Pe, [
            t[8] || (t[8] = r("h3", { class: "text-lg font-semibold mb-2" }, "Confirm Delete", -1)),
            t[9] || (t[9] = r("p", { class: "text-sm text-muted-foreground mb-6" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1)),
            r("div", Fe, [
              r("button", {
                type: "button",
                class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2",
                onClick: t[4] || (t[4] = (o) => _.value = !1)
              }, " Cancel "),
              r("button", {
                type: "button",
                class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 py-2",
                onClick: ae
              }, " Delete ")
            ])
          ])
        ])) : $("", !0)
      ]);
    };
  }
});
export {
  Oe as default
};
