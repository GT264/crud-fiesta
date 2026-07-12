import { defineComponent as P, ref as r, watch as y, computed as U, openBlock as q, createElementBlock as O, createVNode as d, unref as S, createElementVNode as x, toDisplayString as W, withCtx as z } from "vue";
import { usePage as G, router as s } from "@inertiajs/vue3";
import { route as F } from "ziggy-js";
import H from "primevue/button";
import J from "primevue/toast";
import { useToast as K } from "primevue/usetoast";
import M from "./index7.js";
import Q from "./index9.js";
import X from "./index8.js";
const Y = { class: "crud-index-page" }, Z = { class: "flex items-center justify-between mb-4" }, ee = { class: "text-2xl font-bold" }, ce = /* @__PURE__ */ P({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(i) {
    const p = G();
    function v(e) {
      var t;
      return ((t = p.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const o = i, h = K(), l = r(!1);
    y(
      () => {
        var e;
        return (e = p.props.flash) == null ? void 0 : e.success;
      },
      (e) => {
        e && h.add({ severity: "success", summary: "Success", detail: e, life: 5e3 });
      },
      { immediate: !0 }
    ), y(
      () => {
        var e;
        return (e = p.props.flash) == null ? void 0 : e.error;
      },
      (e) => {
        e && h.add({ severity: "error", summary: "Error", detail: e, life: 5e3 });
      },
      { immediate: !0 }
    );
    const u = r(!1), _ = r(""), g = r({}), f = r(null), m = r(!1), n = r(!1), c = r(null), $ = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function C(e) {
      return e.event ? e.event : $[e.action] || e.action;
    }
    const j = U(
      () => o.crud_buttons.map((e) => ({
        action: C(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function T(e) {
      return F(e);
    }
    function B(e, t) {
      return F(e, { id: t });
    }
    async function E() {
      const e = o.crud_buttons.find((t) => t.action === "create");
      n.value = !0;
      try {
        const t = e ? T(e.route_name) : `/${o.route_prefix}/create`, b = await (await fetch(t, {
          headers: { Accept: "application/json" }
        })).json();
        g.value = b, _.value = v("crud.button.create"), f.value = null, m.value = !1, c.value = null, u.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        n.value = !1;
      }
    }
    async function I(e) {
      const t = o.crud_buttons.find((a) => a.action === "edit");
      n.value = !0;
      try {
        const a = t ? B(t.route_name, e) : `/${o.route_prefix}/${e}/edit`, w = await (await fetch(a, {
          headers: { Accept: "application/json" }
        })).json();
        g.value = w.form_details, _.value = v("crud.button.edit"), f.value = w.item, m.value = !0, c.value = e, u.value = !0;
      } catch (a) {
        console.error("Failed to load edit form:", a);
      } finally {
        n.value = !1;
      }
    }
    function A(e) {
      n.value = !0, m.value && c.value !== null ? s.put(`/${o.route_prefix}/${c.value}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      }) : s.post(`/${o.route_prefix}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      });
    }
    function D() {
      u.value = !1, f.value = null, c.value = null;
    }
    function V(e) {
    }
    function R(e) {
      s.delete(`/${o.route_prefix}/${e}`);
    }
    function k(e) {
      s.get(
        window.location.pathname,
        { page: e.page + 1, per_page: e.rows },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          onStart: () => l.value = !0,
          onFinish: () => l.value = !1
        }
      );
    }
    function L(e) {
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
          onStart: () => l.value = !0,
          onFinish: () => l.value = !1
        }
      );
    }
    function N(e) {
      s.get(
        window.location.pathname,
        { search: e.query },
        {
          preserveState: !0,
          preserveScroll: !0,
          only: ["column_data"],
          replace: !0,
          onStart: () => l.value = !0,
          onFinish: () => l.value = !1
        }
      );
    }
    return (e, t) => (q(), O("div", Y, [
      d(S(J)),
      x("div", Z, [
        x("h1", ee, W(i.title), 1),
        d(S(H), {
          label: v("crud.button.create"),
          icon: "pi pi-plus",
          onClick: E
        }, null, 8, ["label"])
      ]),
      d(M, {
        items: i.column_data.data,
        columns: i.columns_details,
        "total-records": i.column_data.total,
        "per-page": i.column_data.per_page,
        loading: l.value,
        onPaginate: k,
        onSort: L,
        onSearch: N
      }, {
        actions: z(({ row: a }) => [
          d(Q, {
            row: a,
            buttons: j.value,
            onView: V,
            onEdit: I,
            onDelete: R
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      d(X, {
        visible: u.value,
        title: _.value,
        fields: g.value,
        data: f.value,
        loading: n.value,
        "is-edit": m.value,
        "onUpdate:visible": t[0] || (t[0] = (a) => u.value = a),
        onSubmit: A,
        onClose: D
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  ce as default
};
