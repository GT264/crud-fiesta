import { defineComponent as G, computed as y, ref as r, openBlock as H, createElementBlock as J, createVNode as c, unref as b, createElementVNode as x, toDisplayString as F, withCtx as $, createTextVNode as K } from "vue";
import { usePage as Q, router as l } from "@inertiajs/vue3";
import { route as k } from "ziggy-js";
import { Plus as X } from "lucide-vue-next";
import Y from "./index15.js";
import Z from "./index26.js";
import ee from "./index6.js";
import te from "./index8.js";
import oe from "./index7.js";
const ae = { class: "crud-index-page" }, ne = { class: "flex items-center justify-between mb-4" }, re = { class: "text-2xl font-bold" }, ve = /* @__PURE__ */ G({
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
    const w = Q();
    function d(e) {
      var t;
      return ((t = w.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = u, C = y(() => {
      const e = d(a.model_lang + ".plural");
      if (e !== a.model_lang + ".plural") return e;
      const t = (a.model_lang || "").split(".");
      return t[t.length - 1] || "Items";
    }), j = y(() => d("crud.title.index").replace(":model_name", C.value)), P = Z, _ = r(null), n = r(!1), m = /* @__PURE__ */ new Set();
    l.on("finish", () => {
      var t, o;
      const e = w.props.flash;
      e != null && e.success && !m.has("success:" + e.success) && (m.add("success:" + e.success), (t = _.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !m.has("error:" + e.error) && (m.add("error:" + e.error), (o = _.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const i = r(!1), g = r(""), h = r({}), f = r(null), p = r(!1), s = r(!1), v = r(null), T = { show: "view", edit: "edit", destroy: "delete" };
    function A(e) {
      return e.event || T[e.action] || e.action;
    }
    const E = y(() => a.crud_buttons.map((e) => ({ action: A(e), icon: e.icon, label: e.label })));
    function I(e) {
      return k(e);
    }
    function V(e, t) {
      return k(e, { id: t });
    }
    async function B() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      s.value = !0;
      try {
        const t = e ? I(e.route_name) : `/${a.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        h.value = o, g.value = d("crud.button.create"), f.value = null, p.value = !1, v.value = null, i.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        s.value = !1;
      }
    }
    async function R(e) {
      const t = a.crud_buttons.find((o) => o.action === "edit");
      s.value = !0;
      try {
        const o = t ? V(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, S = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        h.value = S.form_details, g.value = d("crud.button.edit"), f.value = S.item, p.value = !0, v.value = e, i.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        s.value = !1;
      }
    }
    function D(e) {
      s.value = !0;
      const t = () => {
        s.value = !1, i.value = !1;
      };
      p.value ? l.put(`/${a.route_prefix}/${v.value}`, e, { onFinish: t }) : l.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function N() {
      i.value = !1, f.value = null, v.value = null;
    }
    function L(e) {
    }
    function q(e) {
      l.delete(`/${a.route_prefix}/${e}`);
    }
    function M(e) {
      l.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function O(e) {
      l.get(window.location.pathname, { per_page: e, page: 1 }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function U(e) {
      l.get(window.location.pathname, { page: a.column_data.current_page, per_page: a.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function W(e) {
      l.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function z(e) {
      l.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    return (e, t) => (H(), J("div", ae, [
      c(b(P), {
        ref_key: "toastRef",
        ref: _
      }, null, 512),
      x("div", ne, [
        x("h1", re, F(j.value), 1),
        c(Y, {
          variant: "default",
          onClick: B
        }, {
          default: $(() => [
            c(b(X), { class: "h-4 w-4 mr-1" }),
            K(" " + F(d("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      c(ee, {
        items: u.column_data.data,
        columns: u.columns_details,
        "total-records": u.column_data.total,
        "per-page": u.column_data.per_page,
        "per-page-options": u.pagination_per_page_options,
        loading: n.value,
        "key-name": u.key_name,
        onPaginate: M,
        onSort: U,
        onSearch: W,
        onFilter: z,
        onPerPageChange: O
      }, {
        actions: $(({ row: o }) => [
          c(te, {
            row: o,
            buttons: E.value,
            "key-name": u.key_name,
            onView: L,
            onEdit: R,
            onDelete: q
          }, null, 8, ["row", "buttons", "key-name"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "per-page-options", "loading", "key-name"]),
      c(oe, {
        visible: i.value,
        title: g.value,
        fields: h.value,
        data: f.value,
        loading: s.value,
        "is-edit": p.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => i.value = o),
        onSubmit: D,
        onClose: N
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  ve as default
};
