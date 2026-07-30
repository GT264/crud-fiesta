import { defineComponent as p, ref as y, openBlock as o, createBlock as g, Teleport as _, createElementVNode as s, createElementBlock as l, Fragment as b, renderList as v, normalizeClass as x, unref as c, toDisplayString as d, createCommentVNode as a, createVNode as h } from "vue";
import { cn as k } from "./index40.js";
import { X as w } from "lucide-vue-next";
const C = { class: "fixed top-4 right-4 z-[100] flex flex-col gap-2" }, B = { class: "flex-1" }, N = {
  key: 0,
  class: "font-semibold text-sm"
}, T = {
  key: 1,
  class: "text-sm opacity-80"
}, V = ["onClick"], I = /* @__PURE__ */ p({
  __name: "Toast",
  setup(z, { expose: u }) {
    const i = y([]);
    let m = 0;
    function f(r) {
      const t = String(++m), e = { ...r, id: t };
      i.value.push(e), r.life && setTimeout(() => n(t), r.life);
    }
    function n(r) {
      i.value = i.value.filter((t) => t.id !== r);
    }
    return u({ add: f, remove: n }), (r, t) => (o(), g(_, { to: "body" }, [
      s("div", C, [
        (o(!0), l(b, null, v(i.value, (e) => (o(), l("div", {
          key: e.id,
          class: x(c(k)(
            "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all",
            e.severity === "success" && "border-green-200 bg-green-50 text-green-800",
            e.severity === "error" && "border-red-200 bg-red-50 text-red-800",
            e.severity === "warning" && "border-yellow-200 bg-yellow-50 text-yellow-800",
            e.severity === "info" && "border-blue-200 bg-blue-50 text-blue-800",
            !e.severity && "border-gray-200 bg-white text-gray-800"
          ))
        }, [
          s("div", B, [
            e.summary ? (o(), l("div", N, d(e.summary), 1)) : a("", !0),
            e.detail ? (o(), l("div", T, d(e.detail), 1)) : a("", !0)
          ]),
          s("button", {
            class: "opacity-50 hover:opacity-100",
            onClick: (E) => n(e.id)
          }, [
            h(c(w), { class: "h-4 w-4" })
          ], 8, V)
        ], 2))), 128))
      ])
    ]));
  }
});
export {
  I as default
};
