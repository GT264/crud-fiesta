import { defineComponent as n, withDirectives as s, openBlock as r, createElementBlock as u, normalizeClass as m, unref as t, isRef as c, vModelDynamic as p } from "vue";
import { useVModel as f } from "@vueuse/core";
import { cn as y, inputClasses as V } from "./index27.js";
const h = ["id", "type", "placeholder", "required", "disabled"], C = /* @__PURE__ */ n({
  __name: "Input",
  props: {
    id: {},
    type: { default: "text" },
    modelValue: {},
    placeholder: {},
    required: { type: Boolean },
    disabled: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: a }) {
    const d = e, l = f(d, "modelValue", a);
    return (q, o) => s((r(), u("input", {
      id: e.id,
      "onUpdate:modelValue": o[0] || (o[0] = (i) => c(l) ? l.value = i : null),
      type: e.type,
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      class: m(t(y)(t(V), d.class))
    }, null, 10, h)), [
      [p, t(l)]
    ]);
  }
});
export {
  C as default
};
