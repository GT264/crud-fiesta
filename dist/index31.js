var o = { transitionDuration: "{transition.duration}" }, r = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.popover.shadow}", padding: "{overlay.popover.padding}" }, e = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", padding: "0 0 0.5rem 0" }, a = { gap: "0.5rem", fontWeight: "500" }, c = { width: "2.5rem", sm: { width: "2rem" }, lg: { width: "3rem" }, borderColor: "{form.field.border.color}", hoverBorderColor: "{form.field.border.color}", activeBorderColor: "{form.field.border.color}", borderRadius: "{form.field.border.radius}", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, d = { color: "{form.field.icon.color}" }, n = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" }, t = { hoverBackground: "{content.hover.background}", color: "{content.color}", hoverColor: "{content.hover.color}", padding: "0.25rem 0.5rem", borderRadius: "{content.border.radius}" }, i = { borderColor: "{content.border.color}", gap: "{overlay.popover.padding}" }, s = { margin: "0.5rem 0 0 0" }, l = { padding: "0.25rem", fontWeight: "500", color: "{content.color}" }, u = { hoverBackground: "{content.hover.background}", selectedBackground: "{primary.color}", rangeSelectedBackground: "{highlight.background}", color: "{content.color}", hoverColor: "{content.hover.color}", selectedColor: "{primary.contrast.color}", rangeSelectedColor: "{highlight.color}", width: "2rem", height: "2rem", borderRadius: "50%", padding: "0.25rem", focusRing: { width: "{focus.ring.width}", style: "{focus.ring.style}", color: "{focus.ring.color}", offset: "{focus.ring.offset}", shadow: "{focus.ring.shadow}" } }, g = { margin: "0.5rem 0 0 0" }, h = { padding: "0.375rem", borderRadius: "{content.border.radius}" }, f = { margin: "0.5rem 0 0 0" }, b = { padding: "0.375rem", borderRadius: "{content.border.radius}" }, m = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}" }, p = { padding: "0.5rem 0 0 0", borderColor: "{content.border.color}", gap: "0.5rem", buttonGap: "0.25rem" }, v = { light: { dropdown: { background: "{surface.100}", hoverBackground: "{surface.200}", activeBackground: "{surface.300}", color: "{surface.600}", hoverColor: "{surface.700}", activeColor: "{surface.800}" }, today: { background: "{surface.200}", color: "{surface.900}" } }, dark: { dropdown: { background: "{surface.800}", hoverBackground: "{surface.700}", activeBackground: "{surface.600}", color: "{surface.300}", hoverColor: "{surface.200}", activeColor: "{surface.100}" }, today: { background: "{surface.700}", color: "{surface.0}" } } }, k = { root: o, panel: r, header: e, title: a, dropdown: c, inputIcon: d, selectMonth: n, selectYear: t, group: i, dayView: s, weekDay: l, date: u, monthView: g, month: h, yearView: f, year: b, buttonbar: m, timePicker: p, colorScheme: v };
export {
  m as buttonbar,
  v as colorScheme,
  u as date,
  s as dayView,
  k as default,
  c as dropdown,
  i as group,
  e as header,
  d as inputIcon,
  h as month,
  g as monthView,
  r as panel,
  o as root,
  n as selectMonth,
  t as selectYear,
  p as timePicker,
  a as title,
  l as weekDay,
  b as year,
  f as yearView
};
