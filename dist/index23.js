import { defineComponent as r, withDirectives as s, openBlock as n, createElementBlock as u, normalizeClass as m, unref as d, isRef as c, vModelText as p } from "vue";
import { useVModel as f } from "@vueuse/core";
import { cn as V, inputClasses as h } from "./index27.js";
const b = ["id", "placeholder", "required", "disabled"], y = /* @__PURE__ */ r({
  __name: "Calendar",
  props: {
    id: {},
    modelValue: {},
    placeholder: {},
    required: { type: Boolean },
    disabled: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: a }) {
    const o = e, l = f(o, "modelValue", a);
    return (B, t) => s((n(), u("input", {
      id: e.id,
      "onUpdate:modelValue": t[0] || (t[0] = (i) => c(l) ? l.value = i : null),
      type: "date",
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      class: m(d(V)(d(h), o.class))
    }, null, 10, b)), [
      [p, d(l)]
    ]);
  }
});
export {
  y as default
};
