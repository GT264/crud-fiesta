import { defineComponent as V, computed as s, watch as k, openBlock as i, createElementBlock as x, createVNode as _, unref as u, withCtx as m, createTextVNode as r, toDisplayString as y, createBlock as B, createCommentVNode as b } from "vue";
import { useFileDialog as h } from "@vueuse/core";
import p from "./index16.js";
const F = { class: "flex items-center gap-2" }, z = /* @__PURE__ */ V({
  __name: "FileInput",
  props: {
    modelValue: {},
    accept: { default: "*/*" },
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(c, { emit: d }) {
    const o = c, a = d, { files: l, open: f, reset: v } = h({ accept: o.accept, multiple: !1 }), t = s(() => l.value && l.value.length > 0 ? l.value[0] : null), g = s(() => t.value ? t.value.name : o.accept.startsWith("image/") ? "Choose image..." : "Choose file...");
    return k(t, (n) => {
      a("update:modelValue", n);
    }), (n, e) => (i(), x("div", F, [
      _(p, {
        variant: "outline",
        size: "sm",
        type: "button",
        onClick: e[0] || (e[0] = (C) => u(f)())
      }, {
        default: m(() => [
          r(y(g.value), 1)
        ]),
        _: 1
      }),
      t.value ? (i(), B(p, {
        key: 0,
        variant: "ghost",
        size: "sm",
        type: "button",
        class: "text-destructive",
        onClick: e[1] || (e[1] = (C) => {
          u(v)(), a("update:modelValue", null);
        })
      }, {
        default: m(() => [...e[2] || (e[2] = [
          r("Remove", -1)
        ])]),
        _: 1
      })) : b("", !0)
    ]));
  }
});
export {
  z as default
};
