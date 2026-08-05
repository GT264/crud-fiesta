import { defineComponent as f, ref as v, openBlock as n, createElementBlock as t, createElementVNode as c, renderSlot as d, createBlock as g, Teleport as k, createCommentVNode as l, normalizeClass as i, unref as x, Fragment as y, renderList as h, toDisplayString as C } from "vue";
import { cn as _ } from "./index27.js";
const $ = { class: "relative inline-block" }, w = ["disabled", "onClick"], z = { class: "inline-block border border-border rounded px-2 py-0.5 text-xs bg-muted" }, N = /* @__PURE__ */ f({
  __name: "DropdownMenu",
  props: {
    items: { default: () => [] },
    class: {}
  },
  setup(r) {
    const u = r, s = v(!1);
    function p(e) {
      e.stopPropagation(), s.value = !s.value;
    }
    function a() {
      s.value = !1;
    }
    function m(e) {
      e.command && e.command(), a();
    }
    return (e, B) => (n(), t("div", $, [
      c("div", { onClick: p }, [
        d(e.$slots, "trigger")
      ]),
      (n(), g(k, { to: "body" }, [
        s.value ? (n(), t("div", {
          key: 0,
          class: "fixed inset-0 z-40",
          onClick: a
        })) : l("", !0)
      ])),
      s.value ? (n(), t("div", {
        key: 0,
        class: i(x(_)(
          "absolute right-0 z-50 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          u.class
        ))
      }, [
        (n(!0), t(y, null, h(r.items, (o, b) => (n(), t("button", {
          key: `${o.label}-${b}`,
          disabled: o.disabled,
          class: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
          onClick: (M) => m(o)
        }, [
          d(e.$slots, "item", { item: o }, () => [
            o.icon ? (n(), t("span", {
              key: 0,
              class: i(o.icon)
            }, null, 2)) : l("", !0),
            c("span", z, C(o.label), 1)
          ])
        ], 8, w))), 128))
      ], 2)) : l("", !0)
    ]));
  }
});
export {
  N as default
};
