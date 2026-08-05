import { onUnmounted as w } from "vue";
import { usePage as b } from "@inertiajs/vue3";
function k(c, a, p, u, m, f) {
  const y = b();
  let i = null;
  async function v(s) {
    var o, n, t;
    try {
      const e = { format: s };
      p.value && (e.search = p.value), u.value && (e.sort_field = u.value, e.sort_order = m.value), Object.keys(f.value).length > 0 && (e.filters = f.value);
      const r = await fetch(`/${c}/export/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": y.props.csrf_token ?? ""
        },
        body: JSON.stringify(e)
      });
      if (!r.ok) {
        const g = await r.json().catch(() => ({ message: "Export request failed" }));
        (o = a.value) == null || o.add({ severity: "error", summary: "Export Error", detail: g.message || "Export request failed", life: 5e3 });
        return;
      }
      const { export_id: d } = await r.json();
      (n = a.value) == null || n.add({ severity: "info", summary: "Export", detail: "Export started — preparing your file...", life: 12e4 }), E(d);
    } catch (e) {
      (t = a.value) == null || t.add({ severity: "error", summary: "Export Error", detail: "Export failed: " + (e.message || "Unknown error"), life: 5e3 });
    }
  }
  function E(s) {
    l(), i = setInterval(async () => {
      var o, n;
      try {
        const t = await fetch(`/${c}/export/status/${s}`, {
          headers: { Accept: "application/json" }
        });
        if (!t.ok) {
          console.warn("[crud-fiesta] Export status returned non-OK:", t.status);
          return;
        }
        const e = await t.json();
        if (e.status === "queued" || e.status === "processing") {
          const r = e.status === "queued" ? "Export started — preparing your file..." : `Exporting ${e.processed ?? 0} of ${e.total ?? 0} records...`;
          (o = a.value) == null || o.add({ severity: "info", summary: "Export", detail: r, life: 12e4 });
        } else e.status === "completed" ? (l(), x(s)) : e.status === "failed" && (l(), (n = a.value) == null || n.add({ severity: "error", summary: "Export Failed", detail: "Export failed: " + (e.error || "Unknown error"), life: 1e4 }));
      } catch (t) {
        console.warn("[crud-fiesta] Export polling error:", t);
      }
    }, 2e3);
  }
  async function x(s) {
    var d;
    (d = a.value) == null || d.add({ severity: "info", summary: "Downloading...", detail: "Your export file is being prepared", life: 5e3 });
    const o = `/${c}/export/download/${s}`, t = await (await fetch(o)).blob(), e = URL.createObjectURL(t), r = document.createElement("a");
    r.href = e, r.download = "", document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(e);
  }
  function l() {
    i && (clearInterval(i), i = null);
  }
  return w(() => {
    l();
  }), { onExport: v };
}
export {
  k as useExport
};
