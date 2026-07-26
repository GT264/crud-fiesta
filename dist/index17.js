import { defineComponent as b, ref as v, openBlock as o, createElementBlock as t, createElementVNode as c, renderSlot as d, createBlock as g, Teleport as k, createCommentVNode as r, normalizeClass as i, unref as x, Fragment as y, renderList as h, toDisplayString as C } from "vue";
import { cn as _ } from "./index39.js";
const w = { class: "relative inline-block" }, z = ["disabled", "onClick"], B = { class: "inline-block border border-border rounded px-2 py-0.5 text-xs bg-muted" }, N = /* @__PURE__ */ b({
  __name: "DropdownMenu",
  props: {
    items: { default: () => [] },
    class: {}
  },
  setup(l) {
    const u = l, s = v(!1);
    function p(e) {
      e.stopPropagation(), s.value = !s.value;
    }
    function a() {
      s.value = !1;
    }
    function m(e) {
      e.command && e.command(), a();
    }
    return (e, M) => (o(), t("div", w, [
      c("div", { onClick: p }, [
        d(e.$slots, "trigger")
      ]),
      (o(), g(k, { to: "body" }, [
        s.value ? (o(), t("div", {
          key: 0,
          class: "fixed inset-0 z-40",
          onClick: a
        })) : r("", !0)
      ])),
      s.value ? (o(), t("div", {
        key: 0,
        class: i(x(_)(
          "absolute right-0 z-50 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          u.class
        ))
      }, [
        (o(!0), t(y, null, h(l.items, (n, f) => (o(), t("button", {
          key: f,
          disabled: n.disabled,
          class: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
          onClick: ($) => m(n)
        }, [
          d(e.$slots, "item", { item: n }, () => [
            n.icon ? (o(), t("span", {
              key: 0,
              class: i(n.icon)
            }, null, 2)) : r("", !0),
            c("span", B, C(n.label), 1)
          ])
        ], 8, z))), 128))
      ], 2)) : r("", !0)
    ]));
  }
});
export {
  N as default
};
