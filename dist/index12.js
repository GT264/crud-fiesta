import { mergeProxy as m, flatMerge as p } from "./index29.js";
import { vueReactivity as y } from "./index30.js";
import { unref as c, getCurrentScope as O, onScopeDispose as b, watch as l } from "vue";
import { constructTable as v } from "./index31.js";
function d(t) {
  const r = {};
  for (const o of Object.keys(t)) r[o] = c(t[o]);
  return m(t, r);
}
function h(t) {
  return Object.keys(t).map((r) => c(t[r]));
}
function j(t) {
  const r = (e, n) => {
    e.setOptions((u) => p(u, d(n)));
  }, o = y(), s = m(t, { features: {
    coreReactivityFeature: o,
    ...c(t.features) ?? {}
  } }), g = m(d(s), { mergeOptions: (e, n) => p(e, n) }), a = v(g), i = a;
  return O() && b(() => {
    var e;
    return (e = o.unmount) == null ? void 0 : e.call(o);
  }), l(() => h(s), () => {
    r(a, s);
  }, { immediate: !0 }), l(() => {
    const e = c(t.state), n = c(t.atoms);
    if (!e) return [];
    const u = [];
    for (const f of Object.keys(i.initialState))
      !(f in e) || (n == null ? void 0 : n[f]) !== void 0 || u.push(e[f]);
    return u;
  }, (e) => {
    e.length > 0 && r(a, s);
  }, { immediate: !0 }), i.Subscribe = (e) => e.children(i.atoms), i;
}
export {
  j as useTable
};
