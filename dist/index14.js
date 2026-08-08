import { tableMemo as b, skipFirstRun as M, copyInstancePropertiesWithoutMemos as v } from "./index38.js";
import { table_autoResetPageIndex as U } from "./index53.js";
import { column_getCanSort as y, column_getSortFn as D } from "./index54.js";
function V() {
  return (c) => {
    const i = c;
    return b({
      feature: "rowSortingFeature",
      table: i,
      fnName: "table.getSortedRowModel",
      memoDeps: () => {
        var d;
        return [(d = i.atoms.sorting) == null ? void 0 : d.get(), i.getPreSortedRowModel()];
      },
      fn: () => F(i),
      onAfterUpdate: M(() => U(i))
    });
  };
}
function F(c) {
  var w;
  const i = c.getPreSortedRowModel(), d = (w = c.atoms.sorting) == null ? void 0 : w.get();
  if (!i.rows.length || !(d != null && d.length)) return i;
  const u = [], a = d.filter((n) => {
    const t = c.getColumn(n.id);
    return t ? y(t) : !1;
  });
  if (!a.length) return i;
  const g = [];
  for (let n = 0; n < a.length; n++) {
    const t = a[n], r = c.getColumn(t.id);
    r && g.push({
      id: t.id,
      desc: t.desc,
      sortUndefined: r.columnDef.sortUndefined,
      invertSorting: r.columnDef.invertSorting,
      sortFn: D(r)
    });
  }
  const R = (n, t) => {
    for (let r = 0; r < g.length; r++) {
      const e = g[r], o = e.sortUndefined, f = e.desc;
      let s = 0;
      if (o) {
        const S = n.getValue(e.id), h = t.getValue(e.id), l = S === void 0, p = h === void 0;
        if (l && p) continue;
        if (l || p) {
          if (o === "first") return l ? -1 : 1;
          if (o === "last") return l ? 1 : -1;
          s = l ? o : -o;
        }
      }
      if (s === 0 && (s = e.sortFn(n, t, e.id)), s !== 0)
        return f && (s *= -1), e.invertSorting && (s *= -1), s;
    }
    return n.index - t.index;
  }, m = (n) => {
    const t = n.slice();
    t.sort(R);
    let r = !1;
    for (let e = 0; e < t.length; e++) {
      const o = t[e];
      if (o !== n[e] && (r = !0), o.subRows.length) {
        const f = m(o.subRows);
        if (f.changed) {
          const s = Object.create(Object.getPrototypeOf(o));
          v(s, o), s.subRows = f.rows, t[e] = s, u.push(s), r = !0;
        } else u.push(o);
      } else u.push(o);
    }
    return {
      rows: t,
      changed: r
    };
  };
  return {
    rows: m(i.rows).rows,
    flatRows: u,
    rowsById: i.rowsById
  };
}
export {
  V as createSortedRowModel
};
