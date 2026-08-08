function h(n) {
  var c, i;
  if (!n._columnPrototype) {
    n._columnPrototype = { table: n };
    const u = Object.values(n._features);
    for (let e = 0; e < u.length; e++) (i = (c = u[e]).assignColumnPrototype) == null || i.call(c, n._columnPrototype, n);
  }
  return n._columnPrototype;
}
function v(n, c, i, u) {
  const e = {
    ...n.getDefaultColumnDef(),
    ...c
  }, t = e.accessorKey, d = t === void 0 ? void 0 : String(t), a = e.id ?? (d == null ? void 0 : d.replaceAll(".", "_")) ?? (typeof e.header == "string" ? e.header : void 0);
  let l;
  if (e.accessorFn) l = e.accessorFn;
  else if (t !== void 0) if (typeof t == "string" && t.includes(".")) {
    const r = t.split(".");
    l = (g) => {
      let s = g;
      for (let f = 0; f < r.length; f++) {
        const m = r[f];
        s = s == null ? void 0 : s[m], process.env.NODE_ENV === "development" && s === void 0 && console.warn(`"${m}" in deeply nested key "${t}" returned undefined.`);
      }
      return s;
    };
  } else l = (r) => r[e.accessorKey];
  if (!a)
    throw process.env.NODE_ENV === "development" ? new Error(e.accessorFn ? "coreColumnsFeature require an id when using an accessorFn" : "coreColumnsFeature require an id when using a non-string header") : new Error();
  const y = h(n), o = Object.create(y);
  o.accessorFn = l, o.columnDef = e, o.columns = [], o.depth = i, o.id = `${String(a)}`, o.parent = u;
  const p = n._columnInstanceInitFns;
  for (let r = 0; r < p.length; r++) p[r](o);
  return o;
}
export {
  v as constructColumn
};
