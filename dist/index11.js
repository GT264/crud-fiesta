import { stringify as $ } from "./index23.js";
import { parse as w } from "./index24.js";
function a() {
  return a = Object.assign ? Object.assign.bind() : function(g) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (g[r] = t[r]);
    }
    return g;
  }, a.apply(null, arguments);
}
class f {
  constructor(e, t, r) {
    var n, i;
    this.name = e, this.definition = t, this.bindings = (n = t.bindings) != null ? n : {}, this.wheres = (i = t.wheres) != null ? i : {}, this.config = r;
  }
  get template() {
    const e = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return e === "" ? "/" : e;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var e, t;
    return (e = (t = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : t.map((r) => ({ name: r.replace(/{|\??}/g, ""), required: !/\?}$/.test(r) }))) != null ? e : [];
  }
  matchesUrl(e) {
    var t;
    if (!this.definition.methods.includes("GET")) return !1;
    const r = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (o, l, p, d) => {
      var h;
      const u = `(?<${p}>${((h = this.wheres[p]) == null ? void 0 : h.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return d ? `(${l}${u})?` : `${l}${u}`;
    }).replace(/^\w+:\/\//, ""), [n, i] = e.replace(/^\w+:\/\//, "").split("?"), s = (t = new RegExp(`^${r}/?$`).exec(n)) != null ? t : new RegExp(`^${r}/?$`).exec(decodeURI(n));
    if (s) {
      for (const o in s.groups) s.groups[o] = typeof s.groups[o] == "string" ? decodeURIComponent(s.groups[o]) : s.groups[o];
      return { params: s.groups, query: w(i) };
    }
    return !1;
  }
  compile(e) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (t, r, n) => {
      var i, s;
      if (!n && [null, void 0].includes(e[r])) throw new Error(`Ziggy error: '${r}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r] && !new RegExp(`^${n ? `(${this.wheres[r]})?` : this.wheres[r]}$`).test((s = e[r]) != null ? s : "")) throw new Error(`Ziggy error: '${r}' parameter '${e[r]}' does not match required format '${this.wheres[r]}' for route '${this.name}'.`);
      return encodeURI((i = e[r]) != null ? i : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class b extends String {
  constructor(e, t, r = !0, n) {
    if (super(), this.t = n ?? (typeof Ziggy < "u" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy), !this.t && typeof document < "u" && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = a({}, this.t, { absolute: r }), e) {
      if (!this.t.routes[e]) throw new Error(`Ziggy error: route '${e}' is not in the route list.`);
      this.i = new f(e, this.t.routes[e], this.t), this.o = this.u(t);
    }
  }
  toString() {
    const e = Object.keys(this.o).filter((t) => !this.i.parameterSegments.some(({ name: r }) => r === t)).filter((t) => t !== "_query").reduce((t, r) => a({}, t, { [r]: this.o[r] }), {});
    return this.i.compile(this.o) + $(a({}, e, this.o._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: (t, r) => typeof t == "boolean" ? Number(t) : r(t) });
  }
  h(e) {
    e ? this.t.absolute && e.startsWith("/") && (e = this.l().host + e) : e = this.m();
    let t = {};
    const [r, n] = Object.entries(this.t.routes).find(([i, s]) => t = new f(i, s, this.t).matchesUrl(e)) || [void 0, void 0];
    return a({ name: r }, t, { route: n });
  }
  m() {
    const { host: e, pathname: t, search: r } = this.l();
    return (this.t.absolute ? e + t : t.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r;
  }
  current(e, t) {
    const { name: r, params: n, query: i, route: s } = this.h();
    if (!e) return r;
    const o = new RegExp(`^${e.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(r);
    if ([null, void 0].includes(t) || !o) return o;
    const l = new f(r, s, this.t);
    t = this.u(t, l);
    const p = a({}, n, i);
    if (Object.values(t).every((h) => !h) && !Object.values(p).some((h) => h !== void 0)) return !0;
    const d = (h, u) => Object.entries(h).every(([c, m]) => Array.isArray(m) && Array.isArray(u[c]) ? m.every((y) => u[c].includes(y) || u[c].includes(decodeURIComponent(y))) : typeof m == "object" && typeof u[c] == "object" && m !== null && u[c] !== null ? d(m, u[c]) : u[c] == m || u[c] == decodeURIComponent(m));
    return d(t, p);
  }
  l() {
    var e, t, r, n, i, s;
    const { host: o = "", pathname: l = "", search: p = "" } = typeof window < "u" ? window.location : {};
    return { host: (e = (t = this.t.location) == null ? void 0 : t.host) != null ? e : o, pathname: (r = (n = this.t.location) == null ? void 0 : n.pathname) != null ? r : l, search: (i = (s = this.t.location) == null ? void 0 : s.search) != null ? i : p };
  }
  get params() {
    const { params: e, query: t } = this.h();
    return a({}, e, t);
  }
  get routeParams() {
    return this.h().params;
  }
  get queryParams() {
    return this.h().query;
  }
  has(e) {
    return this.t.routes.hasOwnProperty(e);
  }
  u(e = {}, t = this.i) {
    e != null || (e = {}), e = ["string", "number"].includes(typeof e) ? [e] : e;
    const r = t.parameterSegments.filter(({ name: n }) => !this.t.defaults[n]);
    return Array.isArray(e) ? e = e.reduce((n, i, s) => a({}, n, r[s] ? { [r[s].name]: i } : typeof i == "object" ? i : { [i]: "" }), {}) : r.length !== 1 || e.hasOwnProperty(r[0].name) || !e.hasOwnProperty(Object.values(t.bindings)[0]) && !e.hasOwnProperty("id") || (e = { [r[0].name]: e }), a({}, this.p(t), this.$(e, t));
  }
  p(e) {
    return e.parameterSegments.filter(({ name: t }) => this.t.defaults[t]).reduce((t, { name: r }, n) => a({}, t, { [r]: this.t.defaults[r] }), {});
  }
  $(e, { bindings: t, parameterSegments: r }) {
    return Object.entries(e).reduce((n, [i, s]) => {
      if (!s || typeof s != "object" || Array.isArray(s) || !r.some(({ name: l }) => l === i)) return a({}, n, { [i]: s });
      const o = s.hasOwnProperty(t[i]) ? t[i] : s.hasOwnProperty("id") ? "id" : void 0;
      if (o === void 0) throw new Error(`Ziggy error: object passed as '${i}' parameter is missing route model binding key '${t[i]}'.`);
      return a({}, n, { [i]: s[o] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function j(g, e, t, r) {
  const n = new b(g, e, t, r);
  return g ? n.toString() : n;
}
export {
  j as route
};
