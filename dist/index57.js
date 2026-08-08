function s(t) {
  var o, n;
  if (!t._cellPrototype) {
    t._cellPrototype = { table: t };
    const c = Object.values(t._features);
    for (let e = 0; e < c.length; e++) (n = (o = c[e]).assignCellPrototype) == null || n.call(o, t._cellPrototype, t);
  }
  return t._cellPrototype;
}
function i(t, o, n) {
  const c = s(n), e = Object.create(c);
  e.column = t, e.id = `${o.id}_${t.id}`, e.row = o;
  const r = n._cellInstanceInitFns;
  for (let l = 0; l < r.length; l++) r[l](e);
  return e;
}
export {
  i as constructCell
};
