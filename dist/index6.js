import { defineComponent as k, ref as l, computed as L, openBlock as N, createElementBlock as P, createElementVNode as b, toDisplayString as U, createVNode as m, unref as q, withCtx as O } from "vue";
import { usePage as W, router as s } from "@inertiajs/vue3";
import { route as w } from "ziggy-js";
import z from "primevue/button";
import G from "./index7.js";
import H from "./index9.js";
import J from "./index8.js";
const K = { class: "crud-index-page" }, M = { class: "flex items-center justify-between mb-4" }, Q = { class: "text-2xl font-bold" }, ne = /* @__PURE__ */ k({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(i) {
    const x = W();
    function p(e) {
      var t;
      return ((t = x.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const o = i, r = l(!1), u = l(!1), v = l(""), _ = l({}), d = l(null), f = l(!1), n = l(!1), c = l(null), S = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function y(e) {
      return e.event ? e.event : S[e.action] || e.action;
    }
    const F = L(
      () => o.crud_buttons.map((e) => ({
        action: y(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function $(e) {
      return w(e);
    }
    function C(e, t) {
      return w(e, { id: t });
    }
    async function j() {
      const e = o.crud_buttons.find((t) => t.action === "create");
      n.value = !0;
      try {
        const t = e ? $(e.route_name) : `/${o.route_prefix}/create`, g = await (await fetch(t, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = g, v.value = p("crud.button.create"), d.value = null, f.value = !1, c.value = null, u.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        n.value = !1;
      }
    }
    async function B(e) {
      const t = o.crud_buttons.find((a) => a.action === "edit");
      n.value = !0;
      try {
        const a = t ? C(t.route_name, e) : `/${o.route_prefix}/${e}/edit`, h = await (await fetch(a, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = h.form_details, v.value = p("crud.button.edit"), d.value = h.item, f.value = !0, c.value = e, u.value = !0;
      } catch (a) {
        console.error("Failed to load edit form:", a);
      } finally {
        n.value = !1;
      }
    }
    function I(e) {
      n.value = !0, f.value && c.value !== null ? s.put(`/${o.route_prefix}/${c.value}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      }) : s.post(`/${o.route_prefix}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      });
    }
    function A() {
      u.value = !1, d.value = null, c.value = null;
    }
    function D(e) {
    }
    function E(e) {
      s.delete(`/${o.route_prefix}/${e}`);
    }
    function T(e) {
      s.get(
        window.location.pathname,
        { page: e.page + 1, per_page: e.rows },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => r.value = !0,
          onFinish: () => r.value = !1
        }
      );
    }
    function V(e) {
      s.get(
        window.location.pathname,
        {
          page: o.column_data.current_page,
          per_page: o.column_data.per_page,
          sort_field: e.sortField,
          sort_order: e.sortOrder
        },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => r.value = !0,
          onFinish: () => r.value = !1
        }
      );
    }
    function R(e) {
      s.get(
        window.location.pathname,
        { search: e.query },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          replace: !0,
          onStart: () => r.value = !0,
          onFinish: () => r.value = !1
        }
      );
    }
    return (e, t) => (N(), P("div", K, [
      b("div", M, [
        b("h1", Q, U(i.title), 1),
        m(q(z), {
          label: p("crud.button.create"),
          icon: "pi pi-plus",
          onClick: j
        }, null, 8, ["label"])
      ]),
      m(G, {
        items: i.column_data.data,
        columns: i.columns_details,
        "total-records": i.column_data.total,
        "per-page": i.column_data.per_page,
        loading: r.value,
        onPaginate: T,
        onSort: V,
        onSearch: R
      }, {
        actions: O(({ row: a }) => [
          m(H, {
            row: a,
            buttons: F.value,
            onView: D,
            onEdit: B,
            onDelete: E
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      m(J, {
        visible: u.value,
        title: v.value,
        fields: _.value,
        data: d.value,
        loading: n.value,
        "is-edit": f.value,
        "onUpdate:visible": t[0] || (t[0] = (a) => u.value = a),
        onSubmit: I,
        onClose: A
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  ne as default
};
