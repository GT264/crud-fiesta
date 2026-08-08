function u() {
  return !0;
}
const c = Symbol("merge-proxy"), f = Symbol("merge-proxy-sources"), l = {
  get(r, t, e) {
    return t === c ? e : t === f ? r.sources : r.get(t);
  },
  has(r, t) {
    return r.has(t);
  },
  set: u,
  deleteProperty: u,
  getOwnPropertyDescriptor(r, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return r.get(t);
      },
      set: u,
      deleteProperty: u
    };
  },
  ownKeys(r) {
    return r.keys();
  }
};
function s(r) {
  return r && typeof r == "object" && "value" in r ? r.value : r;
}
function i(...r) {
  const t = r.flatMap((e) => typeof e == "object" && e !== null && f in e && Array.isArray(e[f]) ? e[f] : [e]);
  return new Proxy({
    sources: t,
    get(e) {
      for (let n = t.length - 1; n >= 0; n--) {
        const o = s(t[n])[e];
        if (o !== void 0) return o;
      }
    },
    has(e) {
      for (let n = t.length - 1; n >= 0; n--) if (e in s(t[n])) return !0;
      return !1;
    },
    keys() {
      const e = [];
      for (const n of t) e.push(...Object.keys(s(n)));
      return [...Array.from(new Set(e))];
    }
  }, l);
}
function y(...r) {
  const t = {};
  for (let e of r)
    if (e = s(e), !!e)
      for (const n of Reflect.ownKeys(e)) {
        const o = e[n];
        o !== void 0 && (t[n] = o);
      }
  return t;
}
export {
  y as flatMerge,
  i as mergeProxy
};
