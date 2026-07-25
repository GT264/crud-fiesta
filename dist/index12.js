import { defineComponent as $, computed as p, ref as k, openBlock as v, createElementBlock as D, createVNode as o, withCtx as a, createElementVNode as n, createBlock as E, resolveDynamicComponent as T, toDisplayString as c, unref as _, createTextVNode as m } from "vue";
import { usePage as j } from "@inertiajs/vue3";
import { EllipsisVertical as A, AlertTriangle as B, Trash2 as I, Pencil as N, Eye as g } from "lucide-vue-next";
import f from "./index15.js";
import M from "./index16.js";
import P from "./index26.js";
const z = { class: "flex justify-center" }, L = { class: "flex items-center gap-2 w-full" }, O = { class: "action-label-rect" }, S = { class: "flex flex-col gap-4" }, U = { class: "text-lg font-semibold" }, q = { class: "flex items-center gap-3" }, F = { class: "flex justify-end gap-2 mt-4" }, W = /* @__PURE__ */ $({
  __name: "CrudActions",
  props: {
    row: {},
    buttons: {}
  },
  emits: ["view", "edit", "delete"],
  setup(w, { emit: b }) {
    const r = w, d = b, x = j();
    function s(e) {
      var t;
      return ((t = x.props.crudLang) == null ? void 0 : t[e]) ?? e;
    }
    const u = p(() => r.row.id ?? Object.values(r.row)[0]), l = k(!1);
    function h(e) {
      return {
        view: g,
        edit: N,
        delete: I
      }[e] || g;
    }
    function y(e) {
      e === "delete" ? l.value = !0 : e === "view" ? d("view", u.value) : e === "edit" && d("edit", u.value);
    }
    function C() {
      l.value = !1, d("delete", u.value);
    }
    const V = p(
      () => r.buttons.map((e) => ({
        label: e.label,
        icon: e.icon,
        action: e.action,
        command: () => y(e.action)
      }))
    );
    return (e, t) => (v(), D("div", z, [
      o(P, { items: V.value }, {
        trigger: a(() => [
          o(f, {
            label: s("crud.button.actions"),
            variant: "secondary",
            size: "sm"
          }, {
            default: a(() => [
              o(_(A), { class: "h-4 w-4 mr-1" }),
              m(" " + c(s("crud.button.actions")), 1)
            ]),
            _: 1
          }, 8, ["label"])
        ]),
        item: a(({ item: i }) => [
          n("div", L, [
            (v(), E(T(h(i.action)), { class: "h-4 w-4" })),
            n("span", O, c(i.label), 1)
          ])
        ]),
        _: 1
      }, 8, ["items"]),
      o(M, {
        open: l.value,
        "onUpdate:open": t[1] || (t[1] = (i) => l.value = i),
        onClose: t[2] || (t[2] = (i) => l.value = !1)
      }, {
        default: a(() => [
          n("div", S, [
            n("h2", U, c(s("crud.delete_confirm.header")), 1),
            n("div", q, [
              o(_(B), { class: "h-6 w-6 text-yellow-500" }),
              n("span", null, c(s("crud.delete_confirm.message")), 1)
            ]),
            n("div", F, [
              o(f, {
                variant: "secondary",
                onClick: t[0] || (t[0] = (i) => l.value = !1)
              }, {
                default: a(() => [
                  m(c(s("crud.button.cancel")), 1)
                ]),
                _: 1
              }),
              o(f, {
                variant: "destructive",
                onClick: C
              }, {
                default: a(() => [
                  m(c(s("crud.button.delete")), 1)
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
