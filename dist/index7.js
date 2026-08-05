import { defineComponent as N, computed as y, openBlock as a, createBlock as t, withCtx as f, createElementVNode as m, toDisplayString as i, withModifiers as S, createElementBlock as c, Fragment as T, renderList as F, createTextVNode as V, unref as d, createCommentVNode as s, createVNode as v } from "vue";
import { Loader2 as L } from "lucide-vue-next";
import M from "./index16.js";
import g from "./index15.js";
import p from "./index19.js";
import j from "./index20.js";
import D from "./index21.js";
import $ from "./index22.js";
import O from "./index23.js";
import z from "./index24.js";
import C from "./index25.js";
import A from "./index26.js";
import { useCrudTranslation as G } from "./index18.js";
const H = { class: "flex flex-col gap-4" }, I = { class: "text-lg font-semibold" }, J = ["for"], K = {
  key: 0,
  class: "text-red-500"
}, P = {
  key: 13,
  class: "text-red-500 text-sm mt-1"
}, Q = { class: "flex justify-end gap-2 mt-4" }, de = /* @__PURE__ */ N({
  __name: "CrudForm",
  props: {
    visible: { type: Boolean },
    title: {},
    fields: {},
    form: {},
    loading: { type: Boolean, default: !1 },
    isEdit: { type: Boolean, default: !1 },
    errors: { default: () => ({}) }
  },
  emits: ["update:visible", "submit", "close"],
  setup(o, { emit: B }) {
    const q = o, n = B, { crudT: u } = G(), h = y({
      get: () => q.visible,
      set: (U) => n("update:visible", U)
    }), E = () => n("submit"), b = () => {
      n("close"), n("update:visible", !1);
    };
    return (U, w) => (a(), t(M, {
      open: h.value,
      modal: !0,
      class: "w-full md:w-1/2",
      "onUpdate:open": w[0] || (w[0] = (e) => h.value = e),
      onClose: b
    }, {
      default: f(() => [
        m("div", H, [
          m("h2", I, i(o.title), 1),
          m("form", {
            id: "crud-form",
            class: "space-y-4",
            onSubmit: S(E, ["prevent"])
          }, [
            (a(!0), c(T, null, F(o.fields, (e, l) => {
              var x;
              return a(), c("div", {
                key: l,
                class: "field"
              }, [
                m("label", {
                  for: l,
                  class: "block mb-2 font-semibold text-sm"
                }, [
                  V(i(d(u)(e.label)) + " ", 1),
                  e.required ? (a(), c("span", K, "*")) : s("", !0)
                ], 8, J),
                e.type === "text" ? (a(), t(p, {
                  key: 0,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "email" ? (a(), t(p, {
                  key: 1,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  type: "email",
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "textarea" ? (a(), t(j, {
                  key: 2,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required,
                  rows: "4"
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "number" ? (a(), t(p, {
                  key: 3,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  modelModifiers: { number: !0 },
                  type: "number",
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "date" ? (a(), t(O, {
                  key: 4,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "checkbox" ? (a(), t(D, {
                  key: 5,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.type === "password" ? (a(), t(p, {
                  key: 6,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  type: "password",
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "select" ? (a(), t($, {
                  key: 7,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  options: e.options || [],
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "multi_select" ? (a(), t($, {
                  key: 8,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  options: e.options || [],
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required,
                  multiple: ""
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "mask" ? (a(), t(A, {
                  key: 9,
                  id: l,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  placeholder: d(u)(e.placeholder),
                  class: "w-full",
                  required: e.required
                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "rich_text" ? (a(), t(z, {
                  key: 10,
                  modelValue: o.form[l],
                  "onUpdate:modelValue": (r) => o.form[l] = r,
                  required: e.required
                }, null, 8, ["modelValue", "onUpdate:modelValue", "required"])) : e.type === "file" ? (a(), t(C, {
                  key: "file-" + l,
                  required: e.required,
                  accept: "*/*"
                }, null, 8, ["required"])) : e.type === "image" ? (a(), t(C, {
                  key: "image-" + l,
                  required: e.required,
                  accept: "image/*"
                }, null, 8, ["required"])) : s("", !0),
                (x = o.errors) != null && x[l] ? (a(), c("p", P, i(o.errors[l]), 1)) : s("", !0)
              ]);
            }), 128))
          ], 32),
          m("div", Q, [
            v(g, {
              variant: "secondary",
              onClick: b
            }, {
              default: f(() => [
                V(i(d(u)("crud.button.cancel")), 1)
              ]),
              _: 1
            }),
            v(g, {
              variant: "default",
              disabled: o.loading,
              type: "submit",
              form: "crud-form"
            }, {
              default: f(() => [
                o.loading ? (a(), t(d(L), {
                  key: 0,
                  class: "h-4 w-4 mr-1 animate-spin"
                })) : s("", !0),
                V(" " + i(q.isEdit ? d(u)("crud.button.edit") : d(u)("crud.button.create")), 1)
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
  de as default
};
