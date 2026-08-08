import { makeObjectMap as p } from "./index38.js";
function a(t) {
  var r, n;
  if (!t._rowPrototype) {
    t._rowPrototype = { table: t };
    const s = Object.values(t._features);
    for (let e = 0; e < s.length; e++) (n = (r = s[e]).assignRowPrototype) == null || n.call(r, t._rowPrototype, t);
  }
  return t._rowPrototype;
}
const f = (t, r, n, s, e, _, u) => {
  const w = a(t), o = Object.create(w);
  o._displayIndexCache = -1, o._uniqueValuesCache = p(), o._valuesCache = p(), o.depth = e, o.id = r, o.index = s, o.original = n, o.parentId = u, o.subRows = [];
  const i = t._rowInstanceInitFns;
  for (let c = 0; c < i.length; c++) i[c](o);
  return o;
};
export {
  f as constructRow
};
