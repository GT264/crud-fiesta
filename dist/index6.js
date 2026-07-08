import { defineComponent as w, ref as $, computed as b, openBlock as y, createElementBlock as B, createElementVNode as u, toDisplayString as C, createVNode as i, unref as F, withCtx as D } from "vue";
import { usePage as E, router as o } from "@inertiajs/vue3";
import T from "primevue/button";
import V from "./index7.js";
import k from "./index9.js";
const A = { class: "crud-index-page" }, I = { class: "flex items-center justify-between mb-4" }, N = { class: "text-2xl font-bold" }, R = /* @__PURE__ */ w({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(n) {
    const c = E();
    function s(e) {
      var r;
      return ((r = c.props.crudLang) == null ? void 0 : r[e]) ?? e;
    }
    const a = n, t = $(!1), d = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function m(e) {
      if (e.event)
        return e.event;
      const r = e.route.split("."), l = r[r.length - 1];
      return d[l] || l;
    }
    const p = b(
      () => a.crud_buttons.map((e) => ({
        action: m(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function f() {
      o.get(`/${a.route_prefix}/create`);
    }
    function _(e) {
      o.get(`/${a.route_prefix}/${e}`);
    }
    function g(e) {
      o.get(`/${a.route_prefix}/${e}/edit`);
    }
    function v(e) {
      o.delete(`/${a.route_prefix}/${e}`);
    }
    function h(e) {
      o.get(
        window.location.pathname,
        { page: e.page + 1, per_page: e.rows },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => t.value = !0,
          onFinish: () => t.value = !1
        }
      );
    }
    function x(e) {
      o.get(
        window.location.pathname,
        { sort_field: e.sortField, sort_order: e.sortOrder },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => t.value = !0,
          onFinish: () => t.value = !1
        }
      );
    }
    function S(e) {
      o.get(
        window.location.pathname,
        { search: e.query },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          replace: !0,
          onStart: () => t.value = !0,
          onFinish: () => t.value = !1
        }
      );
    }
    return (e, r) => (y(), B("div", A, [
      u("div", I, [
        u("h1", N, C(n.title), 1),
        i(F(T), {
          label: s("crud.button.create"),
          icon: "pi pi-plus",
          onClick: f
        }, null, 8, ["label"])
      ]),
      i(V, {
        items: n.column_data.data,
        columns: n.columns_details,
        "total-records": n.column_data.total,
        "per-page": n.column_data.per_page,
        loading: t.value,
        onPaginate: h,
        onSort: x,
        onSearch: S
      }, {
        actions: D(({ row: l }) => [
          i(k, {
            row: l,
            buttons: p.value,
            onView: _,
            onEdit: g,
            onDelete: v
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"])
    ]));
  }
});
export {
  R as default
};
