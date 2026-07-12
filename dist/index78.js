var o = { transitionDuration: "{transition.duration}" }, r = { background: "{content.border.color}", borderRadius: "{content.border.radius}", size: "3px" }, n = { background: "{primary.color}" }, a = { width: "20px", height: "20px", borderRadius: "50%", background: "{content.border.color}", hoverBackground: "{content.border.color}", content: { borderRadius: "50%", hoverBackground: "{content.background}", width: "16px", height: "16px", shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)" }, focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, t = { light: { handle: { content: { background: "{surface.0}" } } }, dark: { handle: { content: { background: "{surface.950}" } } } }, e = { root: o, track: r, range: n, handle: a, colorScheme: t };
export {
  t as colorScheme,
  e as default,
  a as handle,
  n as range,
  o as root,
  r as track
};
