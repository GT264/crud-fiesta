import { ref as s, computed as I } from "vue";
import { useForm as T, router as p } from "@inertiajs/vue3";
import { route as $ } from "ziggy-js";
function V(a, u) {
  const r = s(!1), f = s(""), m = s({}), l = s(!1), i = s(null), c = T({}), h = { show: "view", edit: "edit", destroy: "delete" };
  function F(e) {
    return e.event || h[e.action] || e.action;
  }
  const w = I(
    () => u.map((e) => ({ action: F(e), icon: e.icon, label: e.label }))
  );
  function j(e) {
    return $(e);
  }
  function E(e, t) {
    return $(e, { id: t });
  }
  function d(e) {
    c.reset(), Object.entries(e).forEach(([t, o]) => {
      c[t] = o;
    }), c.clearErrors();
  }
  async function b(e) {
    const t = u.find((o) => o.action === "create");
    try {
      const o = t ? j(t.route_name) : `/${a}/create`, n = await (await fetch(o, { headers: { Accept: "application/json" } })).json();
      d({}), m.value = n, f.value = e, l.value = !1, i.value = null, r.value = !0;
    } catch (o) {
      console.error("Failed to load create form:", o);
    }
  }
  async function y(e, t) {
    const o = u.find((n) => n.action === "edit");
    try {
      const n = o ? E(o.route_name, e) : `/${a}/${e}/edit`, v = await (await fetch(n, { headers: { Accept: "application/json" } })).json();
      d(v.item ?? {}), m.value = v.form_details, f.value = t, l.value = !0, i.value = e, r.value = !0;
    } catch (n) {
      console.error("Failed to load edit form:", n);
    }
  }
  function g() {
    const e = l.value ? `/${a}/${i.value}` : `/${a}`;
    l.value ? c.put(e, {
      onSuccess: () => {
        r.value = !1;
      },
      onError: () => {
      }
    }) : c.post(e, {
      onSuccess: () => {
        r.value = !1;
      },
      onError: () => {
      }
    });
  }
  function A() {
    r.value = !1, i.value = null, d({});
  }
  function S(e) {
    p.get(`/${a}/${e}`);
  }
  function C(e) {
    p.delete(`/${a}/${e}`);
  }
  return {
    formVisible: r,
    formTitle: f,
    formFields: m,
    formIsEdit: l,
    editingId: i,
    form: c,
    mappedButtons: w,
    goToCreate: b,
    onEdit: y,
    onFormSubmit: g,
    onFormClose: A,
    onView: S,
    onDelete: C
  };
}
export {
  V as useCrudForm
};
