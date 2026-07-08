import { defineComponent as S, ref as w, computed as $, openBlock as b, createElementBlock as y, createElementVNode as u, toDisplayString as B, createVNode as i, unref as c, withCtx as C } from "vue";
import { router as o } from "@inertiajs/vue3";
import { trans as F } from "laravel-vue-i18n";
import k from "primevue/button";
import D from "./index7.js";
import E from "./index9.js";
const V = { class: "crud-index-page" }, A = { class: "flex items-center justify-between mb-4" }, I = { class: "text-2xl font-bold" }, R = /* @__PURE__ */ S({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(n) {
    const r = n, t = w(!1), s = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function d(e) {
      if (e.event)
        return e.event;
      const l = e.route.split("."), a = l[l.length - 1];
      return s[a] || a;
    }
    const m = $(
      () => r.crud_buttons.map((e) => ({
        action: d(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function p() {
      o.get(`/${r.route_prefix}/create`);
    }
    function f(e) {
      o.get(`/${r.route_prefix}/${e}`);
    }
    function _(e) {
      o.get(`/${r.route_prefix}/${e}/edit`);
    }
    function g(e) {
      o.delete(`/${r.route_prefix}/${e}`);
    }
    function v(e) {
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
    function h(e) {
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
    function x(e) {
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
    return (e, l) => (b(), y("div", V, [
      u("div", A, [
        u("h1", I, B(n.title), 1),
        i(c(k), {
          label: c(F)("crud.button.create"),
          icon: "pi pi-plus",
          onClick: p
        }, null, 8, ["label"])
      ]),
      i(D, {
        items: n.column_data.data,
        columns: n.columns_details,
        "total-records": n.column_data.total,
        "per-page": n.column_data.per_page,
        loading: t.value,
        onPaginate: v,
        onSort: h,
        onSearch: x
      }, {
        actions: C(({ row: a }) => [
          i(E, {
            row: a,
            buttons: m.value,
            onView: f,
            onEdit: _,
            onDelete: g
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
