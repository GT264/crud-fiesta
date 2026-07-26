import { defineComponent as B, computed as C, ref as y, watch as N, openBlock as r, createBlock as d, withCtx as c, createElementVNode as m, toDisplayString as _, withModifiers as S, createElementBlock as V, Fragment as E, renderList as D, createTextVNode as q, createCommentVNode as v, createVNode as b, unref as F } from "vue";
import { Loader2 as L } from "lucide-vue-next";
import M from "./index16.js";
import U from "./index15.js";
import p from "./index17.js";
import j from "./index18.js";
import A from "./index19.js";
import w from "./index20.js";
import O from "./index21.js";
import T from "./index22.js";
import x from "./index23.js";
import z from "./index24.js";
const G = { class: "flex flex-col gap-4" }, H = { class: "text-lg font-semibold" }, I = ["for"], J = {
  key: 0,
  class: "text-red-500"
}, K = { class: "flex justify-end gap-2 mt-4" }, re = /* @__PURE__ */ B({
  __name: "CrudForm",
  props: {
    visible: { type: Boolean },
    title: {},
    fields: {},
    data: {},
    loading: { type: Boolean, default: !1 },
    isEdit: { type: Boolean, default: !1 }
  },
  emits: ["update:visible", "submit", "close"],
  setup(t, { emit: g }) {
    const i = t, s = g, h = C({
      get: () => i.visible,
      set: (n) => s("update:visible", n)
    }), a = y({});
    N(() => i.visible, (n) => {
      a.value = n && i.data ? { ...i.data } : {};
    }, { immediate: !0 });
    const $ = () => s("submit", a.value), f = () => {
      a.value = {}, s("close"), s("update:visible", !1);
    };
    return (n, u) => (r(), d(M, {
      open: h.value,
      modal: !0,
      class: "w-full md:w-1/2",
      "onUpdate:open": u[0] || (u[0] = (e) => h.value = e),
      onClose: f
    }, {
      default: c(() => [
        m("div", G, [
          m("h2", H, _(t.title), 1),
          m("form", {
            id: "crud-form",
            class: "space-y-4",
            onSubmit: S($, ["prevent"])
          }, [
            (r(!0), V(E, null, D(t.fields, (e, l) => (r(), V("div", {
              key: l,
              class: "field"
            }, [
              m("label", {
                for: l,
                class: "block mb-2 font-semibold text-sm"
              }, [
                q(_(e.label) + " ", 1),
                e.required ? (r(), V("span", J, "*")) : v("", !0)
              ], 8, I),
              e.type === "text" ? (r(), d(p, {
                key: 0,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "email" ? (r(), d(p, {
                key: 1,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                type: "email",
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "textarea" ? (r(), d(j, {
                key: 2,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required,
                rows: "4"
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "number" ? (r(), d(p, {
                key: 3,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                modelModifiers: { number: !0 },
                type: "number",
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "date" ? (r(), d(O, {
                key: 4,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "checkbox" ? (r(), d(A, {
                key: 5,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.type === "password" ? (r(), d(p, {
                key: 6,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                type: "password",
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "select" ? (r(), d(w, {
                key: 7,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                options: e.options || [],
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "multi_select" ? (r(), d(w, {
                key: 8,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                options: e.options || [],
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required,
                multiple: ""
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "mask" ? (r(), d(z, {
                key: 9,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: e.placeholder,
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "rich_text" ? (r(), d(T, {
                key: 10,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                required: e.required
              }, null, 8, ["modelValue", "onUpdate:modelValue", "required"])) : e.type === "file" ? (r(), d(x, {
                key: "file-" + l,
                required: e.required,
                accept: "*/*"
              }, null, 8, ["required"])) : e.type === "image" ? (r(), d(x, {
                key: "image-" + l,
                required: e.required,
                accept: "image/*"
              }, null, 8, ["required"])) : v("", !0)
            ]))), 128))
          ], 32),
          m("div", K, [
            b(U, {
              variant: "secondary",
              onClick: f
            }, {
              default: c(() => [...u[1] || (u[1] = [
                q("Annulla", -1)
              ])]),
              _: 1
            }),
            b(U, {
              variant: "default",
              disabled: t.loading,
              type: "submit",
              form: "crud-form"
            }, {
              default: c(() => [
                t.loading ? (r(), d(F(L), {
                  key: 0,
                  class: "h-4 w-4 mr-1 animate-spin"
                })) : v("", !0),
                u[2] || (u[2] = q(" Salva ", -1))
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])
      ]),
      _: 1
    }, 8, ["open"]));
  }
});
export {
  re as default
};
