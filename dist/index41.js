function c(r) {
  var d, t;
  if (!r._headerPrototype) {
    r._headerPrototype = { table: r };
    const o = Object.values(r._features);
    for (let e = 0; e < o.length; e++) (t = (d = o[e]).assignHeaderPrototype) == null || t.call(d, r._headerPrototype, r);
  }
  return r._headerPrototype;
}
function h(r, d, t) {
  const o = c(r), e = Object.create(o);
  e.colSpan = 0, e.column = d, e.depth = t.depth, e.headerGroup = null, e.id = t.id ?? d.id, e.index = t.index, e.isPlaceholder = !!t.isPlaceholder, e.placeholderId = t.placeholderId, e.rowSpan = 0, e.subHeaders = [];
  const a = r._headerInstanceInitFns;
  for (let n = 0; n < a.length; n++) a[n](e);
  return e;
}
export {
  h as constructHeader
};
