import r from "primevue/config";
import m from "primevue/confirmationservice";
import o from "./index5.js";
import "primeicons/primeicons.css";
const p = {
  install: (e) => {
    e.use(r, {
      theme: { preset: o }
    }), e.use(m);
  }
};
export {
  p as default
};
