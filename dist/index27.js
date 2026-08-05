import { clsx as d } from "clsx";
import { twMerge as a } from "tailwind-merge";
function f(...t) {
  return a(d(t));
}
const p = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", b = "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
function g(t, n) {
  const r = {};
  for (const i of t) {
    if (!i.filter_config) continue;
    const o = i.field, s = i.filter_config;
    if (s.type === "date_range") {
      const e = n[o + "_start"], l = n[o + "_end"];
      (e || l) && (r[o] = { type: "date_range", value: { start: e || "", end: l || "" } });
    } else {
      const e = n[o];
      e != null && e !== "" && (!Array.isArray(e) || e.length > 0) && (r[o] = { type: s.type, value: e });
    }
  }
  return r;
}
export {
  g as buildFilterPayload,
  f as cn,
  p as inputClasses,
  b as textareaClasses
};
