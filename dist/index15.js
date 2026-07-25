import { defineComponent as l, openBlock as i, createElementBlock as r, normalizeClass as d, unref as o, renderSlot as u } from "vue";
import { buttonVariants as c } from "./index40.js";
import { cn as f } from "./index39.js";
const m = ["type", "disabled"], y = /* @__PURE__ */ l({
  __name: "Button",
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    type: { default: "button" },
    disabled: { type: Boolean },
    class: {}
  },
  emits: ["click"],
  setup(t) {
    const e = t;
    return (a, n) => (i(), r("button", {
      type: t.type,
      disabled: t.disabled,
      class: d(o(f)(o(c)({ variant: e.variant, size: e.size }), e.class)),
      onClick: n[0] || (n[0] = (s) => a.$emit("click", s))
    }, [
      u(a.$slots, "default")
    ], 10, m));
  }
});
export {
  y as default
};
