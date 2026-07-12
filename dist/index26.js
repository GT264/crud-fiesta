var o = { background: "{content.background}", borderColor: "{content.border.color}", color: "{content.color}", borderRadius: "{content.border.radius}", shadow: "{overlay.navigation.shadow}", transitionDuration: "{transition.duration}" }, i = { padding: "{navigation.list.padding}", gap: "{navigation.list.gap}" }, a = { focusBackground: "{navigation.item.focus.background}", activeBackground: "{navigation.item.active.background}", color: "{navigation.item.color}", focusColor: "{navigation.item.focus.color}", activeColor: "{navigation.item.active.color}", padding: "{navigation.item.padding}", borderRadius: "{navigation.item.border.radius}", gap: "{navigation.item.gap}", icon: { color: "{navigation.item.icon.color}", focusColor: "{navigation.item.icon.focus.color}", activeColor: "{navigation.item.icon.active.color}" } }, n = { mobileIndent: "1rem" }, t = { size: "{navigation.submenu.icon.size}", color: "{navigation.submenu.icon.color}", focusColor: "{navigation.submenu.icon.focus.color}", activeColor: "{navigation.submenu.icon.active.color}" }, r = { borderColor: "{content.border.color}" }, c = { root: o, list: i, item: a, submenu: n, submenuIcon: t, separator: r };
export {
  c as default,
  a as item,
  i as list,
  o as root,
  r as separator,
  n as submenu,
  t as submenuIcon
};
