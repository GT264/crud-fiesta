import r from "primevue/config";
import m from "primevue/confirmationservice";
import o from "./index5.js";
const f = {
  install: (e) => {
    e.use(r, {
      theme: { preset: o }
    }), e.use(m);
  }
};
export {
  f as default
};
