function N(t, n) {
  return typeof t == "function" ? t(n) : t;
}
function F(t) {
  if (Array.isArray(t)) return t.map(F);
  if (t && typeof t == "object") {
    const n = Object.getPrototypeOf(t);
    if (n !== Object.prototype && n !== null) return t;
    const o = n === null ? O() : {}, c = Object.keys(t);
    for (let e = 0; e < c.length; e++) {
      const s = c[e];
      Object.defineProperty(o, s, {
        configurable: !0,
        enumerable: !0,
        value: F(t[s]),
        writable: !0
      });
    }
    return o;
  }
  return t;
}
function _(t, n) {
  const o = Object.keys(n), c = t;
  for (let e = 0; e < o.length; e++) {
    const s = o[e];
    !s.startsWith("_memo_") && s !== "_cellsCache" && (c[s] = n[s]);
  }
  return t;
}
function O() {
  return /* @__PURE__ */ Object.create(null);
}
function w(t, n) {
  return Object.prototype.hasOwnProperty.call(t, n);
}
function E(t) {
  return t instanceof Function;
}
function M(t, n) {
  const o = [], c = (e) => {
    e.forEach((s) => {
      o.push(s);
      const r = n(s);
      r.length && c(r);
    });
  };
  return c(t), o;
}
const $ = ({ fn: t, memoDeps: n, onAfterCompare: o, onAfterUpdate: c, onBeforeCompare: e, onBeforeUpdate: s }) => {
  let r = [], i;
  return (u) => {
    e == null || e();
    const l = n == null ? void 0 : n(u);
    let f = !l || l.length !== (r == null ? void 0 : r.length);
    if (!f && l) {
      for (let a = 0; a < l.length; a++) if (l[a] !== r[a]) {
        f = !0;
        break;
      }
    }
    return o == null || o(f), f && (r = l, s == null || s(), i = t(...l ?? []), c == null || c(i)), i;
  };
};
function P(t) {
  let n = !1;
  return () => {
    if (!n) {
      n = !0;
      return;
    }
    t();
  };
}
const k = (t, n) => {
  for (t = String(t); t.length < n; ) t = " " + t;
  return t;
};
function b({ feature: t, fnName: n, objectId: o, onAfterUpdate: c, table: e, ...s }) {
  let r, i, p = 0, u;
  if (process.env.NODE_ENV === "development") {
    const { debugAll: g } = e.options, { parentName: h } = m(n, "."), y = e.options[`debug${(h != "table" ? h + "s" : h).replace(h, h.charAt(0).toUpperCase() + h.slice(1))}`], d = t ? e.options[`debug${t.charAt(0).toUpperCase() + t.slice(1)}`] : !1;
    u = g || y || d;
  }
  function l(g, h) {
    var d;
    const y = p === 0 ? "(1st run)" : "(rerun #" + p + ")";
    p++, console.groupCollapsed(`%c⏱ ${k(`${g.toFixed(1)} ms`, 12)} %c${y}%c ${n}%c ${o ? `(${n.split(".")[0]}Id: ${o})` : ""}`, `font-size: .6rem; font-weight: bold; ${`color: hsl(
        ${Math.max(0, Math.min(120 - Math.log10(g) * 60, 120))}deg 100% 31%);`} `, `color: ${p < 2 ? "#FF00FF" : "#FF1493"}`, "color: #666", "color: #87CEEB"), console.info({
      feature: t,
      state: e.store.state,
      deps: (d = s.memoDeps) == null ? void 0 : d.toString()
    }), console.trace(), console.groupEnd();
  }
  const f = () => {
    if (!c) return;
    const { schedule: g, untrack: h } = e._reactivity;
    g(() => h(() => c()));
  }, a = process.env.NODE_ENV === "development" ? {
    onBeforeCompare: () => {
    },
    onAfterCompare: (g) => {
    },
    onBeforeUpdate: () => {
      u && (r = performance.now());
    },
    onAfterUpdate: () => {
      u && (i = performance.now(), l(Math.round((i - r) * 100) / 100)), f();
    }
  } : { onAfterUpdate: () => {
    f();
  } };
  return $({
    ...s,
    ...a
  });
}
function m(t, n = "_") {
  const [o, c] = t.split(n);
  return {
    fnKey: c,
    fnName: `${o}.${c}`,
    parentName: o
  };
}
function j(t, n, o) {
  for (const [c, { fn: e, memoDeps: s }] of Object.entries(o)) {
    const { fnKey: r, fnName: i } = m(c);
    n[r] = s ? b({
      memoDeps: s,
      fn: e,
      fnName: i,
      table: n,
      feature: t
    }) : e;
  }
}
function C(t, n, o, c) {
  for (const [e, { fn: s, memoDeps: r }] of Object.entries(c)) {
    const { fnKey: i, fnName: p } = m(e);
    if (r) {
      const u = `_memo_${i}`;
      n[i] = function(...l) {
        if (!this[u]) {
          const f = this;
          this[u] = b({
            memoDeps: (a) => r(f, a),
            fn: (...a) => s(f, ...a),
            fnName: p,
            objectId: f.id,
            table: o,
            feature: t
          });
        }
        return this[u](...l);
      };
    } else n[i] = function(...u) {
      return s(this, ...u);
    };
  }
}
function I(t, n, o, ...c) {
  var e;
  return ((e = t[n]) == null ? void 0 : e.call(t, ...c)) ?? o(t, ...c);
}
export {
  C as assignPrototypeAPIs,
  j as assignTableAPIs,
  I as callMemoOrStaticFn,
  F as cloneState,
  _ as copyInstancePropertiesWithoutMemos,
  M as flattenBy,
  N as functionalUpdate,
  m as getFunctionNameInfo,
  w as hasOwn,
  E as isFunction,
  O as makeObjectMap,
  $ as memo,
  P as skipFirstRun,
  b as tableMemo
};
