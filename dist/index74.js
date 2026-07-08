var o = { transitionDuration: "{transition.duration}" }, r = { size: "9px", borderRadius: "{border.radius.sm}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, s = { light: { bar: { background: "{surface.100}" } }, dark: { bar: { background: "{surface.800}" } } }, a = { root: o, bar: r, colorScheme: s };
export {
  r as bar,
  s as colorScheme,
  a as default,
  o as root
};
