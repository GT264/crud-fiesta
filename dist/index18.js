import { defineComponent as s, withDirectives as i, openBlock as n, createElementBlock as m, normalizeClass as u, unref as o, isRef as c, vModelText as f } from "vue";
import { useVModel as p } from "@vueuse/core";
import { cn as x, textareaClasses as V } from "./index27.js";
const h = ["id", "placeholder", "required", "disabled", "rows"], C = /* @__PURE__ */ s({
  __name: "Textarea",
  props: {
    id: {},
    modelValue: {},
    placeholder: {},
    required: { type: Boolean },
    disabled: { type: Boolean },
    rows: { default: 4 },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: d }) {
    const a = e, l = p(a, "modelValue", d);
    return (b, t) => i((n(), m("textarea", {
      id: e.id,
      "onUpdate:modelValue": t[0] || (t[0] = (r) => c(l) ? l.value = r : null),
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      rows: e.rows,
      class: u(o(x)(o(V), a.class))
    }, null, 10, h)), [
      [f, o(l)]
    ]);
  }
});
export {
  C as default
};
