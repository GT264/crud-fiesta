import { defineComponent as p, computed as v, openBlock as r, createElementBlock as c, Fragment as s, createElementVNode as _, renderList as g, createBlock as k, unref as a, createVNode as C } from "vue";
import h from "primevue/button";
import w from "primevue/confirmdialog";
import { useConfirm as x } from "primevue/useconfirm";
import { trans as m } from "laravel-vue-i18n";
const y = { class: "flex gap-2 justify-center" }, q = /* @__PURE__ */ p({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(o, { emit: d }) {
    const i = o, n = d, u = x(), l = v(() => i.row.id ?? Object.values(i.row)[0]), f = (t) => {
      t === "delete" ? u.require({
        message: m("crud.delete_confirm.message"),
        header: m("crud.delete_confirm.header"),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          n("delete", l.value);
        }
      }) : n(t, l.value);
    };
    return (t, B) => (r(), c(s, null, [
      _("div", y, [
        (r(!0), c(s, null, g(o.buttons, (e) => (r(), k(a(h), {
          key: e.action,
          icon: e.icon,
          label: e.label,
          severity: e.severity,
          size: "small",
          text: "",
          title: e.label,
          onClick: (b) => f(e.action)
        }, null, 8, ["icon", "label", "severity", "title", "onClick"]))), 128))
      ]),
      C(a(w))
    ], 64));
  }
});
export {
  q as default
};
