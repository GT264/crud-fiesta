import { defineComponent as G, computed as m, ref as p, openBlock as H, createElementBlock as J, createVNode as l, unref as t, createElementVNode as x, toDisplayString as y, withCtx as w, createTextVNode as L } from "vue";
import { router as c } from "@inertiajs/vue3";
import { Plus as Q } from "lucide-vue-next";
import W from "./index15.js";
import X from "./index28.js";
import Y from "./index6.js";
import Z from "./index8.js";
import ee from "./index7.js";
import { useCrudTranslation as te } from "./index18.js";
import { useFlashToasts as oe } from "./index29.js";
import { useCrudForm as re } from "./index30.js";
import { useExport as ne } from "./index31.js";
const ae = { class: "crud-index-page" }, le = { class: "flex items-center justify-between mb-4" }, se = { class: "text-2xl font-bold" }, xe = /* @__PURE__ */ G({
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
  setup(s) {
    const a = s, { crudT: i } = te(), h = X, u = m(() => a.column_data), F = m(() => a.columns_details), k = m(() => a.model_lang), C = m(() => {
      const e = k.value, r = i(e + ".plural");
      if (r !== e + ".plural") return r;
      const n = (e || "").split(".");
      return n[n.length - 1] || "Items";
    }), E = m(() => i("crud.title.index").replace(":model_name", C.value)), { toastRef: f } = oe(), {
      formVisible: _,
      formTitle: T,
      formFields: V,
      formIsEdit: D,
      form: d,
      mappedButtons: P,
      goToCreate: $,
      onEdit: B,
      onFormSubmit: I,
      onFormClose: N,
      onView: O,
      onDelete: q
    } = re(a.route_prefix, a.crud_buttons), o = p(!1), g = p(null), v = p(1), S = p(""), b = p({}), { onExport: R } = ne(a.route_prefix, f, S, g, v, b);
    function j(e) {
      c.get(window.location.pathname, { page: e.page + 1, per_page: e.rows }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function A(e) {
      c.get(window.location.pathname, { per_page: e, page: 1 }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function K(e) {
      g.value = e.sortField, v.value = e.sortOrder, c.get(window.location.pathname, { page: u.value.current_page, per_page: u.value.per_page, sort_field: e.sortField, sort_order: e.sortOrder }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function M(e) {
      S.value = e.query, c.get(window.location.pathname, { search: e.query }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    function U(e) {
      b.value = e.globalFilter, c.get(window.location.pathname, { filters: e.globalFilter }, { preserveState: !0, preserveScroll: !0, only: ["column_data"], replace: !0, onStart: () => o.value = !0, onFinish: () => o.value = !1 });
    }
    return (e, r) => (H(), J("div", ae, [
      l(t(h), {
        ref_key: "toastRef",
        ref: f
      }, null, 512),
      x("div", le, [
        x("h1", se, y(E.value), 1),
        l(W, {
          variant: "default",
          onClick: r[0] || (r[0] = (n) => t($)(t(i)("crud.button.create")))
        }, {
          default: w(() => [
            l(t(Q), { class: "h-4 w-4 mr-1" }),
            L(" " + y(t(i)("crud.button.create")), 1)
          ]),
          _: 1
        })
      ]),
      l(Y, {
        items: u.value.data,
        columns: F.value,
        "total-records": u.value.total,
        "per-page": u.value.per_page,
        "per-page-options": s.pagination_per_page_options,
        loading: o.value,
        "key-name": s.key_name,
        "route-prefix": s.route_prefix,
        onPaginate: j,
        onSort: K,
        onSearch: M,
        onFilter: U,
        onPerPageChange: A,
        onExport: t(R)
      }, {
        actions: w(({ row: n }) => [
          l(Z, {
            row: n,
            buttons: t(P),
            "key-name": s.key_name,
            onView: t(O),
            onEdit: r[1] || (r[1] = (z) => t(B)(z, t(i)("crud.button.edit"))),
            onDelete: t(q)
          }, null, 8, ["row", "buttons", "key-name", "onView", "onDelete"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "per-page-options", "loading", "key-name", "route-prefix", "onExport"]),
      l(ee, {
        visible: t(_),
        title: t(T),
        fields: t(V),
        form: t(d),
        loading: t(d).processing,
        "is-edit": t(D),
        errors: t(d).errors,
        "onUpdate:visible": r[2] || (r[2] = (n) => _.value = n),
        onSubmit: t(I),
        onClose: t(N)
      }, null, 8, ["visible", "title", "fields", "form", "loading", "is-edit", "errors", "onSubmit", "onClose"])
    ]));
  }
});
export {
  xe as default
};
