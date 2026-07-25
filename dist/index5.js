import { defineComponent as O, ref as n, computed as W, openBlock as z, createElementBlock as G, createVNode as c, unref as S, createElementVNode as y, toDisplayString as x, withCtx as F, createTextVNode as H } from "vue";
import { usePage as J, router as l } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
import { Plus as K } from "lucide-vue-next";
import M from "./index15.js";
import Q from "./index16.js";
import X from "./index6.js";
import Y from "./index8.js";
import Z from "./index7.js";
const ee = { class: "crud-index-page" }, te = { class: "flex items-center justify-between mb-4" }, oe = { class: "text-2xl font-bold" }, fe = /* @__PURE__ */ O({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(s) {
    const w = J();
    function v(e) {
      var t;
      return ((t = w.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = s, C = Q, _ = n(null), r = n(!1), d = /* @__PURE__ */ new Set();
    l.on("finish", () => {
      var t, o;
      const e = w.props.flash;
      e != null && e.success && !d.has("success:" + e.success) && (d.add("success:" + e.success), (t = _.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !d.has("error:" + e.error) && (d.add("error:" + e.error), (o = _.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const i = n(!1), g = n(""), h = n({}), f = n(null), m = n(!1), u = n(!1), p = n(null), j = { show: "view", edit: "edit", destroy: "delete" };
    function T(e) {
      return e.event || j[e.action] || e.action;
    }
    const A = W(() => a.crud_buttons.map((e) => ({ action: T(e), icon: e.icon, label: e.label })));
    function E(e) {
      return $(e);
    }
    function I(e, t) {
      return $(e, { id: t });
    }
    async function R() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      u.value = !0;
      try {
        const t = e ? E(e.route_name) : `/${a.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        h.value = o, g.value = v("crud.button.create"), f.value = null, m.value = !1, p.value = null, i.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        u.value = !1;
      }
    }
    async function V(e) {
      const t = a.crud_buttons.find((o) => o.action === "edit");
      u.value = !0;
      try {
        const o = t ? I(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, b = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        h.value = b.form_details, g.value = v("crud.button.edit"), f.value = b.item, m.value = !0, p.value = e, i.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        u.value = !1;
      }
    }
    function B(e) {
      u.value = !0;
      const t = () => {
        u.value = !1, i.value = !1;
      };
      m.value ? l.put(`/${a.route_prefix}/${p.value}`, e, { onFinish: t }) : l.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function D() {
      i.value = !1, f.value = null, p.value = null;
    }
    function k(e) {
    }
    function N(e) {
      l.delete(`/${a.route_prefix}/${e}`);
    }
    function P(e) {
      l.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    function L(e) {
      l.get(window.location.pathname, { page: a.column_data.current_page, per_page: a.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    function U(e) {
      l.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    function q(e) {
      l.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    return (e, t) => (z(), G("div", ee, [
      c(S(C), {
        ref_key: "toastRef",
        ref: _
      }, null, 512),
      y("div", te, [
        y("h1", oe, x(s.title), 1),
        c(M, {
          variant: "default",
          onClick: R
        }, {
          default: F(() => [
            c(S(K), { class: "h-4 w-4 mr-1" }),
            H(" " + x(v("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      c(X, {
        items: s.column_data.data,
        columns: s.columns_details,
        "total-records": s.column_data.total,
        "per-page": s.column_data.per_page,
        loading: r.value,
        onPaginate: P,
        onSort: L,
        onSearch: U,
        onFilter: q
      }, {
        actions: F(({ row: o }) => [
          c(Y, {
            row: o,
            buttons: A.value,
            onView: k,
            onEdit: V,
            onDelete: N
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      c(Z, {
        visible: i.value,
        title: g.value,
        fields: h.value,
        data: f.value,
        loading: u.value,
        "is-edit": m.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => i.value = o),
        onSubmit: B,
        onClose: D
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  fe as default
};
