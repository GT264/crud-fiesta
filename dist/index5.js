import { defineComponent as q, ref as r, computed as O, openBlock as W, createElementBlock as z, createVNode as c, unref as y, createElementVNode as S, toDisplayString as x, withCtx as F, createTextVNode as G } from "vue";
import { usePage as H, router as u } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
import { Plus as J } from "lucide-vue-next";
import K from "./index15.js";
import M from "./index26.js";
import Q from "./index6.js";
import X from "./index8.js";
import Y from "./index7.js";
const Z = { class: "crud-index-page" }, ee = { class: "flex items-center justify-between mb-4" }, te = { class: "text-2xl font-bold" }, de = /* @__PURE__ */ q({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(s) {
    const b = H();
    function v(e) {
      var t;
      return ((t = b.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = s, C = M, _ = r(null), n = r(!1), d = /* @__PURE__ */ new Set();
    u.on("finish", () => {
      var t, o;
      const e = b.props.flash;
      e != null && e.success && !d.has("success:" + e.success) && (d.add("success:" + e.success), (t = _.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !d.has("error:" + e.error) && (d.add("error:" + e.error), (o = _.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const i = r(!1), g = r(""), h = r({}), f = r(null), m = r(!1), l = r(!1), p = r(null), j = { show: "view", edit: "edit", destroy: "delete" };
    function T(e) {
      return e.event || j[e.action] || e.action;
    }
    const A = O(() => a.crud_buttons.map((e) => ({ action: T(e), icon: e.icon, label: e.label })));
    function E(e) {
      return $(e);
    }
    function I(e, t) {
      return $(e, { id: t });
    }
    async function R() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      l.value = !0;
      try {
        const t = e ? E(e.route_name) : `/${a.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        h.value = o, g.value = v("crud.button.create"), f.value = null, m.value = !1, p.value = null, i.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        l.value = !1;
      }
    }
    async function V(e) {
      const t = a.crud_buttons.find((o) => o.action === "edit");
      l.value = !0;
      try {
        const o = t ? I(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, w = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        h.value = w.form_details, g.value = v("crud.button.edit"), f.value = w.item, m.value = !0, p.value = e, i.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        l.value = !1;
      }
    }
    function B(e) {
      l.value = !0;
      const t = () => {
        l.value = !1, i.value = !1;
      };
      m.value ? u.put(`/${a.route_prefix}/${p.value}`, e, { onFinish: t }) : u.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function D() {
      i.value = !1, f.value = null, p.value = null;
    }
    function k(e) {
    }
    function N(e) {
      u.delete(`/${a.route_prefix}/${e}`);
    }
    function P(e) {
      u.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function L(e) {
      u.get(window.location.pathname, { page: a.column_data.current_page, per_page: a.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    function U(e) {
      u.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    return (e, t) => (W(), z("div", Z, [
      c(y(C), {
        ref_key: "toastRef",
        ref: _
      }, null, 512),
      S("div", ee, [
        S("h1", te, x(s.title), 1),
        c(K, {
          variant: "default",
          onClick: R
        }, {
          default: F(() => [
            c(y(J), { class: "h-4 w-4 mr-1" }),
            G(" " + x(v("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      c(Q, {
        items: s.column_data.data,
        columns: s.columns_details,
        "total-records": s.column_data.total,
        "per-page": s.column_data.per_page,
        loading: n.value,
        onPaginate: P,
        onSort: L,
        onSearch: U
      }, {
        actions: F(({ row: o }) => [
          c(X, {
            row: o,
            buttons: A.value,
            onView: k,
            onEdit: V,
            onDelete: N
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      c(Y, {
        visible: i.value,
        title: g.value,
        fields: h.value,
        data: f.value,
        loading: l.value,
        "is-edit": m.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => i.value = o),
        onSubmit: B,
        onClose: D
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  de as default
};
