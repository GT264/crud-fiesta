import { defineComponent as u, withDirectives as m, openBlock as t, createElementBlock as o, normalizeClass as c, unref as n, isRef as p, toDisplayString as s, createCommentVNode as f, Fragment as b, renderList as v, vModelSelect as h } from "vue";
import { useVModel as y } from "@vueuse/core";
import { cn as V } from "./index39.js";
const g = ["id", "required", "disabled", "multiple"], x = {
  key: 0,
  value: "",
  disabled: ""
}, B = ["value"], D = /* @__PURE__ */ u({
  __name: "Select",
  props: {
    id: {},
    modelValue: {},
    options: { default: () => [] },
    placeholder: {},
    required: { type: Boolean },
    disabled: { type: Boolean },
    multiple: { type: Boolean, default: !1 },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: r }) {
    const d = e, i = y(d, "modelValue", r);
    return (q, a) => m((t(), o("select", {
      id: e.id,
      "onUpdate:modelValue": a[0] || (a[0] = (l) => p(i) ? i.value = l : null),
      required: e.required,
      disabled: e.disabled,
      multiple: e.multiple,
      class: c(n(V)(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        d.class
      ))
    }, [
      e.placeholder ? (t(), o("option", x, s(e.placeholder), 1)) : f("", !0),
      (t(!0), o(b, null, v(e.options, (l) => (t(), o("option", {
        key: l.value,
        value: l.value
      }, s(l.label), 9, B))), 128))
    ], 10, g)), [
      [h, n(i)]
    ]);
  }
});
export {
  D as default
};
