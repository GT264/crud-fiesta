import { defineComponent as E, ref as n, computed as I, openBlock as T, createElementBlock as V, createElementVNode as g, toDisplayString as k, createVNode as m, unref as L, withCtx as N } from "vue";
import { usePage as P, router as i } from "@inertiajs/vue3";
import U from "primevue/button";
import q from "./index7.js";
import O from "./index9.js";
import R from "./index8.js";
const z = { class: "crud-index-page" }, G = { class: "flex items-center justify-between mb-4" }, H = { class: "text-2xl font-bold" }, Y = /* @__PURE__ */ E({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(s) {
    const h = P();
    function p(e) {
      var t;
      return ((t = h.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const o = s, r = n(!1), u = n(!1), v = n(""), _ = n({}), d = n(null), f = n(!1), l = n(!1), c = n(null), w = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function b(e) {
      if (e.event)
        return e.event;
      const t = e.route.split("."), a = t[t.length - 1];
      return w[a] || a;
    }
    const x = I(
      () => o.crud_buttons.map((e) => ({
        action: b(e),
        icon: e.icon,
        label: e.label
      }))
    );
    async function S() {
      l.value = !0;
      try {
        const t = await (await fetch(`/${o.route_prefix}/create`, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = t, v.value = p("crud.button.create"), d.value = null, f.value = !1, c.value = null, u.value = !0;
      } catch (e) {
        console.error("Failed to load create form:", e);
      } finally {
        l.value = !1;
      }
    }
    async function $(e) {
      l.value = !0;
      try {
        const a = await (await fetch(`/${o.route_prefix}/${e}/edit`, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = a.form_details, v.value = p("crud.button.edit"), d.value = a.item, f.value = !0, c.value = e, u.value = !0;
      } catch (t) {
        console.error("Failed to load edit form:", t);
      } finally {
        l.value = !1;
      }
    }
    function y(e) {
      l.value = !0, f.value && c.value !== null ? i.put(`/${o.route_prefix}/${c.value}`, e, {
        onFinish: () => {
          l.value = !1, u.value = !1;
        }
      }) : i.post(`/${o.route_prefix}`, e, {
        onFinish: () => {
          l.value = !1, u.value = !1;
        }
      });
    }
    function F() {
      u.value = !1, d.value = null, c.value = null;
    }
    function C(e) {
      i.get(`/${o.route_prefix}/${e}`);
    }
    function j(e) {
      i.delete(`/${o.route_prefix}/${e}`);
    }
    function B(e) {
      i.get(
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
    function A(e) {
      i.get(
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
    function D(e) {
      i.get(
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
    return (e, t) => (T(), V("div", z, [
      g("div", G, [
        g("h1", H, k(s.title), 1),
        m(L(U), {
          label: p("crud.button.create"),
          icon: "pi pi-plus",
          onClick: S
        }, null, 8, ["label"])
      ]),
      m(q, {
        items: s.column_data.data,
        columns: s.columns_details,
        "total-records": s.column_data.total,
        "per-page": s.column_data.per_page,
        loading: r.value,
        onPaginate: B,
        onSort: A,
        onSearch: D
      }, {
        actions: N(({ row: a }) => [
          m(O, {
            row: a,
            buttons: x.value,
            onView: C,
            onEdit: $,
            onDelete: j
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      m(R, {
        visible: u.value,
        title: v.value,
        fields: _.value,
        data: d.value,
        loading: l.value,
        "is-edit": f.value,
        "onUpdate:visible": t[0] || (t[0] = (a) => u.value = a),
        onSubmit: y,
        onClose: F
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  Y as default
};
