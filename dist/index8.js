import { defineComponent as f, computed as p, openBlock as o, createElementBlock as c, Fragment as s, createElementVNode as v, renderList as C, createBlock as k, unref as a, createVNode as _ } from "vue";
import g from "primevue/button";
import w from "primevue/confirmdialog";
import { useConfirm as x } from "primevue/useconfirm";
const y = { class: "flex gap-2 justify-center" }, E = /* @__PURE__ */ f({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(i, { emit: m }) {
    const r = i, l = m, d = x(), n = p(() => r.row.id ?? Object.values(r.row)[0]), u = (t) => {
      t === "delete" ? d.require({
        message: "Sei sicuro di voler eliminare questo elemento?",
        header: "Conferma",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          l("delete", n.value);
        }
      }) : l(t, n.value);
    };
    return (t, h) => (o(), c(s, null, [
      v("div", y, [
        (o(!0), c(s, null, C(i.buttons, (e) => (o(), k(a(g), {
          key: e.action,
          icon: e.icon,
          label: e.label,
          severity: e.severity,
          size: "small",
          text: "",
          title: e.label,
          onClick: (B) => u(e.action)
        }, null, 8, ["icon", "label", "severity", "title", "onClick"]))), 128))
      ]),
      _(a(w))
    ], 64));
  }
});
export {
  E as default
};
