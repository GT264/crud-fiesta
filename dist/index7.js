import { defineComponent as E, computed as N, ref as L, watch as S, openBlock as r, createBlock as u, withCtx as q, createElementVNode as s, toDisplayString as c, withModifiers as y, createElementBlock as v, Fragment as D, renderList as F, createTextVNode as h, createCommentVNode as _, createVNode as U, unref as M } from "vue";
import { usePage as T } from "@inertiajs/vue3";
import { Loader2 as j } from "lucide-vue-next";
import O from "./index16.js";
import w from "./index15.js";
import V from "./index17.js";
import P from "./index18.js";
import z from "./index19.js";
import g from "./index20.js";
import A from "./index21.js";
import G from "./index22.js";
import x from "./index23.js";
import H from "./index24.js";
const I = { class: "flex flex-col gap-4" }, J = { class: "text-lg font-semibold" }, K = ["for"], Q = {
  key: 0,
  class: "text-red-500"
}, R = { class: "flex justify-end gap-2 mt-4" }, ie = /* @__PURE__ */ E({
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
  setup(i, { emit: $ }) {
    const m = i, p = $, B = T();
    function d(t) {
      var n;
      return t ? ((n = B.props.crudLang) == null ? void 0 : n[t]) ?? t : "";
    }
    const f = N({
      get: () => m.visible,
      set: (t) => p("update:visible", t)
    }), a = L({});
    S(() => m.visible, (t) => {
      a.value = t && m.data ? { ...m.data } : {};
    }, { immediate: !0 });
    const C = () => p("submit", a.value), b = () => {
      a.value = {}, p("close"), p("update:visible", !1);
    };
    return (t, n) => (r(), u(O, {
      open: f.value,
      modal: !0,
      class: "w-full md:w-1/2",
      "onUpdate:open": n[0] || (n[0] = (e) => f.value = e),
      onClose: b
    }, {
      default: q(() => [
        s("div", I, [
          s("h2", J, c(i.title), 1),
          s("form", {
            id: "crud-form",
            class: "space-y-4",
            onSubmit: y(C, ["prevent"])
          }, [
            (r(!0), v(D, null, F(i.fields, (e, l) => (r(), v("div", {
              key: l,
              class: "field"
            }, [
              s("label", {
                for: l,
                class: "block mb-2 font-semibold text-sm"
              }, [
                h(c(d(e.label)) + " ", 1),
                e.required ? (r(), v("span", Q, "*")) : _("", !0)
              ], 8, K),
              e.type === "text" ? (r(), u(V, {
                key: 0,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "email" ? (r(), u(V, {
                key: 1,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                type: "email",
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "textarea" ? (r(), u(P, {
                key: 2,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required,
                rows: "4"
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "number" ? (r(), u(V, {
                key: 3,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                modelModifiers: { number: !0 },
                type: "number",
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "date" ? (r(), u(A, {
                key: 4,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "checkbox" ? (r(), u(z, {
                key: 5,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.type === "password" ? (r(), u(V, {
                key: 6,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                type: "password",
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "select" ? (r(), u(g, {
                key: 7,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                options: e.options || [],
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "multi_select" ? (r(), u(g, {
                key: 8,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                options: e.options || [],
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required,
                multiple: ""
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "mask" ? (r(), u(H, {
                key: 9,
                id: l,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                placeholder: d(e.placeholder),
                class: "w-full",
                required: e.required
              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "rich_text" ? (r(), u(G, {
                key: 10,
                modelValue: a.value[l],
                "onUpdate:modelValue": (o) => a.value[l] = o,
                required: e.required
              }, null, 8, ["modelValue", "onUpdate:modelValue", "required"])) : e.type === "file" ? (r(), u(x, {
                key: "file-" + l,
                required: e.required,
                accept: "*/*"
              }, null, 8, ["required"])) : e.type === "image" ? (r(), u(x, {
                key: "image-" + l,
                required: e.required,
                accept: "image/*"
              }, null, 8, ["required"])) : _("", !0)
            ]))), 128))
          ], 32),
          s("div", R, [
            U(w, {
              variant: "secondary",
              onClick: b
            }, {
              default: q(() => [
                h(c(d("crud.button.cancel")), 1)
              ]),
              _: 1
            }),
            U(w, {
              variant: "default",
              disabled: i.loading,
              type: "submit",
              form: "crud-form"
            }, {
              default: q(() => [
                i.loading ? (r(), u(M(j), {
                  key: 0,
                  class: "h-4 w-4 mr-1 animate-spin"
                })) : _("", !0),
                h(" " + c(m.isEdit ? d("crud.button.edit") : d("crud.button.create")), 1)
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
  ie as default
};
