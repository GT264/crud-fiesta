import { defineComponent as h, openBlock as o, createElementBlock as i, Fragment as m, renderList as b, renderSlot as k, createBlock as r, resolveDynamicComponent as c, unref as l, withCtx as w, createElementVNode as u, toDisplayString as g } from "vue";
import { Link as x } from "@inertiajs/vue3";
import { useCrudFiesta as C } from "./index6.js";
import _ from "./index25.js";
import N from "./index26.js";
import B from "./index27.js";
const E = { class: "flex items-center gap-1" }, $ = { class: "sr-only" }, j = ["onClick"], z = { class: "sr-only" }, R = /* @__PURE__ */ h({
  __name: "CfActions",
  props: {
    buttons: {},
    row: {},
    routePrefix: {},
    keyName: {}
  },
  emits: ["edit", "delete"],
  setup(n, { emit: p }) {
    const s = n, a = p, { buildRoute: v } = C(), f = s.row[s.keyName], d = { Eye: B, Pencil: N, Trash2: _ };
    function y(t) {
      t.event === "edit" ? a("edit", f) : t.action === "destroy" && a("delete", s.row);
    }
    return (t, D) => (o(), i("div", E, [
      (o(!0), i(m, null, b(n.buttons, (e) => (o(), i(m, {
        key: e.action
      }, [
        t.$slots.button ? k(t.$slots, "button", {
          key: 0,
          button: e,
          row: n.row
        }) : e.action === "show" ? (o(), r(c(l(x)), {
          key: 1,
          href: l(v)(e.route_name, { [n.keyName]: l(f) }),
          class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
        }, {
          default: w(() => [
            (o(), r(c(d[e.icon]), { class: "size-4" })),
            u("span", $, g(e.label), 1)
          ]),
          _: 2
        }, 1032, ["href"])) : (o(), i("button", {
          key: 2,
          type: "button",
          class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9",
          onClick: (F) => y(e)
        }, [
          (o(), r(c(d[e.icon]), { class: "size-4" })),
          u("span", z, g(e.label), 1)
        ], 8, j))
      ], 64))), 128))
    ]));
  }
});
export {
  R as default
};
