import { functionalUpdate as c, cloneState as u } from "./index38.js";
function p(t, i, s = (e, o) => e === o) {
  const e = i === void 0 ? t.options.state : i;
  t._reactivity.batch(() => {
    if (e) for (const o in e) {
      const n = t.baseAtoms[o];
      if (!n) continue;
      const r = e[o], a = r === void 0 ? t.initialState[o] : r;
      s(t._reactivity.untrack(() => n.get()), a) || n.set(() => a);
    }
  });
}
function f(t, i, s = (e, o) => e === o) {
  t._reactivity.batch(() => {
    var e, o;
    p(t, i, s), (o = (e = t._reactivity).commit) == null || o.call(e);
  });
}
function g(t) {
  var e, o;
  const i = u(t.initialState);
  t._reactivity.batch(() => {
    const n = Object.keys(i);
    for (let r = 0; r < n.length; r++) {
      const a = n[r];
      t.baseAtoms[a].set(i[a]);
    }
  });
  const s = Object.values(t._features);
  for (let n = 0; n < s.length; n++) (o = (e = s[n]).resetTableInstanceData) == null || o.call(e, t);
}
function l(t, i) {
  const { features: s, atoms: e, initialState: o } = t.options;
  if (!t.options.mergeOptions) return {
    ...t.options,
    ...i,
    features: s,
    atoms: e,
    initialState: o
  };
  const n = t.options.mergeOptions(t.options, i), r = { ...Object.getOwnPropertyDescriptors(n) };
  return Object.defineProperties(Object.create(Object.getPrototypeOf(n)), {
    ...r,
    features: {
      value: s,
      enumerable: !0,
      configurable: !0,
      writable: !0
    },
    atoms: {
      value: e,
      enumerable: !0,
      configurable: !0,
      writable: !0
    },
    initialState: {
      value: o,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }
  });
}
function O(t, i, s) {
  const e = l(t, c(i, t.options));
  t.optionsStore ? t.optionsStore.set(() => e) : t.options = e, f(t, e.state ?? null);
}
export {
  l as table_mergeOptions,
  f as table_publishExternalState,
  g as table_reset,
  O as table_setOptions,
  p as table_syncExternalStateToBaseAtoms
};
