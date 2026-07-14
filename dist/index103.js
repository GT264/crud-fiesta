import { defineComponent as k, computed as p, ref as v, openBlock as D, createElementBlock as z, createVNode as s, unref as a, withCtx as d, createElementVNode as t, normalizeClass as B, toDisplayString as b } from "vue";
import { usePage as V } from "@inertiajs/vue3";
import m from "primevue/button";
import j from "primevue/dialog";
import A from "primevue/menu";
const E = { class: "flex justify-center" }, I = { class: "flex items-center gap-2 w-full" }, M = { class: "action-label-rect" }, N = { class: "flex items-center gap-3" }, T = /* @__PURE__ */ k({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(g, { emit: _ }) {
    const r = g, u = _, w = V();
    function o(e) {
      var l;
      return ((l = w.props.crudLang) == null ? void 0 : l[e]) ?? e;
    }
    const c = p(() => r.row.id ?? Object.values(r.row)[0]), n = v(!1), f = v(null);
    function y(e) {
      var l;
      (l = f.value) == null || l.toggle(e);
    }
    function x(e) {
      e === "delete" ? n.value = !0 : e === "view" ? u("view", c.value) : e === "edit" && u("edit", c.value);
    }
    function C() {
      n.value = !1, u("delete", c.value);
    }
    const h = p(
      () => r.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        action: e.action,
        command: () => x(e.action)
      }))
    );
    return (e, l) => (D(), z("div", E, [
      s(a(m), {
        label: o("crud.button.actions"),
        icon: "pi pi-ellipsis-v",
        severity: "secondary",
        size: "small",
        outlined: "",
        onClick: y
      }, null, 8, ["label"]),
      s(a(A), {
        ref_key: "menuRef",
        ref: f,
        model: h.value,
        popup: !0
      }, {
        item: d(({ item: i }) => [
          t("div", I, [
            t("i", {
              class: B(i.icon)
            }, null, 2),
            t("span", M, b(i.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["model"]),
      s(a(j), {
        visible: n.value,
        "onUpdate:visible": l[1] || (l[1] = (i) => n.value = i),
        header: o("crud.delete_confirm.header"),
        modal: !0,
        style: { width: "25rem" }
      }, {
        footer: d(() => [
          s(a(m), {
            label: o("crud.button.cancel"),
            severity: "secondary",
            outlined: "",
            onClick: l[0] || (l[0] = (i) => n.value = !1)
          }, null, 8, ["label"]),
          s(a(m), {
            label: o("crud.button.delete"),
            severity: "danger",
            onClick: C
          }, null, 8, ["label"])
        ]),
        default: d(() => [
          t("div", N, [
            l[2] || (l[2] = t("i", {
              class: "pi pi-exclamation-triangle",
              style: { "font-size": "1.5rem", color: "var(--p-yellow-500)" }
            }, null, -1)),
            t("span", null, b(o("crud.delete_confirm.message")), 1)
          ])
        ]),
        _: 1
      }, 8, ["visible", "header"])
    ]));
  }
});
export {
  T as default
};
