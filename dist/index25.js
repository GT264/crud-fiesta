import { usePage as c } from "@inertiajs/vue3";
function p() {
  const u = c();
  function e(r, t) {
    var o;
    if (!r) return "";
    let n = ((o = u.props.crudLang) == null ? void 0 : o[r]) ?? r;
    if (t)
      for (const [a, i] of Object.entries(t))
        n = n.replace(`:${a}`, String(i));
    return n;
  }
  return { crudT: e };
}
export {
  p as useCrudTranslation
};
