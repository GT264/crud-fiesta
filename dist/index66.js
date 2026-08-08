function d(l) {
  var i;
  const o = (i = l.atoms.columnOrder) == null ? void 0 : i.get();
  return (r) => {
    let s = [];
    if (!(o != null && o.length)) s = r;
    else {
      const g = /* @__PURE__ */ new Map();
      for (let n = 0; n < r.length; n++) {
        const e = r[n];
        g.set(e.id, e);
      }
      for (let n = 0; n < o.length; n++) {
        const e = o[n], t = g.get(e);
        t && (s.push(t), g.delete(e));
      }
      for (let n = 0; n < r.length; n++) {
        const e = r[n];
        g.has(e.id) && s.push(e);
      }
    }
    return c(l, s);
  };
}
function c(l, o) {
  var e;
  const i = ((e = l.atoms.grouping) == null ? void 0 : e.get()) ?? [], { groupedColumnMode: r } = l.options;
  if (!i.length || !r) return o;
  const s = o.filter((t) => !i.includes(t.id));
  if (r === "remove") return s;
  const g = /* @__PURE__ */ new Map();
  for (let t = 0; t < o.length; t++) {
    const u = o[t];
    g.set(u.id, u);
  }
  const n = [];
  for (let t = 0; t < i.length; t++) {
    const u = g.get(i[t]);
    u && n.push(u);
  }
  return [...n, ...s];
}
export {
  c as orderColumns,
  d as table_getOrderColumnsFn
};
