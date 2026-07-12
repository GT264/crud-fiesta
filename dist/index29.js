var o = { borderColor: "transparent", borderWidth: "0", borderRadius: "0", padding: "0" }, r = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "0 0 1px 0", padding: "0.75rem 1rem", borderRadius: "0" }, t = { background: "{content.background}", color: "{content.color}", borderColor: "transparent", borderWidth: "0", padding: "0", borderRadius: "0" }, d = { background: "{content.background}", color: "{content.color}", borderColor: "{content.border.color}", borderWidth: "1px 0 0 0", padding: "0.75rem 1rem", borderRadius: "0" }, e = { borderColor: "{content.border.color}", borderWidth: "0 0 1px 0" }, n = { borderColor: "{content.border.color}", borderWidth: "1px 0 0 0" }, a = { root: o, header: r, content: t, footer: d, paginatorTop: e, paginatorBottom: n };
export {
  t as content,
  a as default,
  d as footer,
  r as header,
  n as paginatorBottom,
  e as paginatorTop,
  o as root
};
