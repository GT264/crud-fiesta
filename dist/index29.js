import { ref as s, computed as I } from "vue";
import { useForm as T, router as p } from "@inertiajs/vue3";
import { route as h } from "ziggy-js";
function R(c, u) {
  const r = s(!1), f = s(""), m = s({}), l = s(!1), i = s(null), n = T({}), $ = { show: "view", edit: "edit", destroy: "delete" };
  function F(e) {
    return e.event || $[e.action] || e.action;
  }
  const j = I(
    () => u.map((e) => ({ action: F(e), icon: e.icon, label: e.label }))
  );
  function w(e) {
    return h(e);
  }
  function b(e, o) {
    return h(e, { id: o });
  }
  function d(e) {
    Object.keys(n).forEach((o) => delete n[o]), Object.entries(e).forEach(([o, t]) => {
      n[o] = t;
    }), n.clearErrors();
  }
  async function y(e) {
    const o = u.find((t) => t.action === "create");
    try {
      const t = o ? w(o.route_name) : `/${c}/create`, a = await (await fetch(t, { headers: { Accept: "application/json" } })).json();
      d({}), m.value = a, f.value = e, l.value = !1, i.value = null, r.value = !0;
    } catch (t) {
      console.error("Failed to load create form:", t);
    }
  }
  async function E(e, o) {
    const t = u.find((a) => a.action === "edit");
    try {
      const a = t ? b(t.route_name, e) : `/${c}/${e}/edit`, v = await (await fetch(a, { headers: { Accept: "application/json" } })).json();
      d(v.item ?? {}), m.value = v.form_details, f.value = o, l.value = !0, i.value = e, r.value = !0;
    } catch (a) {
      console.error("Failed to load edit form:", a);
    }
  }
  function g() {
    n.clearErrors();
    const e = l.value ? `/${c}/${i.value}` : `/${c}`;
    l.value ? n.put(e, { onSuccess: () => {
      r.value = !1;
    } }) : n.post(e, { onSuccess: () => {
      r.value = !1;
    } });
  }
  function A() {
    r.value = !1, i.value = null, d({});
  }
  function S(e) {
    p.get(`/${c}/${e}`);
  }
  function C(e) {
    p.delete(`/${c}/${e}`);
  }
  return {
    formVisible: r,
    formTitle: f,
    formFields: m,
    formIsEdit: l,
    editingId: i,
    form: n,
    mappedButtons: j,
    goToCreate: y,
    onEdit: E,
    onFormSubmit: g,
    onFormClose: A,
    onView: S,
    onDelete: C
  };
}
export {
  R as useCrudForm
};
