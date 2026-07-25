import { defineComponent as U, ref as n, computed as q, openBlock as O, createElementBlock as W, createVNode as c, unref as w, createElementVNode as y, toDisplayString as x, withCtx as S, createTextVNode as z } from "vue";
import { usePage as G, router as u } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
import { Plus as H } from "lucide-vue-next";
import J from "./index15.js";
import K from "./index25.js";
import M from "./index6.js";
import Q from "./index8.js";
import X from "./index7.js";
const Y = { class: "crud-index-page" }, Z = { class: "flex items-center justify-between mb-4" }, ee = { class: "text-2xl font-bold" }, ce = /* @__PURE__ */ U({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(i) {
    const h = G();
    function p(e) {
      var t;
      return ((t = h.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = i, F = K, v = n(null), r = n(!1);
    u.on("finish", () => {
      var t, o;
      const e = h.props.flash;
      e != null && e.success && ((t = v.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && ((o = v.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const s = n(!1), _ = n(""), g = n({}), d = n(null), f = n(!1), l = n(!1), m = n(null), C = { show: "view", edit: "edit", destroy: "delete" };
    function j(e) {
      return e.event || C[e.action] || e.action;
    }
    const T = q(() => a.crud_buttons.map((e) => ({ action: j(e), icon: e.icon, label: e.label })));
    function A(e) {
      return $(e);
    }
    function E(e, t) {
      return $(e, { id: t });
    }
    async function I() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      l.value = !0;
      try {
        const t = e ? A(e.route_name) : `/${a.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        g.value = o, _.value = p("crud.button.create"), d.value = null, f.value = !1, m.value = null, s.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        l.value = !1;
      }
    }
    async function R(e) {
      const t = a.crud_buttons.find((o) => o.action === "edit");
      l.value = !0;
      try {
        const o = t ? E(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, b = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        g.value = b.form_details, _.value = p("crud.button.edit"), d.value = b.item, f.value = !0, m.value = e, s.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        l.value = !1;
      }
    }
    function V(e) {
      l.value = !0;
      const t = () => {
        l.value = !1, s.value = !1;
      };
      f.value ? u.put(`/${a.route_prefix}/${m.value}`, e, { onFinish: t }) : u.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function B() {
      s.value = !1, d.value = null, m.value = null;
    }
    function D(e) {
    }
    function k(e) {
      u.delete(`/${a.route_prefix}/${e}`);
    }
    function N(e) {
      u.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    function P(e) {
      u.get(window.location.pathname, { page: a.column_data.current_page, per_page: a.column_data.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    function L(e) {
      u.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => r.value = !0, onFinish: () => r.value = !1 });
    }
    return (e, t) => (O(), W("div", Y, [
      c(w(F), {
        ref_key: "toastRef",
        ref: v
      }, null, 512),
      y("div", Z, [
        y("h1", ee, x(i.title), 1),
        c(J, {
          variant: "default",
          onClick: I
        }, {
          default: S(() => [
            c(w(H), { class: "h-4 w-4 mr-1" }),
            z(" " + x(p("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      c(M, {
        items: i.column_data.data,
        columns: i.columns_details,
        "total-records": i.column_data.total,
        "per-page": i.column_data.per_page,
        loading: r.value,
        onPaginate: N,
        onSort: P,
        onSearch: L
      }, {
        actions: S(({ row: o }) => [
          c(Q, {
            row: o,
            buttons: T.value,
            onView: D,
            onEdit: R,
            onDelete: k
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      c(X, {
        visible: s.value,
        title: _.value,
        fields: g.value,
        data: d.value,
        loading: l.value,
        "is-edit": f.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => s.value = o),
        onSubmit: V,
        onClose: B
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  ce as default
};
