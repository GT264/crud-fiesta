var o = { background: "{content.border.color}", borderRadius: "{content.border.radius}", height: ".75rem" }, r = { color: "{form.field.icon.color}" }, e = { background: "{overlay.popover.background}", borderColor: "{overlay.popover.border.color}", borderRadius: "{overlay.popover.border.radius}", color: "{overlay.popover.color}", padding: "{overlay.popover.padding}", shadow: "{overlay.popover.shadow}" }, a = { gap: "0.5rem" }, d = { light: { strength: { weakBackground: "{red.500}", mediumBackground: "{amber.500}", strongBackground: "{green.500}" } }, dark: { strength: { weakBackground: "{red.400}", mediumBackground: "{amber.400}", strongBackground: "{green.400}" } } }, n = { meter: o, icon: r, overlay: e, content: a, colorScheme: d };
export {
  d as colorScheme,
  a as content,
  n as default,
  r as icon,
  o as meter,
  e as overlay
};
