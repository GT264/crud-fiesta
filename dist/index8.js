import { defineComponent as I, defineAsyncComponent as B, computed as D, ref as N, watch as S, openBlock as u, createBlock as d, unref as r, withCtx as v, createElementVNode as q, withModifiers as E, createElementBlock as n, Fragment as M, renderList as T, createTextVNode as F, toDisplayString as P, createCommentVNode as h, createVNode as b } from "vue";
import _ from "primevue/dialog";
import U from "primevue/inputtext";
import A from "primevue/textarea";
import R from "primevue/inputnumber";
import H from "primevue/datepicker";
import L from "primevue/checkbox";
import O from "primevue/dropdown";
import j from "primevue/multiselect";
import z from "primevue/password";
import G from "primevue/rating";
import J from "primevue/inputmask";
import w from "primevue/fileupload";
import f from "primevue/button";
const K = ["for"], Q = {
  key: 0,
  class: "text-red-500"
}, te = /* @__PURE__ */ I({
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
  setup(i, { emit: g }) {
    const x = B(() => import("primevue/editor")), p = i, m = g, s = D({
      get: () => p.visible,
      set: (t) => m("update:visible", t)
    }), a = N({});
    S(
      () => p.visible,
      (t) => {
        t && p.data ? a.value = { ...p.data } : t && (a.value = {});
      },
      { immediate: !0 }
    );
    const C = () => {
      m("submit", a.value);
    }, c = () => {
      a.value = {}, m("close"), m("update:visible", !1);
    };
    return (t, V) => (u(), d(r(_), {
      visible: s.value,
      "onUpdate:visible": V[0] || (V[0] = (e) => s.value = e),
      header: i.title,
      modal: !0,
      closable: !0,
      class: "w-full md:w-1/2",
      onHide: c
    }, {
      footer: v(() => [
        b(r(f), {
          label: "Annulla",
          icon: "pi pi-times",
          class: "p-button-text",
          onClick: c
        }),
        b(r(f), {
          label: "Salva",
          icon: "pi pi-check",
          loading: i.loading,
          type: "submit",
          form: "crud-form"
        }, null, 8, ["loading"])
      ]),
      default: v(() => [
        q("form", {
          id: "crud-form",
          onSubmit: E(C, ["prevent"]),
          class: "space-y-4"
        }, [
          (u(!0), n(M, null, T(i.fields, (e, l) => (u(), n("div", {
            key: l,
            class: "field"
          }, [
            q("label", {
              for: l,
              class: "block mb-2 font-semibold"
            }, [
              F(P(e.label) + " ", 1),
              e.required ? (u(), n("span", Q, "*")) : h("", !0)
            ], 8, K),
            e.type === "InputText" ? (u(), d(r(U), {
              key: 0,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "email" ? (u(), d(r(U), {
              key: 1,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              type: "email",
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "InputTextarea" ? (u(), d(r(A), {
              key: 2,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required,
              rows: "4"
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "InputNumber" ? (u(), d(r(R), {
              key: 3,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "Calendar" ? (u(), d(r(H), {
              key: 4,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "Checkbox" ? (u(), d(r(L), {
              key: 5,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              binary: !0,
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.type === "Password" ? (u(), d(r(z), {
              key: 6,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required,
              "toggle-mask": ""
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "Rating" ? (u(), d(r(G), {
              key: 7,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              required: e.required
            }, null, 8, ["modelValue", "onUpdate:modelValue", "required"])) : e.type === "InputMask" ? (u(), d(r(J), {
              key: 8,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.type === "Editor" ? (u(), d(r(x), {
              key: 9,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              "editor-style": "height: 200px",
              required: e.required
            }, null, 8, ["modelValue", "onUpdate:modelValue", "required"])) : e.type === "Dropdown" ? (u(), d(r(O), {
              key: 10,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              options: e.options || [],
              "option-label": "label",
              "option-value": "value",
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "MultiSelect" ? (u(), d(r(j), {
              key: 11,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              options: e.options || [],
              "option-label": "label",
              "option-value": "value",
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.type === "File" ? (u(), d(r(w), {
              key: 12,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              auto: !1,
              multiple: !1,
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.type === "Image" ? (u(), d(r(w), {
              key: 13,
              id: l,
              modelValue: a.value[l],
              "onUpdate:modelValue": (o) => a.value[l] = o,
              auto: !1,
              accept: "image/*",
              multiple: !1,
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : h("", !0)
          ]))), 128))
        ], 32)
      ]),
      _: 1
    }, 8, ["visible", "header"]));
  }
});
export {
  te as default
};
