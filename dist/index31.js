import { hasOwn as O, cloneState as v } from "./index38.js";
import { table_syncExternalStateToBaseAtoms as x } from "./index61.js";
import { coreFeatures as N } from "./index62.js";
import { atomToStore as E } from "./index63.js";
import { shallow as $ } from "./index64.js";
function k(r, o = {}) {
  return Object.values(r).forEach((l) => {
    var p;
    o = ((p = l.getInitialState) == null ? void 0 : p.call(l, o)) ?? o;
  }), v(o);
}
function q(r) {
  var I, g;
  const o = r.features.coreReactivityFeature, { aggregationFns: l, columnMeta: p, coreRowModel: _, expandedRowModel: S, facetedMinMaxValues: w, facetedRowModel: M, facetedUniqueValues: A, filterFns: h, filterMeta: C, filteredRowModel: F, groupedRowModel: y, paginatedRowModel: D, sortFns: R, sortedRowModel: j, tableMeta: W, ...T } = r.features, e = {
    _cellInstanceInitFns: [],
    _columnInstanceInitFns: [],
    _features: {
      ...N,
      ...T
    },
    _headerGroupInstanceInitFns: [],
    _headerInstanceInitFns: [],
    _reactivity: o,
    _rowInstanceInitFns: [],
    _rowModelFns: {
      aggregationFns: l,
      filterFns: h,
      sortFns: R
    },
    _rowModels: {},
    atoms: {},
    baseAtoms: {}
  }, f = Object.values(e._features), u = {
    ...f.reduce((n, t) => {
      var a;
      return Object.assign(n, (a = t.getDefaultTableOptions) == null ? void 0 : a.call(t, e));
    }, {}),
    ...r
  };
  if (o.wrapExternalAtoms && u.atoms) for (const [n, t] of Object.entries(u.atoms)) {
    const a = t, s = o.createWritableAtom(a.get(), { debugName: `externalAtom/${n}` });
    u.atoms[n] = s;
    let i = !1;
    const d = a.subscribe((c) => {
      i || s.set(c);
    }), b = s.subscribe((c) => {
      i = !0, a.set(c), i = !1;
    });
    o.addSubscription(d), o.addSubscription(b);
  }
  o.createOptionsStore ? (e.optionsStore = o.createWritableAtom(u, { debugName: "table/optionsStore" }), Object.defineProperty(e, "options", {
    configurable: !0,
    enumerable: !0,
    get() {
      return e.optionsStore.get();
    },
    set(n) {
      e.optionsStore.set(() => n);
    }
  })) : e.options = u, e.initialState = k(e._features, e.options.initialState);
  const m = Object.keys(e.initialState);
  for (let n = 0; n < m.length; n++) {
    const t = m[n];
    e.baseAtoms[t] = o.createWritableAtom(e.initialState[t], { debugName: `table/baseAtoms/${t}` }), e.atoms[t] = o.createReadonlyAtom(() => {
      var b;
      const a = e.options, s = (b = a.atoms) == null ? void 0 : b[t], i = s ? s.get() : e.baseAtoms[t].get();
      if (s) return i;
      const d = a.state;
      if (d && O(d, t)) {
        const c = d[t];
        return c === void 0 ? e.initialState[t] : c;
      }
      return i;
    }, { debugName: `table/atoms/${t}` });
  }
  x(e), e.store = E(o.createReadonlyAtom(() => {
    const n = {};
    for (let t = 0; t < m.length; t++) {
      const a = m[t];
      n[a] = e.atoms[a].get();
    }
    return n;
  }, {
    compare: $,
    debugName: "table/store"
  }));
  for (let n = 0; n < f.length; n++) {
    const t = f[n];
    (I = t.initTableInstanceData) == null || I.call(t, e), t.initCellInstanceData && e._cellInstanceInitFns.push(t.initCellInstanceData.bind(t)), t.initColumnInstanceData && e._columnInstanceInitFns.push(t.initColumnInstanceData.bind(t)), t.initHeaderGroupInstanceData && e._headerGroupInstanceInitFns.push(t.initHeaderGroupInstanceData.bind(t)), t.initHeaderInstanceData && e._headerInstanceInitFns.push(t.initHeaderInstanceData.bind(t)), t.initRowInstanceData && e._rowInstanceInitFns.push(t.initRowInstanceData.bind(t)), (g = t.constructTableAPIs) == null || g.call(t, e);
  }
  if (process.env.NODE_ENV === "development" && (r.debugAll || r.debugTable)) {
    const n = Object.keys(e._features), t = Object.entries({
      coreRowModel: _,
      filteredRowModel: F,
      groupedRowModel: y,
      sortedRowModel: j,
      expandedRowModel: S,
      paginatedRowModel: D,
      facetedRowModel: M,
      facetedMinMaxValues: w,
      facetedUniqueValues: A
    }).filter(([, s]) => s).map(([s]) => s), a = Object.keys(e.initialState);
    console.log(`Constructing Table Instance

  Features:   ${n.join(`
              `)}

  Row Models: ${t.length ? t.join(`
              `) : "(none)"}

  States:     ${a.join(`
              `)}
`, { table: e });
  }
  return e;
}
export {
  q as constructTable,
  k as getInitialTableState
};
