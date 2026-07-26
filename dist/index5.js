import { defineComponent as O, ref as r, computed as W, openBlock as z, createElementBlock as G, createVNode as c, unref as b, createElementVNode as S, toDisplayString as x, withCtx as F, createTextVNode as H } from "vue";
import { usePage as J, router as u } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
import { Plus as K } from "lucide-vue-next";
import M from "./index15.js";
import Q from "./index26.js";
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
    key_name: {},
    crud_buttons: {}
  },
  setup(l) {
    const y = J();
    function v(e) {
      var t;
      return ((t = y.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const a = l, k = Q, _ = r(null), n = r(!1), d = /* @__PURE__ */ new Set();
    u.on("finish", () => {
      var t, o;
      const e = y.props.flash;
      e != null && e.success && !d.has("success:" + e.success) && (d.add("success:" + e.success), (t = _.value) == null || t.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 })), e != null && e.error && !d.has("error:" + e.error) && (d.add("error:" + e.error), (o = _.value) == null || o.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 }));
    });
    const i = r(!1), g = r(""), h = r({}), f = r(null), m = r(!1), s = r(!1), p = r(null), C = { show: "view", edit: "edit", destroy: "delete" };
    function j(e) {
      return e.event || C[e.action] || e.action;
    }
    const T = W(() => a.crud_buttons.map((e) => ({ action: j(e), icon: e.icon, label: e.label })));
    function A(e) {
      return $(e);
    }
    function E(e, t) {
      return $(e, { id: t });
    }
    async function I() {
      const e = a.crud_buttons.find((t) => t.action === "create");
      s.value = !0;
      try {
        const t = e ? A(e.route_name) : `/${a.route_prefix}/create`, o = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
        h.value = o, g.value = v("crud.button.create"), f.value = null, m.value = !1, p.value = null, i.value = !0;
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
        const o = t ? E(t.route_name, e) : `/${a.route_prefix}/${e}/edit`, w = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
        h.value = w.form_details, g.value = v("crud.button.edit"), f.value = w.item, m.value = !0, p.value = e, i.value = !0;
      } catch (o) {
        console.error("Failed to load edit form:", o);
      } finally {
        s.value = !1;
      }
    }
    function V(e) {
      s.value = !0;
      const t = () => {
        s.value = !1, i.value = !1;
      };
      m.value ? u.put(`/${a.route_prefix}/${p.value}`, e, { onFinish: t }) : u.post(`/${a.route_prefix}`, e, { onFinish: t });
    }
    function B() {
      i.value = !1, f.value = null, p.value = null;
    }
    function D(e) {
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
    function q(e) {
      u.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => n.value = !0, onFinish: () => n.value = !1 });
    }
    return (e, t) => (z(), G("div", ee, [
      c(b(k), {
        ref_key: "toastRef",
        ref: _
      }, null, 512),
      S("div", te, [
        S("h1", oe, x(l.title), 1),
        c(M, {
          variant: "default",
          onClick: I
        }, {
          default: F(() => [
            c(b(K), { class: "h-4 w-4 mr-1" }),
            H(" " + x(v("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      c(X, {
        items: l.column_data.data,
        columns: l.columns_details,
        "total-records": l.column_data.total,
        "per-page": l.column_data.per_page,
        loading: n.value,
        "key-name": l.key_name,
        onPaginate: P,
        onSort: L,
        onSearch: U,
        onFilter: q
      }, {
        actions: F(({ row: o }) => [
          c(Y, {
            row: o,
            buttons: T.value,
            "key-name": l.key_name,
            onView: D,
            onEdit: R,
            onDelete: N
          }, null, 8, ["row", "buttons", "key-name"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading", "key-name"]),
      c(Z, {
        visible: i.value,
        title: g.value,
        fields: h.value,
        data: f.value,
        loading: s.value,
        "is-edit": m.value,
        "onUpdate:visible": t[0] || (t[0] = (o) => i.value = o),
        onSubmit: V,
        onClose: B
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  fe as default
};
