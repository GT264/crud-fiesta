import { defineComponent as C, computed as a, openBlock as n, createElementBlock as k, createVNode as x, unref as s, withCtx as i, createTextVNode as u, toDisplayString as V, createBlock as _, createCommentVNode as y } from "vue";
import { useFileDialog as B } from "@vueuse/core";
import r from "./index15.js";
const b = { class: "flex items-center gap-2" }, z = /* @__PURE__ */ C({
  __name: "FileInput",
  props: {
    modelValue: {},
    accept: { default: "*/*" },
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(m, { emit: p }) {
    const l = m, c = p, { files: t, open: d, reset: f } = B({ accept: l.accept, multiple: !1 }), o = a(() => t.value && t.value.length > 0 ? t.value[0] : null), v = a(() => o.value ? o.value.name : l.accept.startsWith("image/") ? "Choose image..." : "Choose file...");
    return (F, e) => (n(), k("div", b, [
      x(r, {
        variant: "outline",
        size: "sm",
        type: "button",
        onClick: e[0] || (e[0] = (g) => s(d)())
      }, {
        default: i(() => [
          u(V(v.value), 1)
        ]),
        _: 1
      }),
      o.value ? (n(), _(r, {
        key: 0,
        variant: "ghost",
        size: "sm",
        type: "button",
        class: "text-destructive",
        onClick: e[1] || (e[1] = (g) => {
          s(f)(), c("update:modelValue", null);
        })
      }, {
        default: i(() => [...e[2] || (e[2] = [
          u("Remove", -1)
        ])]),
        _: 1
      })) : y("", !0)
    ]));
  }
});
export {
  z as default
};
