import { defineComponent as $, reactive as C, watch as D, openBlock as n, createElementBlock as i, withModifiers as S, Fragment as h, renderList as x, createElementVNode as l, toDisplayString as u, withDirectives as c, vModelDynamic as g, vModelText as _, vModelSelect as M, createTextVNode as j, vModelCheckbox as A, createCommentVNode as B } from "vue";
const F = ["for"], N = ["id", "onUpdate:modelValue", "type", "placeholder"], z = ["id", "onUpdate:modelValue", "placeholder"], E = ["id", "onUpdate:modelValue"], O = { value: "" }, T = ["value"], I = {
  key: 3,
  class: "space-y-1"
}, L = ["value", "checked", "onChange"], P = ["id", "onUpdate:modelValue", "type"], q = {
  key: 5,
  class: "flex items-center gap-2"
}, G = ["id", "onUpdate:modelValue"], H = ["for"], J = ["id"], K = ["id", "onUpdate:modelValue"], Q = { class: "flex justify-end gap-2 pt-4 border-t" }, R = ["disabled"], W = ["disabled"], Y = /* @__PURE__ */ $({
  __name: "CfForm",
  props: {
    formDetails: {},
    item: {},
    routePrefix: {},
    action: {},
    loading: { type: Boolean, default: !1 }
  },
  emits: ["submit", "cancel"],
  setup(a, { emit: k }) {
    const m = a, v = k, r = C({});
    function f() {
      for (const [d, p] of Object.entries(m.formDetails))
        m.item && m.item[d] !== void 0 ? r[d] = m.item[d] : r[d] = "";
    }
    f(), D(() => m.item, () => f());
    function w() {
      v("submit", { ...r });
    }
    function s(d, p) {
      const t = p.form_type;
      return ["select", "multiselect", "checkbox", "radio"].includes(t) ? t : t === "richtext" ? "richtext" : t === "textarea" ? "textarea" : ["date", "datetime", "datetime-local"].includes(t) ? t : ["image", "file"].includes(t) ? "file" : t === "password" ? "password" : "text";
    }
    return (d, p) => (n(), i("form", {
      onSubmit: S(w, ["prevent"]),
      class: "space-y-4"
    }, [
      (n(!0), i(h, null, x(a.formDetails, (t, e) => (n(), i("div", {
        key: e,
        class: "space-y-2"
      }, [
        l("label", {
          for: `field-${e}`,
          class: "text-sm font-medium leading-none"
        }, u(t.label), 9, F),
        s(e, t) === "text" || s(e, t) === "email" || s(e, t) === "number" || s(e, t) === "url" || s(e, t) === "password" ? c((n(), i("input", {
          key: 0,
          id: `field-${e}`,
          "onUpdate:modelValue": (o) => r[e] = o,
          type: s(e, t),
          placeholder: t.placeholder,
          class: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        }, null, 8, N)), [
          [g, r[e]]
        ]) : s(e, t) === "textarea" ? c((n(), i("textarea", {
          key: 1,
          id: `field-${e}`,
          "onUpdate:modelValue": (o) => r[e] = o,
          placeholder: t.placeholder,
          rows: "4",
          class: "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        }, null, 8, z)), [
          [_, r[e]]
        ]) : s(e, t) === "select" ? c((n(), i("select", {
          key: 2,
          id: `field-${e}`,
          "onUpdate:modelValue": (o) => r[e] = o,
          class: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        }, [
          l("option", O, u(t.placeholder || "Select..."), 1),
          (n(!0), i(h, null, x(t.options || [], (o) => (n(), i("option", {
            key: o.value,
            value: o.value
          }, u(o.label), 9, T))), 128))
        ], 8, E)), [
          [M, r[e]]
        ]) : s(e, t) === "multiselect" ? (n(), i("div", I, [
          (n(!0), i(h, null, x(t.options || [], (o) => (n(), i("label", {
            key: o.value,
            class: "flex items-center gap-2 text-sm"
          }, [
            l("input", {
              type: "checkbox",
              value: o.value,
              checked: (Array.isArray(r[e]) ? r[e] : []).includes(o.value),
              onChange: (V) => {
                const U = V.target, b = Array.isArray(r[e]) ? [...r[e]] : [];
                if (U.checked)
                  b.push(o.value);
                else {
                  const y = b.indexOf(o.value);
                  y > -1 && b.splice(y, 1);
                }
                r[e] = b;
              },
              class: "size-4 rounded border border-input"
            }, null, 40, L),
            j(" " + u(o.label), 1)
          ]))), 128))
        ])) : s(e, t) === "date" || s(e, t) === "datetime" || s(e, t) === "datetime-local" ? c((n(), i("input", {
          key: 4,
          id: `field-${e}`,
          "onUpdate:modelValue": (o) => r[e] = o,
          type: s(e, t) === "datetime" ? "datetime-local" : s(e, t),
          class: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        }, null, 8, P)), [
          [g, r[e]]
        ]) : s(e, t) === "checkbox" ? (n(), i("div", q, [
          c(l("input", {
            type: "checkbox",
            id: `field-${e}`,
            "onUpdate:modelValue": (o) => r[e] = o,
            class: "size-4 rounded border border-input"
          }, null, 8, G), [
            [A, r[e]]
          ]),
          l("label", {
            for: `field-${e}`,
            class: "text-sm"
          }, u(t.label), 9, H)
        ])) : s(e, t) === "file" ? (n(), i("input", {
          key: 6,
          id: `field-${e}`,
          type: "file",
          class: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium"
        }, null, 8, J)) : s(e, t) === "richtext" ? c((n(), i("textarea", {
          key: 7,
          id: `field-${e}`,
          "onUpdate:modelValue": (o) => r[e] = o,
          rows: "6",
          class: "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        }, null, 8, K)), [
          [_, r[e]]
        ]) : B("", !0)
      ]))), 128)),
      l("div", Q, [
        l("button", {
          type: "button",
          class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2",
          onClick: p[0] || (p[0] = (t) => v("cancel")),
          disabled: a.loading
        }, " Cancel ", 8, R),
        l("button", {
          type: "submit",
          class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2",
          disabled: a.loading
        }, u(a.loading ? "Saving..." : a.action === "create" ? "Create" : "Save"), 9, W)
      ])
    ], 32));
  }
});
export {
  Y as default
};
