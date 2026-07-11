var o = { transitionDuration: "{transition.duration}" }, r = { width: "1.5rem", height: "1.5rem", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, e = { shadow: "{overlay.popover.shadow}", borderRadius: "{overlay.popover.borderRadius}" }, a = { light: { panel: { background: "{surface.800}", borderColor: "{surface.900}" }, handle: { color: "{surface.0}" } }, dark: { panel: { background: "{surface.900}", borderColor: "{surface.700}" }, handle: { color: "{surface.0}" } } }, s = { root: o, preview: r, panel: e, colorScheme: a };
export {
  a as colorScheme,
  s as default,
  e as panel,
  r as preview,
  o as root
};
