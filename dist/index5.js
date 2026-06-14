import { defineComponent as D, ref as n, computed as F, openBlock as v, createElementBlock as N, createElementVNode as p, toDisplayString as P, createBlock as T, unref as g, createCommentVNode as R, createVNode as r, withCtx as _ } from "vue";
import { useToast as j } from "primevue/usetoast";
import q from "primevue/button";
import I from "primevue/toast";
import L from "./index6.js";
import M from "./index7.js";
import U from "./index8.js";
const z = { class: "p-6" }, A = { class: "flex justify-between items-center mb-6" }, G = { class: "text-3xl font-bold" }, Y = /* @__PURE__ */ D({
  __name: "Index",
  props: {
    title: {},
    items: {},
    columns: {},
    totalRecords: {},
    crudButtons: {},
    formFields: {},
    perPage: { default: 25 },
    canCreate: { type: Boolean, default: !0 },
    canEdit: { type: Boolean, default: !0 },
    canDelete: { type: Boolean, default: !0 },
    canView: { type: Boolean, default: !0 }
  },
  emits: ["create", "store", "edit", "update", "delete", "view", "search", "paginate"],
  setup(t, { expose: y, emit: b }) {
    const d = t, o = b, m = j(), w = n(!1), s = n(!1), u = n(!1), a = n(!1), l = n(null), B = F(
      () => a.value ? `Modifica ${d.title}` : `Crea ${d.title}`
    ), C = (e) => {
      o("paginate", e.page + 1, e.rows);
    }, h = (e) => {
    }, x = (e) => {
      o("search", e.query);
    }, E = () => {
      a.value = !1, l.value = null, s.value = !0, o("create");
    }, S = (e) => {
      a.value = !0, l.value = { id: e }, s.value = !0, o("edit", e);
    }, V = (e) => o("view", e), k = (e) => o("delete", e), $ = (e) => {
      var i;
      u.value = !0;
      try {
        a.value && ((i = l.value) != null && i.id) ? o("update", l.value.id, e) : o("store", e), f();
      } finally {
        u.value = !1;
      }
    }, f = () => {
      s.value = !1, l.value = null, a.value = !1;
    };
    return y({
      showSuccess: (e) => {
        m.add({ severity: "success", summary: "Successo", detail: e, life: 3e3 });
      },
      showError: (e) => {
        m.add({ severity: "error", summary: "Errore", detail: e, life: 3e3 });
      }
    }), (e, i) => (v(), N("div", z, [
      p("div", A, [
        p("h1", G, P(t.title), 1),
        t.canCreate ? (v(), T(g(q), {
          key: 0,
          icon: "pi pi-plus",
          label: "Crea",
          onClick: E
        })) : R("", !0)
      ]),
      r(L, {
        items: t.items,
        columns: t.columns,
        "total-records": t.totalRecords,
        "per-page": t.perPage,
        loading: w.value,
        onPaginate: C,
        onSort: h,
        onSearch: x
      }, {
        actions: _(({ row: c }) => [
          r(U, {
            row: c,
            buttons: t.crudButtons,
            onView: V,
            onEdit: S,
            onDelete: k
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      r(M, {
        visible: s.value,
        "onUpdate:visible": i[0] || (i[0] = (c) => s.value = c),
        title: B.value,
        fields: t.formFields,
        data: l.value,
        loading: u.value,
        "is-edit": a.value,
        onSubmit: $,
        onClose: f
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"]),
      r(g(I))
    ]));
  }
});
export {
  Y as default
};
