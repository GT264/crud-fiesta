import { defineComponent as v, computed as _, openBlock as o, createElementBlock as a, Fragment as m, createElementVNode as C, renderList as h, createBlock as k, unref as d, createVNode as w } from "vue";
import { usePage as x } from "@inertiajs/vue3";
import y from "primevue/button";
import B from "primevue/confirmdialog";
import { useConfirm as b } from "primevue/useconfirm";
const j = { class: "flex gap-2 justify-center" }, z = /* @__PURE__ */ v({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(n, { emit: u }) {
    const i = n, c = u, p = x();
    function l(e) {
      var r;
      return ((r = p.props.crudLang) == null ? void 0 : r[e]) ?? e;
    }
    const f = b(), s = _(() => i.row.id ?? Object.values(i.row)[0]), g = (e) => {
      e === "delete" ? f.require({
        message: l("crud.delete_confirm.message"),
        header: l("crud.delete_confirm.header"),
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          c("delete", s.value);
        }
      }) : c(e, s.value);
    };
    return (e, r) => (o(), a(m, null, [
      C("div", j, [
        (o(!0), a(m, null, h(n.buttons, (t) => (o(), k(d(y), {
          key: t.action,
          icon: t.icon,
          label: t.label,
          severity: t.severity,
          size: "small",
          text: "",
          title: t.label,
          onClick: (A) => g(t.action)
        }, null, 8, ["icon", "label", "severity", "title", "onClick"]))), 128))
      ]),
      w(d(B))
    ], 64));
  }
});
export {
  z as default
};
