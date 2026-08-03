import { defineComponent as a, withDirectives as n, openBlock as s, createElementBlock as u, normalizeClass as m, unref as t, isRef as c, vModelText as p } from "vue";
import { useVModel as f } from "@vueuse/core";
import { cn as b } from "./index40.js";
const h = ["id", "placeholder", "required", "disabled"], q = /* @__PURE__ */ a({
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
  setup(e, { emit: i }) {
    const o = e, l = f(o, "modelValue", i);
    return (g, d) => n((s(), u("input", {
      id: e.id,
      "onUpdate:modelValue": d[0] || (d[0] = (r) => c(l) ? l.value = r : null),
      type: "date",
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      class: m(t(b)(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        o.class
      ))
    }, null, 10, h)), [
      [p, t(l)]
    ]);
  }
});
export {
  q as default
};
