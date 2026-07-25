import { defineComponent as n, withDirectives as a, openBlock as s, createElementBlock as u, normalizeClass as m, unref as i, isRef as c, vModelDynamic as p } from "vue";
import { useVModel as f } from "@vueuse/core";
import { cn as b } from "./index40.js";
const y = ["id", "type", "placeholder", "required", "disabled"], q = /* @__PURE__ */ n({
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
  setup(e, { emit: d }) {
    const t = e, l = f(t, "modelValue", d);
    return (x, o) => a((s(), u("input", {
      id: e.id,
      "onUpdate:modelValue": o[0] || (o[0] = (r) => c(l) ? l.value = r : null),
      type: e.type,
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      class: m(i(b)(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      ))
    }, null, 10, y)), [
      [p, i(l)]
    ]);
  }
});
export {
  q as default
};
