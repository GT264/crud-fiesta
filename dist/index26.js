import { defineComponent as d, resolveDirective as n, withDirectives as m, openBlock as u, createElementBlock as c, normalizeClass as p, unref as t, isRef as f, vModelText as k } from "vue";
import { useVModel as v } from "@vueuse/core";
import { cn as V, inputClasses as h } from "./index27.js";
const q = ["id", "placeholder", "required"], w = /* @__PURE__ */ d({
  __name: "MaskedInput",
  props: {
    id: {},
    modelValue: {},
    placeholder: {},
    required: { type: Boolean },
    mask: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: i }) {
    const o = e, l = v(o, "modelValue", i);
    return (B, a) => {
      const s = n("maska");
      return m((u(), c("input", {
        id: e.id,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => f(l) ? l.value = r : null),
        placeholder: e.placeholder,
        required: e.required,
        class: p(t(V)(t(h), o.class))
      }, null, 10, q)), [
        [k, t(l)],
        [s, e.mask]
      ]);
    };
  }
});
export {
  w as default
};
