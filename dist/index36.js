const r = String.prototype.replace, e = /%20/g, n = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, o = {
  RFC1738: function(t) {
    return r.call(t, e, "+");
  },
  RFC3986: function(t) {
    return String(t);
  }
}, c = n.RFC1738, s = n.RFC3986;
export {
  c as RFC1738,
  s as default,
  o as formatters
};
