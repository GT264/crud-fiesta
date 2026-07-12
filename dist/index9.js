import { defineComponent as k, computed as x, ref as _, openBlock as u, createElementBlock as p, Fragment as B, renderList as D, createBlock as V, unref as r, withCtx as n, createTextVNode as h, toDisplayString as g, createElementVNode as s, normalizeClass as z, createVNode as c } from "vue";
import { usePage as N } from "@inertiajs/vue3";
import m from "primevue/button";
import j from "primevue/dialog";
const A = { class: "flex gap-2 justify-center" }, E = { class: "flex items-center gap-3" }, O = /* @__PURE__ */ k({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(f, { emit: y }) {
    const v = f, a = y, w = N();
    function o(l) {
      var t;
      return ((t = w.props.crudLang) == null ? void 0 : t[l]) ?? l;
    }
    const d = x(() => v.row.id ?? Object.values(v.row)[0]), i = _(!1), b = (l) => {
      l === "delete" ? i.value = !0 : l === "view" ? a("view", d.value) : l === "edit" && a("edit", d.value);
    };
    function C() {
      i.value = !1, a("delete", d.value);
    }
    return (l, t) => (u(), p("div", A, [
      (u(!0), p(B, null, D(f.buttons, (e) => (u(), V(r(m), {
        key: e.action,
        severity: e.action === "delete" ? "danger" : e.severity ?? "secondary",
        size: "small",
        outlined: "",
        title: e.label,
        onClick: (L) => b(e.action)
      }, {
        icon: n(() => [
          s("i", {
            class: z(e.icon)
          }, null, 2)
        ]),
        default: n(() => [
          h(" " + g(e.label), 1)
        ]),
        _: 2
      }, 1032, ["severity", "title", "onClick"]))), 128)),
      c(r(j), {
        visible: i.value,
        "onUpdate:visible": t[1] || (t[1] = (e) => i.value = e),
        header: o("crud.delete_confirm.header"),
        modal: !0,
        style: { width: "25rem" }
      }, {
        footer: n(() => [
          c(r(m), {
            label: o("crud.button.cancel"),
            severity: "secondary",
            outlined: "",
            onClick: t[0] || (t[0] = (e) => i.value = !1)
          }, null, 8, ["label"]),
          c(r(m), {
            label: o("crud.button.delete"),
            severity: "danger",
            onClick: C
          }, null, 8, ["label"])
        ]),
        default: n(() => [
          s("div", E, [
            t[2] || (t[2] = s("i", {
              class: "pi pi-exclamation-triangle",
              style: { "font-size": "1.5rem", color: "var(--p-yellow-500)" }
            }, null, -1)),
            s("span", null, g(o("crud.delete_confirm.message")), 1)
          ])
        ]),
        _: 1
      }, 8, ["visible", "header"])
    ]));
  }
});
export {
  O as default
};
