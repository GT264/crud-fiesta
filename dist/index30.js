import { ref as s, computed as I } from "vue";
import { useForm as T, router as p } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
function V(c, u) {
  const r = s(!1), f = s(""), m = s({}), l = s(!1), i = s(null), n = T({}), h = { show: "view", edit: "edit", destroy: "delete" };
  function F(e) {
    return e.event || h[e.action] || e.action;
  }
  const w = I(
    () => u.map((e) => ({ action: F(e), icon: e.icon, label: e.label }))
  );
  function j(e) {
    return $(e);
  }
  function b(e, t) {
    return $(e, { id: t });
  }
  function d(e) {
    n.reset(), Object.entries(e).forEach(([t, o]) => {
      n[t] = o;
    }), n.clearErrors();
  }
  async function y(e) {
    const t = u.find((o) => o.action === "create");
    try {
      const o = t ? j(t.route_name) : `/${c}/create`, a = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
      d({}), m.value = a, f.value = e, l.value = !1, i.value = null, r.value = !0;
    } catch (o) {
      console.error("Failed to load create form:", o);
    }
  }
  async function E(e, t) {
    const o = u.find((a) => a.action === "edit");
    try {
      const a = o ? b(o.route_name, e) : `/${c}/${e}/edit`, v = await (await fetch(a, { headers: { Accept: "application/json" } })).json();
      d(v.item ?? {}), m.value = v.form_details, f.value = t, l.value = !0, i.value = e, r.value = !0;
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
    mappedButtons: w,
    goToCreate: y,
    onEdit: E,
    onFormSubmit: g,
    onFormClose: A,
    onView: S,
    onDelete: C
  };
}
export {
  V as useCrudForm
};
