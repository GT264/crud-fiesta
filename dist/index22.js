import { shallowRef as v, isRef as y, watch as T, toValue as m, getCurrentScope as b, onScopeDispose as S } from "vue";
function p(o) {
  return b() ? (S(o), !0) : !1;
}
const d = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const h = () => {
};
function W(o, t) {
  function n(...e) {
    return new Promise((c, i) => {
      Promise.resolve(o(() => t.apply(this, e), { fn: t, thisArg: this, args: e })).then(c).catch(i);
    });
  }
  return n;
}
function x(o, t = {}) {
  let n, e, c = h;
  const i = (l) => {
    clearTimeout(l), c(), c = h;
  };
  let u;
  return (l) => {
    const a = m(o), r = m(t.maxWait);
    return n && i(n), a <= 0 || r !== void 0 && r <= 0 ? (e && (i(e), e = null), Promise.resolve(l())) : new Promise((s, w) => {
      c = t.rejectOnCancel ? w : s, u = l, r && !e && (e = setTimeout(() => {
        n && i(n), e = null, s(u());
      }, r)), n = setTimeout(() => {
        e && i(e), e = null, s(l());
      }, a);
    });
  };
}
function D(o, t = 200, n = {}) {
  return W(
    x(t, n),
    o
  );
}
function F(o, t = 1e3, n = {}) {
  const {
    immediate: e = !0,
    immediateCallback: c = !1
  } = n;
  let i = null;
  const u = v(!1);
  function f() {
    i && (clearInterval(i), i = null);
  }
  function l() {
    u.value = !1, f();
  }
  function a() {
    const r = m(t);
    r <= 0 || (u.value = !0, c && o(), f(), u.value && (i = setInterval(o, r)));
  }
  if (e && d && a(), y(t) || typeof t == "function") {
    const r = T(t, () => {
      u.value && d && a();
    });
    p(r);
  }
  return p(l), {
    isActive: u,
    pause: l,
    resume: a
  };
}
export {
  W as createFilterWrapper,
  x as debounceFilter,
  d as isClient,
  h as noop,
  p as tryOnScopeDispose,
  D as useDebounceFn,
  F as useIntervalFn
};
