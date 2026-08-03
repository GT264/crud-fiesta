import { defineComponent as N, computed as p, ref as V, openBlock as v, createElementBlock as $, createVNode as o, withCtx as a, createElementVNode as n, createBlock as D, resolveDynamicComponent as E, toDisplayString as c, unref as _, createTextVNode as m } from "vue";
import { usePage as T } from "@inertiajs/vue3";
import { EllipsisVertical as j, AlertTriangle as A, Trash2 as B, Pencil as I, Eye as g } from "lucide-vue-next";
import f from "./index15.js";
import M from "./index17.js";
import P from "./index16.js";
const z = { class: "flex justify-center" }, L = { class: "flex items-center gap-2 w-full" }, O = { class: "action-label-rect" }, S = { class: "flex flex-col gap-4" }, U = { class: "text-lg font-semibold" }, q = { class: "flex items-center gap-3" }, F = { class: "flex justify-end gap-2 mt-4" }, W = /* @__PURE__ */ N({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {},
    keyName: { default: "id" }
  },
  emits: ["view", "edit", "delete"],
  setup(w, { emit: b }) {
    const r = w, d = b, x = T();
    function l(e) {
      var t;
      return ((t = x.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const u = p(() => r.row[r.keyName] ?? Object.values(r.row)[0]), s = V(!1);
    function h(e) {
      return {
        view: g,
        edit: I,
        delete: B
      }[e] || g;
    }
    function y(e) {
      e === "delete" ? s.value = !0 : e === "view" ? d("view", u.value) : e === "edit" && d("edit", u.value);
    }
    function C() {
      s.value = !1, d("delete", u.value);
    }
    const k = p(
      () => r.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        action: e.action,
        command: () => y(e.action)
      }))
    );
    return (e, t) => (v(), $("div", z, [
      o(P, { items: k.value }, {
        trigger: a(() => [
          o(f, {
            label: l("crud.button.actions"),
            variant: "secondary",
            size: "sm"
          }, {
            default: a(() => [
              o(_(j), { class: "h-4 w-4 mr-1" }),
              m(" " + c(l("crud.button.actions")), 1)
            ]),
            _: 1
          }, 8, ["label"])
        ]),
        item: a(({ item: i }) => [
          n("div", L, [
            (v(), D(E(h(i.action)), { class: "h-4 w-4" })),
            n("span", O, c(i.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["items"]),
      o(M, {
        open: s.value,
        "onUpdate:open": t[1] || (t[1] = (i) => s.value = i),
        onClose: t[2] || (t[2] = (i) => s.value = !1)
      }, {
        default: a(() => [
          n("div", S, [
            n("h2", U, c(l("crud.delete_confirm.header")), 1),
            n("div", q, [
              o(_(A), { class: "h-6 w-6 text-yellow-500" }),
              n("span", null, c(l("crud.delete_confirm.message")), 1)
            ]),
            n("div", F, [
              o(f, {
                variant: "secondary",
                onClick: t[0] || (t[0] = (i) => s.value = !1)
              }, {
                default: a(() => [
                  m(c(l("crud.button.cancel")), 1)
                ]),
                _: 1
              }),
              o(f, {
                variant: "destructive",
                onClick: C
              }, {
                default: a(() => [
                  m(c(l("crud.button.delete")), 1)
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
  W as default
};
