import { defineComponent as G, computed as u, ref as p, resolveComponent as H, openBlock as J, createElementBlock as L, createVNode as a, createElementVNode as y, toDisplayString as w, unref as t, withCtx as h, createTextVNode as Q } from "vue";
import { router as c } from "@inertiajs/vue3";
import { Plus as W } from "lucide-vue-next";
import X from "./index15.js";
import Y from "./index6.js";
import Z from "./index8.js";
import ee from "./index7.js";
import { useCrudTranslation as te } from "./index17.js";
import { useFlashToasts as oe } from "./index28.js";
import { useCrudForm as re } from "./index29.js";
import { useExport as ne } from "./index30.js";
const ae = { class: "crud-index-page" }, le = { class: "flex items-center justify-between mb-4" }, se = { class: "text-2xl font-bold" }, be = /* @__PURE__ */ G({
  __name: "Index",
  props: {
    column_data: {},
    columns_details: {},
    route_prefix: {},
    key_name: {},
    model_lang: {},
    crud_buttons: {},
    pagination_per_page_options: { default: () => [10, 25, 50, 100] }
  },
  setup(l) {
    const n = l, { crudT: s } = te(), i = u(() => n.column_data), F = u(() => n.columns_details), C = u(() => n.model_lang), k = u(() => {
      const e = C.value, r = s(e + ".plural");
      if (r !== e + ".plural") return r;
      const m = (e || "").split(".");
      return m[m.length - 1] || "Items";
    }), E = u(() => s("crud.title.index").replace(":model_name", k.value)), { toastRef: _ } = oe(), {
      formVisible: g,
      formTitle: T,
      formFields: V,
      formIsEdit: D,
      form: f,
      mappedButtons: P,
      goToCreate: $,
      onEdit: B,
      onFormSubmit: I,
      onFormClose: N,
      onView: O,
      onDelete: q
    } = re(n.route_prefix, n.crud_buttons), o = p(!1), v = p(null), S = p(1), b = p(""), x = p({}), { onExport: R } = ne(n.route_prefix, _, b, v, S, x);
    function j(e) {
      c.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function A(e) {
      c.get(window.location.pathname, { per_page: e, page: 1 }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function K(e) {
      v.value = e.sortField, S.value = e.sortOrder, c.get(window.location.pathname, { page: i.value.current_page, per_page: i.value.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function M(e) {
      b.value = e.query, c.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function U(e) {
      x.value = e.globalFilter, c.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    return (e, r) => {
      const m = H("Toast");
      return J(), L("div", ae, [
        a(m, {
          ref_key: "toastRef",
          ref: _
        }, null, 512),
        y("div", le, [
          y("h1", se, w(E.value), 1),
          a(X, {
            variant: "default",
            onClick: r[0] || (r[0] = (d) => t($)(t(s)("crud.button.create")))
          }, {
            default: h(() => [
              a(t(W), { class: "h-4 w-4 mr-1" }),
              Q(" " + w(t(s)("crud.button.create")), 1)
            ]),
            _: 1
          })
        ]),
        a(Y, {
          items: i.value.data,
          columns: F.value,
          "total-records": i.value.total,
          "per-page": i.value.per_page,
          "per-page-options": l.pagination_per_page_options,
          loading: o.value,
          "key-name": l.key_name,
          "route-prefix": l.route_prefix,
          onPaginate: j,
          onSort: K,
          onSearch: M,
          onFilter: U,
          onPerPageChange: A,
          onExport: t(R)
        }, {
          actions: h(({ row: d }) => [
            a(Z, {
              row: d,
              buttons: t(P),
              "key-name": l.key_name,
              onView: t(O),
              onEdit: r[1] || (r[1] = (z) => t(B)(z, t(s)("crud.button.edit"))),
              onDelete: t(q)
            }, null, 8, ["row", "buttons", "key-name", "onView", "onDelete"])
          ]),
          _: 1
        }, 8, ["items", "columns", "total-records", "per-page", "per-page-options", "loading", "key-name", "route-prefix", "onExport"]),
        a(ee, {
          visible: t(g),
          title: t(T),
          fields: t(V),
          form: t(f),
          loading: t(f).processing,
          "is-edit": t(D),
          errors: t(f).errors,
          "onUpdate:visible": r[2] || (r[2] = (d) => g.value = d),
          onSubmit: t(I),
          onClose: t(N)
        }, null, 8, ["visible", "title", "fields", "form", "loading", "is-edit", "errors", "onSubmit", "onClose"])
      ]);
    };
  }
});
export {
  be as default
};
