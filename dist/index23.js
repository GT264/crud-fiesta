import { defineComponent as r, withDirectives as m, openBlock as t, createElementBlock as o, normalizeClass as c, unref as a, isRef as p, toDisplayString as s, createCommentVNode as f, Fragment as v, renderList as V, vModelSelect as b } from "vue";
import { useVModel as h } from "@vueuse/core";
import { cn as y, inputClasses as B } from "./index18.js";
const k = ["id", "required", "disabled", "multiple"], q = {
  key: 0,
  value: "",
  disabled: ""
}, C = ["value"], w = /* @__PURE__ */ r({
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
  setup(e, { emit: u }) {
    const d = e, i = h(d, "modelValue", u);
    return (g, n) => m((t(), o("select", {
      id: e.id,
      "onUpdate:modelValue": n[0] || (n[0] = (l) => p(i) ? i.value = l : null),
      required: e.required,
      disabled: e.disabled,
      multiple: e.multiple,
      class: c(a(y)(a(B), d.class))
    }, [
      e.placeholder ? (t(), o("option", q, s(e.placeholder), 1)) : f("", !0),
      (t(!0), o(v, null, V(e.options, (l) => (t(), o("option", {
        key: l.value,
        value: l.value
      }, s(l.label), 9, C))), 128))
    ], 10, k)), [
      [b, a(i)]
    ]);
  }
});
export {
  w as default
};
