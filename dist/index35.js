import { h as a } from "vue";
import { toKebabCase as l } from "./index36.js";
import t from "./index37.js";
/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n = ({ size: e, strokeWidth: r = 2, absoluteStrokeWidth: s, color: u, iconNode: i, name: m, class: f, ...c }, { slots: o }) => a(
  "svg",
  {
    ...t,
    width: e || t.width,
    height: e || t.height,
    stroke: u || t.stroke,
    "stroke-width": s ? Number(r) * 24 / Number(e) : r,
    class: ["lucide", `lucide-${l(m ?? "icon")}`],
    ...c
  },
  [...i.map((d) => a(...d)), ...o.default ? [o.default()] : []]
);
export {
  n as default
};
