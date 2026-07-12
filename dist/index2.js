import r from "primevue/config";
import o from "primevue/confirmationservice";
import m from "primevue/toastservice";
import t from "./index5.js";
import "primeicons/primeicons.css";
const p = {
  install: (e) => {
    e.use(r, {
      theme: { preset: t }
    }), e.use(o), e.use(m);
  }
};
export {
  p as default
};
