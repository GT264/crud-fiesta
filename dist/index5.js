import { defineComponent as ce, computed as O, ref as n, onUnmounted as ue, openBlock as de, createElementBlock as pe, createVNode as m, unref as I, createElementVNode as A, toDisplayString as B, withCtx as q, createTextVNode as fe } from "vue";
import { usePage as me, router as i } from "@inertiajs/vue3";
import { route as D } from "ziggy-js";
import { Plus as ve } from "lucide-vue-next";
import ge from "./index15.js";
import _e from "./index26.js";
import he from "./index6.js";
import xe from "./index8.js";
import ye from "./index7.js";
const we = { class: "crud-index-page" }, be = { class: "flex items-center justify-between mb-4" }, Ee = { class: "text-2xl font-bold" }, Pe = /* @__PURE__ */ ce({
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
  setup(s) {
    const S = me();
    function v(e) {
      var t;
      return ((t = S.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const r = s, R = O(() => {
      const e = v(r.model_lang + ".plural");
      if (e !== r.model_lang + ".plural") return e;
      const t = (r.model_lang || "").split(".");
      return t[t.length - 1] || "Items";
    }), U = O(() => v("crud.title.index").replace(":model_name", R.value)), V = _e, k = n(null), a = n(!1), g = /* @__PURE__ */ new Set();
    i.on("finish", () => {
      var t, o;
      const e = S.props.flash;
      e != null && e.success && !g.has("success:" + e.success) && (g.add("success:" + e.success), (t = k.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !g.has("error:" + e.error) && (g.add("error:" + e.error), (o = k.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const d = n(!1), C = n(""), F = n({}), _ = n(null), h = n(!1), c = n(!1), x = n(null), M = { show: "view", edit: "edit", destroy: "delete" };
    function L(e) {
      return e.event || M[e.action] || e.action;
    }
    const K = O(() => r.crud_buttons.map((e) => ({ action: L(e), icon: e.icon, label: e.label })));
    function z(e) {
      return D(e);
    }
    function H(e, t) {
      return D(e, { id: t });
    }
    async function J() {
      const e = r.crud_buttons.find((t) => t.action === "create");
      c.value = !0;
      try {
        const t = e ? z(e.route_name) : `/${r.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        F.value = o, C.value = v("crud.button.create"), _.value = null, h.value = !1, x.value = null, d.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        c.value = !1;
      }
    }
    async function W(e) {
      const t = r.crud_buttons.find((o) => o.action === "edit");
      c.value = !0;
      try {
        const o = t ? H(t.route_name, e) : `/${r.route_prefix}/${e}/edit`, l = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        F.value = l.form_details, C.value = v("crud.button.edit"), _.value = l.item, h.value = !0, x.value = e, d.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        c.value = !1;
      }
    }
    function X(e) {
      c.value = !0;
      const t = () => {
        c.value = !1, d.value = !1;
      };
      h.value ? i.put(`/${r.route_prefix}/${x.value}`, e, { onFinish: t }) : i.post(`/${r.route_prefix}`, e, { onFinish: t });
    }
    function G() {
      d.value = !1, _.value = null, x.value = null;
    }
    function Q(e) {
    }
    function Y(e) {
      i.delete(`/${r.route_prefix}/${e}`);
    }
    function Z(e) {
      i.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => a.value = !0, onFinish: () => a.value = !1 });
    }
    function ee(e) {
      i.get(window.location.pathname, { per_page: e, page: 1 }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => a.value = !0, onFinish: () => a.value = !1 });
    }
    function te(e) {
      $.value = e.sortField, P.value = e.sortOrder, i.get(window.location.pathname, { page: r.column_data.current_page, per_page: r.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => a.value = !0, onFinish: () => a.value = !1 });
    }
    function oe(e) {
      T.value = e.query, i.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => a.value = !0, onFinish: () => a.value = !1 });
    }
    function re(e) {
      j.value = e.globalFilter, i.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => a.value = !0, onFinish: () => a.value = !1 });
    }
    const $ = n(null), P = n(1), T = n(""), j = n({});
    let y = null;
    const ne = {
      success: "border-green-200 bg-green-50 text-green-800",
      error: "border-red-200 bg-red-50 text-red-800",
      warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
      info: "border-blue-200 bg-blue-50 text-blue-800"
    };
    function p(e, t, o, l) {
      const N = document.getElementById("crud-fiesta-toast-container") || ae(), f = document.createElement("div");
      f.className = `flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all ${ne[e]}`;
      const b = document.createElement("div");
      if (b.className = "flex-1", t) {
        const u = document.createElement("div");
        u.className = "font-semibold text-sm", u.textContent = t, b.appendChild(u);
      }
      if (o) {
        const u = document.createElement("div");
        u.className = "text-sm opacity-80", u.textContent = o, b.appendChild(u);
      }
      const E = document.createElement("button");
      E.className = "opacity-50 hover:opacity-100", E.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>', E.onclick = () => f.remove(), f.appendChild(b), f.appendChild(E), N.appendChild(f), console.log("[crud-fiesta] Toast added via DOM:", { severity: e, summary: t, detail: o }), l > 0 && setTimeout(() => f.remove(), l);
    }
    function ae() {
      const e = document.createElement("div");
      return e.id = "crud-fiesta-toast-container", e.style.cssText = "position:fixed;top:1rem;right:1rem;z-index:10000;display:flex;flex-direction:column;gap:0.5rem;", document.body.appendChild(e), e;
    }
    async function le(e) {
      try {
        const t = { format: e };
        T.value && (t.search = T.value), $.value && (t.sort_field = $.value, t.sort_order = P.value), Object.keys(j.value).length > 0 && (t.filters = j.value);
        const o = await fetch(`/${r.route_prefix}/export/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": S.props.csrf_token ?? ""
          },
          body: JSON.stringify(t)
        });
        if (!o.ok) {
          const N = await o.json().catch(() => ({ message: "Export request failed" }));
          p("error", "Export Error", N.message || "Export request failed", 5e3);
          return;
        }
        const { export_id: l } = await o.json();
        console.log("[crud-fiesta] Export started:", l), p("info", "Export", "Export started — preparing your file...", 12e4), se(l);
      } catch (t) {
        p("error", "Export Error", "Export failed: " + (t.message || "Unknown error"), 5e3);
      }
    }
    function se(e) {
      w(), y = setInterval(async () => {
        try {
          const t = await fetch(`/${r.route_prefix}/export/status/${e}`, {
            headers: { Accept: "application/json" }
          });
          if (!t.ok) {
            console.warn("[crud-fiesta] Export status returned non-OK:", t.status);
            return;
          }
          const o = await t.json();
          if (console.log("[crud-fiesta] Export status:", o.status, "processed:", o.processed, "/", o.total), o.status === "queued" || o.status === "processing") {
            const l = o.status === "queued" ? "Export started — preparing your file..." : `Exporting ${o.processed ?? 0} of ${o.total ?? 0} records...`;
            p("info", "Export", l, 12e4);
          } else o.status === "completed" ? (w(), ie(e)) : o.status === "failed" && (w(), p("error", "Export Failed", "Export failed: " + (o.error || "Unknown error"), 1e4));
        } catch (t) {
          console.warn("[crud-fiesta] Export polling error:", t);
        }
      }, 2e3);
    }
    function ie(e) {
      p("success", "Export ready!", "Download starting...", 3e3);
      const t = `/${r.route_prefix}/export/download/${e}`, o = document.createElement("a");
      o.href = t, o.target = "_blank", document.body.appendChild(o), o.click(), document.body.removeChild(o);
    }
    function w() {
      y && (clearInterval(y), y = null);
    }
    return ue(() => {
      w();
    }), (e, t) => (de(), pe("div", we, [
      m(I(V), {
        ref_key: "toastRef",
        ref: k
      }, null, 512),
      A("div", be, [
        A("h1", Ee, B(U.value), 1),
        m(ge, {
          variant: "default",
          onClick: J
        }, {
          default: q(() => [
            m(I(ve), { class: "h-4 w-4 mr-1" }),
            fe(" " + B(v("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      m(he, {
        items: s.column_data.data,
        columns: s.columns_details,
        "total-records": s.column_data.total,
        "per-page": s.column_data.per_page,
        "per-page-options": s.pagination_per_page_options,
        loading: a.value,
        "key-name": s.key_name,
        "route-prefix": s.route_prefix,
        onPaginate: Z,
        onSort: te,
        onSearch: oe,
        onFilter: re,
        onPerPageChange: ee,
        onExport: le
      }, {
        actions: q(({ row: o }) => [
          m(xe, {
            row: o,
            buttons: K.value,
            "key-name": s.key_name,
            onView: Q,
            onEdit: W,
            onDelete: Y
          }, null, 8, ["row", "buttons", "key-name"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "per-page-options", "loading", "key-name", "route-prefix"]),
      m(ye, {
        visible: d.value,
        title: C.value,
        fields: F.value,
        data: _.value,
        loading: c.value,
        "is-edit": h.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => d.value = o),
        onSubmit: X,
        onClose: G
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  Pe as default
};
