var o = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" }, a = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, n = { focusBackground: "{navigation.item.focus.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}" } }, i = { padding: "{navigation.submenu.label.padding}", fontWeight: "{navigation.submenu.label.font.weight}", background: "{navigation.submenu.label.background}", color: "{navigation.submenu.label.color}" }, t = { borderColor: "{content.border.color}" }, r = { root: o, list: a, item: n, submenuLabel: i, separator: t };
export {
  r as default,
  n as item,
  a as list,
  o as root,
  t as separator,
  i as submenuLabel
};
