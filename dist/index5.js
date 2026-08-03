import { defineComponent as ne, computed as C, ref as l, onUnmounted as le, openBlock as se, createElementBlock as ie, createVNode as m, unref as P, createElementVNode as R, toDisplayString as T, withCtx as U, createTextVNode as ue } from "vue";
import { usePage as ce, router as d } from "@inertiajs/vue3";
import { route as A } from "ziggy-js";
import { Plus as de } from "lucide-vue-next";
import pe from "./index15.js";
import fe from "./index18.js";
import me from "./index6.js";
import ve from "./index8.js";
import ge from "./index7.js";
const _e = { class: "crud-index-page" }, ye = { class: "flex items-center justify-between mb-4" }, he = { class: "text-2xl font-bold" }, Ce = /* @__PURE__ */ ne({
  __name: "Index",
  props: {
    column_data: {},
    columns_details: {},
    route_prefix: {},
    key_name: {},
    model_lang: {},
    crud_buttons: {},
    pagination_per_page: {},
    pagination_per_page_options: {}
  },
  setup(u) {
    const S = ce();
    function v(e) {
      var t;
      return ((t = S.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = u, I = C(() => {
      const e = v(a.model_lang + ".plural");
      if (e !== a.model_lang + ".plural") return e;
      const t = (a.model_lang || "").split(".");
      return t[t.length - 1] || "Items";
    }), q = C(() => v("crud.title.index").replace(":model_name", I.value)), L = fe, c = l(null), s = l(!1), _ = /* @__PURE__ */ new Set();
    d.on("finish", () => {
      var t, r;
      const e = S.props.flash;
      e != null && e.success && !_.has("success:" + e.success) && (_.add("success:" + e.success), (t = c.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !_.has("error:" + e.error) && (_.add("error:" + e.error), (r = c.value) == null || r.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const f = l(!1), E = l(""), F = l({}), y = l(null), h = l(!1), p = l(!1), x = l(null), D = { show: "view", edit: "edit", destroy: "delete" };
    function N(e) {
      return e.event || D[e.action] || e.action;
    }
    const V = C(() => a.crud_buttons.map((e) => ({ action: N(e), icon: e.icon, label: e.label })));
    function B(e) {
      return A(e);
    }
    function K(e, t) {
      return A(e, { id: t });
    }
    async function J() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      p.value = !0;
      try {
        const t = e ? B(e.route_name) : `/${a.route_prefix}/create`, r = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        F.value = r, E.value = v("crud.button.create"), y.value = null, h.value = !1, x.value = null, f.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        p.value = !1;
      }
    }
    async function M(e) {
      const t = a.crud_buttons.find((r) => r.action === "edit");
      p.value = !0;
      try {
        const r = t ? K(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, n = await (await fetch(r, { headers: { Accept: "application/json" } })).json();
        F.value = n.form_details, E.value = v("crud.button.edit"), y.value = n.item, h.value = !0, x.value = e, f.value = !0;
      } catch (r) {
        console.error("Failed to load edit form:", r);
      } finally {
        p.value = !1;
      }
    }
    function W(e) {
      p.value = !0;
      const t = () => {
        p.value = !1, f.value = !1;
      };
      h.value ? d.put(`/${a.route_prefix}/${x.value}`, e, { onFinish: t }) : d.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function X() {
      f.value = !1, y.value = null, x.value = null;
    }
    function Y(e) {
    }
    function z(e) {
      d.delete(`/${a.route_prefix}/${e}`);
    }
    function G(e) {
      d.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => s.value = !0, onFinish: () => s.value = !1 });
    }
    function H(e) {
      d.get(window.location.pathname, { per_page: e, page: 1 }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => s.value = !0, onFinish: () => s.value = !1 });
    }
    function Q(e) {
      $.value = e.sortField, O.value = e.sortOrder, d.get(window.location.pathname, { page: a.column_data.current_page, per_page: a.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => s.value = !0, onFinish: () => s.value = !1 });
    }
    function Z(e) {
      k.value = e.query, d.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => s.value = !0, onFinish: () => s.value = !1 });
    }
    function ee(e) {
      j.value = e.globalFilter, d.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => s.value = !0, onFinish: () => s.value = !1 });
    }
    const $ = l(null), O = l(1), k = l(""), j = l({});
    let w = null;
    async function te(e) {
      var t, r, n;
      try {
        const o = { format: e };
        k.value && (o.search = k.value), $.value && (o.sort_field = $.value, o.sort_order = O.value), Object.keys(j.value).length > 0 && (o.filters = j.value);
        const i = await fetch(`/${a.route_prefix}/export/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": S.props.csrf_token ?? ""
          },
          body: JSON.stringify(o)
        });
        if (!i.ok) {
          const ae = await i.json().catch(() => ({ message: "Export request failed" }));
          (t = c.value) == null || t.add({ severity: "error", summary: "Export Error", detail: ae.message || "Export request failed", life: 5e3 });
          return;
        }
        const { export_id: g } = await i.json();
        console.log("[crud-fiesta] Export started:", g), (r = c.value) == null || r.add({ severity: "info", summary: "Export", detail: "Export started — preparing your file...", life: 12e4 }), oe(g);
      } catch (o) {
        (n = c.value) == null || n.add({ severity: "error", summary: "Export Error", detail: "Export failed: " + (o.message || "Unknown error"), life: 5e3 });
      }
    }
    function oe(e) {
      b(), w = setInterval(async () => {
        var t, r;
        try {
          const n = await fetch(`/${a.route_prefix}/export/status/${e}`, {
            headers: { Accept: "application/json" }
          });
          if (!n.ok) {
            console.warn("[crud-fiesta] Export status returned non-OK:", n.status);
            return;
          }
          const o = await n.json();
          if (console.log("[crud-fiesta] Export status:", o.status, "processed:", o.processed, "/", o.total), o.status === "queued" || o.status === "processing") {
            const i = o.status === "queued" ? "Export started — preparing your file..." : `Exporting ${o.processed ?? 0} of ${o.total ?? 0} records...`;
            (t = c.value) == null || t.add({ severity: "info", summary: "Export", detail: i, life: 12e4 });
          } else o.status === "completed" ? (b(), re(e)) : o.status === "failed" && (b(), (r = c.value) == null || r.add({ severity: "error", summary: "Export Failed", detail: "Export failed: " + (o.error || "Unknown error"), life: 1e4 }));
        } catch (n) {
          console.warn("[crud-fiesta] Export polling error:", n);
        }
      }, 2e3);
    }
    async function re(e) {
      var g;
      (g = c.value) == null || g.add({ severity: "info", summary: "Downloading...", detail: "Your export file is being prepared", life: 5e3 });
      const t = `/${a.route_prefix}/export/download/${e}`, n = await (await fetch(t)).blob(), o = URL.createObjectURL(n), i = document.createElement("a");
      i.href = o, i.download = "", document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(o);
    }
    function b() {
      w && (clearInterval(w), w = null);
    }
    return le(() => {
      b();
    }), (e, t) => (se(), ie("div", _e, [
      m(P(L), {
        ref_key: "toastRef",
        ref: c
      }, null, 512),
      R("div", ye, [
        R("h1", he, T(q.value), 1),
        m(pe, {
          variant: "default",
          onClick: J
        }, {
          default: U(() => [
            m(P(de), { class: "h-4 w-4 mr-1" }),
            ue(" " + T(v("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      m(me, {
        items: u.column_data.data,
        columns: u.columns_details,
        "total-records": u.column_data.total,
        "per-page": u.column_data.per_page,
        "per-page-options": u.pagination_per_page_options,
        loading: s.value,
        "key-name": u.key_name,
        "route-prefix": u.route_prefix,
        onPaginate: G,
        onSort: Q,
        onSearch: Z,
        onFilter: ee,
        onPerPageChange: H,
        onExport: te
      }, {
        actions: U(({ row: r }) => [
          m(ve, {
            row: r,
            buttons: V.value,
            "key-name": u.key_name,
            onView: Y,
            onEdit: M,
            onDelete: z
          }, null, 8, ["row", "buttons", "key-name"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "per-page-options", "loading", "key-name", "route-prefix"]),
      m(ge, {
        visible: f.value,
        title: E.value,
        fields: F.value,
        data: y.value,
        loading: p.value,
        "is-edit": h.value,
        "onUpdate:visible": t[0] || (t[0] = (r) => f.value = r),
        onSubmit: W,
        onClose: X
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  Ce as default
};
