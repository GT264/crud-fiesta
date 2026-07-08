import { defineComponent as w, ref as $, computed as b, openBlock as y, createElementBlock as B, createElementVNode as c, toDisplayString as C, createVNode as u, unref as F, withCtx as D } from "vue";
import { usePage as E, router as n } from "@inertiajs/vue3";
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
  setup(r) {
    const i = E();
    function s(e) {
      var a;
      return ((a = i.props.crudLang) == null ? void 0 : a[e]) ?? e;
    }
    const t = r, o = $(!1), d = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function p(e) {
      if (e.event)
        return e.event;
      const a = e.route.split("."), l = a[a.length - 1];
      return d[l] || l;
    }
    const m = b(
      () => t.crud_buttons.map((e) => ({
        action: p(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function f() {
      n.get(`/${t.route_prefix}/create`);
    }
    function _(e) {
      n.get(`/${t.route_prefix}/${e}`);
    }
    function g(e) {
      n.get(`/${t.route_prefix}/${e}/edit`);
    }
    function v(e) {
      n.delete(`/${t.route_prefix}/${e}`);
    }
    function h(e) {
      n.get(
        window.location.pathname,
        { page: e.page + 1, per_page: e.rows },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => o.value = !0,
          onFinish: () => o.value = !1
        }
      );
    }
    function x(e) {
      n.get(
        window.location.pathname,
        {
          page: t.column_data.current_page,
          per_page: t.column_data.per_page,
          sort_field: e.sortField,
          sort_order: e.sortOrder
        },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => o.value = !0,
          onFinish: () => o.value = !1
        }
      );
    }
    function S(e) {
      n.get(
        window.location.pathname,
        { search: e.query },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          replace: !0,
          onStart: () => o.value = !0,
          onFinish: () => o.value = !1
        }
      );
    }
    return (e, a) => (y(), B("div", A, [
      c("div", I, [
        c("h1", N, C(r.title), 1),
        u(F(T), {
          label: s("crud.button.create"),
          icon: "pi pi-plus",
          onClick: f
        }, null, 8, ["label"])
      ]),
      u(V, {
        items: r.column_data.data,
        columns: r.columns_details,
        "total-records": r.column_data.total,
        "per-page": r.column_data.per_page,
        loading: o.value,
        onPaginate: h,
        onSort: x,
        onSearch: S
      }, {
        actions: D(({ row: l }) => [
          u(k, {
            row: l,
            buttons: m.value,
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
