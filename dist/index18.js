import { defineComponent as a, withDirectives as s, openBlock as n, createElementBlock as u, normalizeClass as m, unref as r, isRef as c, vModelText as p } from "vue";
import { useVModel as f } from "@vueuse/core";
import { cn as b } from "./index39.js";
const x = ["id", "placeholder", "required", "disabled", "rows"], q = /* @__PURE__ */ a({
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
  setup(e, { emit: t }) {
    const o = e, l = f(o, "modelValue", t);
    return (w, d) => s((n(), u("textarea", {
      id: e.id,
      "onUpdate:modelValue": d[0] || (d[0] = (i) => c(l) ? l.value = i : null),
      placeholder: e.placeholder,
      required: e.required,
      disabled: e.disabled,
      rows: e.rows,
      class: m(r(b)(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        o.class
      ))
    }, null, 10, x)), [
      [p, r(l)]
    ]);
  }
});
export {
  q as default
};
