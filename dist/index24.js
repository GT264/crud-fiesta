import { defineComponent as a, resolveDirective as n, withDirectives as u, openBlock as m, createElementBlock as c, normalizeClass as p, unref as r, isRef as f, vModelText as v } from "vue";
import { useVModel as b } from "@vueuse/core";
import { cn as h } from "./index40.js";
const k = ["id", "placeholder", "required"], y = /* @__PURE__ */ a({
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
    const l = e, o = b(l, "modelValue", i);
    return (V, t) => {
      const s = n("maska");
      return u((m(), c("input", {
        id: e.id,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => f(o) ? o.value = d : null),
        placeholder: e.placeholder,
        required: e.required,
        class: p(r(h)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", l.class))
      }, null, 10, k)), [
        [v, r(o)],
        [s, e.mask]
      ]);
    };
  }
});
export {
  y as default
};
