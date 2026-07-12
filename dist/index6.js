import { defineComponent as N, ref as r, computed as P, openBlock as U, createElementBlock as q, createVNode as d, unref as y, createElementVNode as S, toDisplayString as O, withCtx as W } from "vue";
import { usePage as z, router as i } from "@inertiajs/vue3";
import { route as x } from "ziggy-js";
import G from "primevue/button";
import H from "primevue/toast";
import { useToast as J } from "primevue/usetoast";
import K from "./index7.js";
import M from "./index9.js";
import Q from "./index8.js";
const X = { class: "crud-index-page" }, Y = { class: "flex items-center justify-between mb-4" }, Z = { class: "text-2xl font-bold" }, se = /* @__PURE__ */ N({
  __name: "Index",
  props: {
    title: { default: "CRUD Index" },
    column_data: {},
    columns_details: {},
    route_prefix: {},
    crud_buttons: {}
  },
  setup(s) {
    const g = z();
    function p(e) {
      var t;
      return ((t = g.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const o = s, b = J(), l = r(!1);
    i.on("finish", () => {
      const e = g.props.flash;
      e != null && e.success && b.add({ severity: "success", summary: "Success", detail: e.success, life: 5e3 }), e != null && e.error && b.add({ severity: "error", summary: "Error", detail: e.error, life: 5e3 });
    });
    const u = r(!1), v = r(""), _ = r({}), f = r(null), m = r(!1), n = r(!1), c = r(null), F = {
      show: "view",
      edit: "edit",
      destroy: "delete"
    };
    function $(e) {
      return e.event ? e.event : F[e.action] || e.action;
    }
    const C = P(
      () => o.crud_buttons.map((e) => ({
        action: $(e),
        icon: e.icon,
        label: e.label
      }))
    );
    function j(e) {
      return x(e);
    }
    function T(e, t) {
      return x(e, { id: t });
    }
    async function B() {
      const e = o.crud_buttons.find((t) => t.action === "create");
      n.value = !0;
      try {
        const t = e ? j(e.route_name) : `/${o.route_prefix}/create`, h = await (await fetch(t, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = h, v.value = p("crud.button.create"), f.value = null, m.value = !1, c.value = null, u.value = !0;
      } catch (t) {
        console.error("Failed to load create form:", t);
      } finally {
        n.value = !1;
      }
    }
    async function E(e) {
      const t = o.crud_buttons.find((a) => a.action === "edit");
      n.value = !0;
      try {
        const a = t ? T(t.route_name, e) : `/${o.route_prefix}/${e}/edit`, w = await (await fetch(a, {
          headers: { Accept: "application/json" }
        })).json();
        _.value = w.form_details, v.value = p("crud.button.edit"), f.value = w.item, m.value = !0, c.value = e, u.value = !0;
      } catch (a) {
        console.error("Failed to load edit form:", a);
      } finally {
        n.value = !1;
      }
    }
    function I(e) {
      n.value = !0, m.value && c.value !== null ? i.put(`/${o.route_prefix}/${c.value}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      }) : i.post(`/${o.route_prefix}`, e, {
        onFinish: () => {
          n.value = !1, u.value = !1;
        }
      });
    }
    function A() {
      u.value = !1, f.value = null, c.value = null;
    }
    function D(e) {
    }
    function V(e) {
      i.delete(`/${o.route_prefix}/${e}`);
    }
    function R(e) {
      i.get(
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
    function k(e) {
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
          onStart: () => l.value = !0,
          onFinish: () => l.value = !1
        }
      );
    }
    function L(e) {
      i.get(
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
    return (e, t) => (U(), q("div", X, [
      d(y(H)),
      S("div", Y, [
        S("h1", Z, O(s.title), 1),
        d(y(G), {
          label: p("crud.button.create"),
          icon: "pi pi-plus",
          onClick: B
        }, null, 8, ["label"])
      ]),
      d(K, {
        items: s.column_data.data,
        columns: s.columns_details,
        "total-records": s.column_data.total,
        "per-page": s.column_data.per_page,
        loading: l.value,
        onPaginate: R,
        onSort: k,
        onSearch: L
      }, {
        actions: W(({ row: a }) => [
          d(M, {
            row: a,
            buttons: C.value,
            onView: D,
            onEdit: E,
            onDelete: V
          }, null, 8, ["row", "buttons"])
        ]),
        _: 1
      }, 8, ["items", "columns", "total-records", "per-page", "loading"]),
      d(Q, {
        visible: u.value,
        title: v.value,
        fields: _.value,
        data: f.value,
        loading: n.value,
        "is-edit": m.value,
        "onUpdate:visible": t[0] || (t[0] = (a) => u.value = a),
        onSubmit: I,
        onClose: A
      }, null, 8, ["visible", "title", "fields", "data", "loading", "is-edit"])
    ]));
  }
});
export {
  se as default
};
