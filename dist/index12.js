import { defineComponent as k, computed as v, ref as N, openBlock as _, createElementBlock as T, createVNode as l, withCtx as c, createElementVNode as s, createBlock as V, resolveDynamicComponent as $, toDisplayString as r, unref as t, createTextVNode as f } from "vue";
import { EllipsisVertical as D, AlertTriangle as E, Trash2 as j, Pencil as A, Eye as w } from "lucide-vue-next";
import p from "./index15.js";
import B from "./index19.js";
import I from "./index16.js";
import { useCrudTranslation as M } from "./index17.js";
const z = { class: "flex justify-center" }, O = { class: "flex items-center gap-2 w-full" }, P = { class: "action-label-rect" }, S = { class: "flex flex-col gap-4" }, U = { class: "text-lg font-semibold" }, q = { class: "flex items-center gap-3" }, F = { class: "flex justify-end gap-2 mt-4" }, R = /* @__PURE__ */ k({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {},
    keyName: { default: "id" }
  },
  emits: ["view", "edit", "delete"],
  setup(b, { emit: g }) {
    const d = b, u = g, { crudT: n } = M(), m = v(() => d.row[d.keyName] ?? Object.values(d.row)[0]), i = N(!1);
    function x(e) {
      return {
        view: w,
        edit: A,
        delete: j
      }[e] || w;
    }
    function h(e) {
      e === "delete" ? i.value = !0 : e === "view" ? u("view", m.value) : e === "edit" && u("edit", m.value);
    }
    function y() {
      i.value = !1, u("delete", m.value);
    }
    const C = v(
      () => d.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        action: e.action,
        command: () => h(e.action)
      }))
    );
    return (e, o) => (_(), T("div", z, [
      l(I, { items: C.value }, {
        trigger: c(() => [
          l(p, {
            label: t(n)("crud.button.actions"),
            variant: "secondary",
            size: "sm"
          }, {
            default: c(() => [
              l(t(D), { class: "h-4 w-4 mr-1" }),
              f(" " + r(t(n)("crud.button.actions")), 1)
            ]),
            _: 1
          }, 8, ["label"])
        ]),
        item: c(({ item: a }) => [
          s("div", O, [
            (_(), V($(x(a.action)), { class: "h-4 w-4" })),
            s("span", P, r(a.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["items"]),
      l(B, {
        open: i.value,
        "onUpdate:open": o[1] || (o[1] = (a) => i.value = a),
        onClose: o[2] || (o[2] = (a) => i.value = !1)
      }, {
        default: c(() => [
          s("div", S, [
            s("h2", U, r(t(n)("crud.delete_confirm.header")), 1),
            s("div", q, [
              l(t(E), { class: "h-6 w-6 text-yellow-500" }),
              s("span", null, r(t(n)("crud.delete_confirm.message")), 1)
            ]),
            s("div", F, [
              l(p, {
                variant: "secondary",
                onClick: o[0] || (o[0] = (a) => i.value = !1)
              }, {
                default: c(() => [
                  f(r(t(n)("crud.button.cancel")), 1)
                ]),
                _: 1
              }),
              l(p, {
                variant: "destructive",
                onClick: y
              }, {
                default: c(() => [
                  f(r(t(n)("crud.button.delete")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["open"])
    ]));
  }
});
export {
  R as default
};
