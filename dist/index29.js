import { ref as u } from "vue";
import { usePage as a, router as i } from "@inertiajs/vue3";
function f() {
  const t = a(), r = u(null), e = /* @__PURE__ */ new Set();
  return i.on("finish", () => {
    var o, c;
    const s = t.props.flash;
    s != null && s.success && !e.has("success:" + s.success) && (e.add("success:" + s.success), (o = r.value) == null || o.add({ severity: "success", summary: "Success", detail: s.success, life: 5e3 })), s != null && s.error && !e.has("error:" + s.error) && (e.add("error:" + s.error), (c = r.value) == null || c.add({ severity: "error", summary: "Error", detail: s.error, life: 5e3 }));
  }), { toastRef: r };
}
export {
  f as useFlashToasts
};
