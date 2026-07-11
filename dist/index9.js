import { defineComponent as x, ref as B, computed as c, openBlock as u, createElementBlock as v, createBlock as N, unref as i, withCtx as a, createTextVNode as V, toDisplayString as z, createElementVNode as p, normalizeClass as T, createVNode as m, createCommentVNode as j } from "vue";
import { usePage as A } from "@inertiajs/vue3";
import b from "primevue/button";
import D from "primevue/menu";
import E from "primevue/confirmdialog";
import { useConfirm as I } from "primevue/useconfirm";
const M = { class: "flex gap-2 justify-center" }, S = {
  key: 1,
  class: "relative"
}, H = /* @__PURE__ */ x({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(t, { emit: g }) {
    const n = t, l = g, y = A();
    function r(e) {
      var o;
      return ((o = y.props.crudLang) == null ? void 0 : o[e]) ?? e;
    }
    const w = I(), d = B(), s = c(() => n.row.id ?? Object.values(n.row)[0]), C = c(() => n.buttons.some((e) => e.action === "delete") ? "danger" : "secondary"), h = c(
      () => n.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        command: () => f(e.action)
      }))
    );
    function k(e) {
      d.value.toggle(e);
    }
    const f = (e) => {
      e === "delete" ? w.require({
        message: r("crud.delete_confirm.message"),
        header: r("crud.delete_confirm.header"),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          l("delete", s.value);
        }
      }) : e === "view" ? l("view", s.value) : e === "edit" && l("edit", s.value);
    };
    return (e, o) => (u(), v("div", M, [
      t.buttons.length === 1 ? (u(), N(i(b), {
        key: 0,
        severity: t.buttons[0].severity,
        size: "small",
        outlined: "",
        title: t.buttons[0].label,
        onClick: o[0] || (o[0] = (q) => f(t.buttons[0].action))
      }, {
        icon: a(() => [
          p("i", {
            class: T(t.buttons[0].icon)
          }, null, 2)
        ]),
        default: a(() => [
          V(" " + z(t.buttons[0].label), 1)
        ]),
        _: 1
      }, 8, ["severity", "title"])) : t.buttons.length > 1 ? (u(), v("div", S, [
        m(i(b), {
          label: r("crud.button.actions"),
          "icon-pos": "right",
          severity: C.value,
          size: "small",
          outlined: "",
          onClick: k
        }, {
          icon: a(() => [...o[1] || (o[1] = [
            p("i", { class: "pi pi-chevron-down" }, null, -1)
          ])]),
          _: 1
        }, 8, ["label", "severity"]),
        m(i(D), {
          ref_key: "menu",
          ref: d,
          model: h.value,
          popup: !0
        }, null, 8, ["model"])
      ])) : j("", !0),
      m(i(E), { appendTo: "body" })
    ]));
  }
});
export {
  H as default
};
