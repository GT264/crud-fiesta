import { shallowRef as a, computed as c, watch as e } from "vue";
function i(n) {
  return typeof n == "function" ? n : (t) => {
    var u;
    return (u = n.next) == null ? void 0 : u.call(n, t);
  };
}
function o(n) {
  return Object.assign(n, {
    get: () => n.value,
    subscribe: ((t) => ({ unsubscribe: e(n, i(t), { flush: "sync" }) }))
  });
}
function s(n) {
  return Object.assign(n, {
    set: (t) => {
      n.value = typeof t == "function" ? t(n.value) : t;
    },
    get: () => n.value,
    subscribe: ((t) => ({ unsubscribe: e(n, i(t), { flush: "sync" }) }))
  });
}
function l() {
  const n = /* @__PURE__ */ new Set();
  return {
    createOptionsStore: !0,
    wrapExternalAtoms: !0,
    addSubscription: (t) => {
      n.add(t);
    },
    unmount: () => {
      n.forEach((t) => t.unsubscribe()), n.clear();
    },
    schedule: (t) => queueMicrotask(() => t()),
    createReadonlyAtom: (t, u) => o(c(() => t())),
    createWritableAtom: (t, u) => s(a(t)),
    untrack: (t) => t(),
    batch: (t) => t()
  };
}
export {
  l as vueReactivity
};
