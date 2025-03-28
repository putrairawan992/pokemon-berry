import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import messages from "./locales";

const savedLang = localStorage.getItem("lang") || "en";

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: "en",
  messages, 
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "",
    },
  },
});

app.mount("#app");
