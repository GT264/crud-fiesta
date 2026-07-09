import { defineComponent as C, ref as w, computed as r, openBlock as c, createElementBlock as f, createBlock as x, unref as i, createVNode as s, createCommentVNode as B } from "vue";
import { usePage as j } from "@inertiajs/vue3";
import b from "primevue/button";
import z from "primevue/menu";
import A from "primevue/confirmdialog";
import { useConfirm as I } from "primevue/useconfirm";
const M = { class: "flex gap-2 justify-center" }, N = {
  key: 1,
  class: "relative"
}, S = /* @__PURE__ */ C({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(t, { emit: v }) {
    const n = t, u = v, g = j();
    function l(e) {
      var o;
      return ((o = g.props.crudLang) == null ? void 0 : o[e]) ?? e;
    }
    const p = I(), a = w(), m = r(() => n.row.id ?? Object.values(n.row)[0]), y = r(() => n.buttons.some((e) => e.action === "delete") ? "danger" : "secondary"), h = r(
      () => n.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        command: () => d(e.action)
      }))
    );
    function k(e) {
      a.value.toggle(e);
    }
    const d = (e) => {
      e === "delete" ? p.require({
        message: l("crud.delete_confirm.message"),
        header: l("crud.delete_confirm.header"),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          u("delete", m.value);
        }
      }) : u(e, m.value);
    };
    return (e, o) => (c(), f("div", M, [
      t.buttons.length === 1 ? (c(), x(i(b), {
        key: 0,
        icon: t.buttons[0].icon,
        label: t.buttons[0].label,
        severity: t.buttons[0].severity,
        size: "small",
        outlined: "",
        title: t.buttons[0].label,
        onClick: o[0] || (o[0] = (V) => d(t.buttons[0].action))
      }, null, 8, ["icon", "label", "severity", "title"])) : t.buttons.length > 1 ? (c(), f("div", N, [
        s(i(b), {
          label: l("crud.button.actions"),
          icon: "pi pi-chevron-down",
          "icon-pos": "right",
          severity: y.value,
          size: "small",
          outlined: "",
          onClick: k
        }, null, 8, ["label", "severity"]),
        s(i(z), {
          ref_key: "menu",
          ref: a,
          model: h.value,
          popup: !0
        }, null, 8, ["model"])
      ])) : B("", !0),
      s(i(A))
    ]));
  }
});
export {
  S as default
};
