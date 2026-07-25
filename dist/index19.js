import { defineComponent as t, withDirectives as n, openBlock as a, createElementBlock as u, normalizeClass as c, unref as d, isRef as m, vModelCheckbox as p } from "vue";
import { useVModel as b } from "@vueuse/core";
import { cn as f } from "./index40.js";
const h = ["id", "required", "disabled"], B = /* @__PURE__ */ t({
  __name: "Checkbox",
  props: {
    id: {},
    modelValue: { type: Boolean },
    required: { type: Boolean },
    disabled: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: r }) {
    const i = e, o = b(i, "modelValue", r);
    return (v, l) => n((a(), u("input", {
      id: e.id,
      "onUpdate:modelValue": l[0] || (l[0] = (s) => m(o) ? o.value = s : null),
      type: "checkbox",
      required: e.required,
      disabled: e.disabled,
      class: c(d(f)(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        i.class
      ))
    }, null, 10, h)), [
      [p, d(o)]
    ]);
  }
});
export {
  B as default
};
