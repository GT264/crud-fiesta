import { defineComponent as g, computed as x, ref as B, watch as C, openBlock as t, createBlock as u, unref as r, withCtx as f, createElementVNode as b, withModifiers as S, createElementBlock as p, Fragment as y, renderList as D, createTextVNode as N, toDisplayString as E, createCommentVNode as V, createVNode as h } from "vue";
import F from "primevue/dialog";
import T from "primevue/inputtext";
import M from "primevue/textarea";
import A from "primevue/dropdown";
import H from "primevue/multiselect";
import q from "primevue/fileupload";
import U from "primevue/button";
const I = ["for"], L = {
  key: 0,
  class: "text-red-500"
}, R = /* @__PURE__ */ g({
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
  setup(i, { emit: _ }) {
    const m = i, n = _, s = x({
      get: () => m.visible,
      set: (d) => n("update:visible", d)
    }), o = B({});
    C(
      () => m.visible,
      (d) => {
        d && m.data ? o.value = { ...m.data } : d && (o.value = {});
      },
      { immediate: !0 }
    );
    const w = () => {
      n("submit", o.value);
    }, c = () => {
      o.value = {}, n("close"), n("update:visible", !1);
    };
    return (d, v) => (t(), u(r(F), {
      visible: s.value,
      "onUpdate:visible": v[0] || (v[0] = (e) => s.value = e),
      header: i.title,
      modal: !0,
      closable: !0,
      class: "w-full md:w-1/2",
      onHide: c
    }, {
      footer: f(() => [
        h(r(U), {
          label: "Annulla",
          icon: "pi pi-times",
          class: "p-button-text",
          onClick: c
        }),
        h(r(U), {
          label: "Salva",
          icon: "pi pi-check",
          loading: i.loading,
          type: "submit",
          form: "crud-form"
        }, null, 8, ["loading"])
      ]),
      default: f(() => [
        b("form", {
          id: "crud-form",
          onSubmit: S(w, ["prevent"]),
          class: "space-y-4"
        }, [
          (t(!0), p(y, null, D(i.fields, (e, l) => (t(), p("div", {
            key: l,
            class: "field"
          }, [
            b("label", {
              for: l,
              class: "block mb-2 font-semibold"
            }, [
              N(E(e.label) + " ", 1),
              e.required ? (t(), p("span", L, "*")) : V("", !0)
            ], 8, I),
            e.form_type === "text" || e.form_type === "email" ? (t(), u(r(T), {
              key: 0,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              type: e.form_type,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "placeholder", "required"])) : e.form_type === "textarea" ? (t(), u(r(M), {
              key: 1,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required,
              rows: "4"
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "placeholder", "required"])) : e.form_type === "dropdown" ? (t(), u(r(A), {
              key: 2,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              options: e.options || [],
              "option-label": "label",
              "option-value": "value",
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.form_type === "multi_select" ? (t(), u(r(H), {
              key: 3,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              options: e.options || [],
              "option-label": "label",
              "option-value": "value",
              placeholder: e.placeholder,
              class: "w-full",
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "options", "placeholder", "required"])) : e.form_type === "file" ? (t(), u(r(q), {
              key: 4,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              auto: !1,
              multiple: !1,
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : e.form_type === "image" ? (t(), u(r(q), {
              key: 5,
              id: l,
              modelValue: o.value[l],
              "onUpdate:modelValue": (a) => o.value[l] = a,
              auto: !1,
              accept: "image/*",
              multiple: !1,
              required: e.required
            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "required"])) : V("", !0)
          ]))), 128))
        ], 32)
      ]),
      _: 1
    }, 8, ["visible", "header"]));
  }
});
export {
  R as default
};
