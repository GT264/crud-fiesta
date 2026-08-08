var T = Object.defineProperty;
var w = (e, s, i) => s in e ? T(e, s, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[s] = i;
var o = (e, s, i) => w(e, typeof s != "symbol" ? s + "" : s, i);
import { isVNode as d } from "vue";
let g = 1;
var E = class {
  constructor() {
    o(this, "subscribers");
    o(this, "toasts");
    o(this, "dismissedToasts");
    o(this, "subscribe", (e) => (this.subscribers.push(e), () => {
      const s = this.subscribers.indexOf(e);
      this.subscribers.splice(s, 1);
    }));
    o(this, "publish", (e) => {
      this.subscribers.forEach((s) => s(e));
    });
    o(this, "addToast", (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    });
    o(this, "create", (e) => {
      var b;
      const { message: s, ...i } = e, c = typeof e.id == "number" || e.id && ((b = e.id) == null ? void 0 : b.length) > 0 ? e.id : g++, u = this.toasts.find((l) => l.id === c), n = e.dismissible === void 0 ? !0 : e.dismissible;
      return this.dismissedToasts.has(c) && this.dismissedToasts.delete(c), u ? this.toasts = this.toasts.map((l) => l.id === c ? (this.publish({
        ...l,
        ...e,
        id: c,
        title: s
      }), {
        ...l,
        ...e,
        id: c,
        dismissible: n,
        title: s
      }) : l) : this.addToast({
        title: s,
        ...i,
        dismissible: n,
        id: c
      }), c;
    });
    o(this, "dismiss", (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((s) => s({
      id: e,
      dismiss: !0
    })))) : this.toasts.forEach((s) => {
      this.subscribers.forEach((i) => i({
        id: s.id,
        dismiss: !0
      }));
    }), e));
    o(this, "message", (e, s) => this.create({
      ...s,
      message: e,
      type: "default"
    }));
    o(this, "error", (e, s) => this.create({
      ...s,
      type: "error",
      message: e
    }));
    o(this, "success", (e, s) => this.create({
      ...s,
      type: "success",
      message: e
    }));
    o(this, "info", (e, s) => this.create({
      ...s,
      type: "info",
      message: e
    }));
    o(this, "warning", (e, s) => this.create({
      ...s,
      type: "warning",
      message: e
    }));
    o(this, "loading", (e, s) => this.create({
      ...s,
      type: "loading",
      message: e
    }));
    o(this, "promise", (e, s) => {
      if (!s) return;
      let i;
      s.loading !== void 0 && (i = this.create({
        ...s,
        promise: e,
        type: "loading",
        message: s.loading,
        description: typeof s.description != "function" ? s.description : void 0
      }));
      const c = Promise.resolve(e instanceof Function ? e() : e);
      let u = i !== void 0, n;
      const b = c.then(async (t) => {
        if (n = ["resolve", t], d(t))
          u = !1, this.create({
            id: i,
            type: "default",
            message: t
          });
        else if (x(t) && !t.ok) {
          u = !1;
          const r = typeof s.error == "function" ? await s.error(`HTTP error! status: ${t.status}`) : s.error, p = typeof s.description == "function" ? await s.description(`HTTP error! status: ${t.status}`) : s.description, m = typeof r == "object" && !d(r) ? r : {
            message: r || "",
            id: i || ""
          };
          this.create({
            id: i,
            type: "error",
            description: p,
            ...m
          });
        } else if (t instanceof Error) {
          u = !1;
          const r = typeof s.error == "function" ? await s.error(t) : s.error, p = typeof s.description == "function" ? await s.description(t) : s.description, m = typeof r == "object" && !d(r) ? r : {
            message: r || "",
            id: i || ""
          };
          this.create({
            id: i,
            type: "error",
            description: p,
            ...m
          });
        } else if (s.success !== void 0) {
          u = !1;
          const r = typeof s.success == "function" ? await s.success(t) : s.success, p = typeof s.description == "function" ? await s.description(t) : s.description, m = typeof r == "object" && !d(r) ? r : {
            message: r || "",
            id: i || ""
          };
          this.create({
            id: i,
            type: "success",
            description: p,
            ...m
          });
        }
      }).catch(async (t) => {
        if (n = ["reject", t], s.error !== void 0) {
          u = !1;
          const h = typeof s.error == "function" ? await s.error(t) : s.error, r = typeof s.description == "function" ? await s.description(t) : s.description, y = typeof h == "object" && !d(h) ? h : {
            message: h || "",
            id: i || ""
          };
          this.create({
            id: i,
            type: "error",
            description: r,
            ...y
          });
        }
      }).finally(() => {
        var t;
        u && (this.dismiss(i), i = void 0), (t = s.finally) == null || t.call(s);
      }), l = () => new Promise((t, h) => b.then(() => n[0] === "reject" ? h(n[1]) : t(n[1])).catch(h));
      return typeof i != "string" && typeof i != "number" ? { unwrap: l } : Object.assign(i, { unwrap: l });
    });
    o(this, "custom", (e, s) => {
      const i = (s == null ? void 0 : s.id) || g++, c = this.toasts.find((n) => n.id === i), u = (s == null ? void 0 : s.dismissible) === void 0 ? !0 : s.dismissible;
      return this.dismissedToasts.has(i) && this.dismissedToasts.delete(i), c ? this.toasts = this.toasts.map((n) => n.id === i ? (this.publish({
        ...n,
        component: e,
        dismissible: u,
        id: i,
        ...s
      }), {
        ...n,
        component: e,
        dismissible: u,
        id: i,
        ...s
      }) : n) : this.addToast({
        component: e,
        dismissible: u,
        id: i,
        ...s
      }), i;
    });
    o(this, "getActiveToasts", () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
};
const f = new E();
function v(e, s) {
  const i = (s == null ? void 0 : s.id) || g++;
  return f.create({
    message: e,
    id: i,
    type: "default",
    ...s
  }), i;
}
const x = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", R = v, j = () => f.toasts, S = () => f.getActiveToasts(), H = Object.assign(R, {
  success: f.success,
  info: f.info,
  warning: f.warning,
  error: f.error,
  custom: f.custom,
  message: f.message,
  promise: f.promise,
  dismiss: f.dismiss,
  loading: f.loading
}, {
  getHistory: j,
  getToasts: S
});
export {
  H as toast
};
