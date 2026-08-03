import { defineComponent as u, openBlock as i, createBlock as f, Teleport as m, unref as e, createElementBlock as p, createElementVNode as o, normalizeClass as g, createVNode as b, renderSlot as k, createCommentVNode as v } from "vue";
import { useVModel as y } from "@vueuse/core";
import { cn as C } from "./index40.js";
import { X as w } from "lucide-vue-next";
const x = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-center justify-center"
}, _ = /* @__PURE__ */ u({
  __name: "Dialog",
  props: {
    open: { type: Boolean },
    modal: { type: Boolean, default: !0 },
    class: {}
  },
  emits: ["update:open", "close"],
  setup(t, { emit: c }) {
    const n = t, s = c, l = y(n, "open", s);
    function r() {
      l.value = !1, s("close");
    }
    return (d, a) => (i(), f(m, { to: "body" }, [
      e(l) ? (i(), p("div", x, [
        o("div", {
          class: "fixed inset-0 bg-black/50",
          onClick: a[0] || (a[0] = (B) => t.modal ? void 0 : r())
        }),
        o("div", {
          class: g(e(C)(
            "relative z-50 w-full max-w-lg gap-4 border bg-background p-6 shadow-lg rounded-lg md:w-full",
            n.class
          ))
        }, [
          o("button", {
            class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            onClick: r
          }, [
            b(e(w), { class: "h-4 w-4" })
          ]),
          k(d.$slots, "default")
        ], 2)
      ])) : v("", !0)
    ]));
  }
});
export {
  _ as default
};
