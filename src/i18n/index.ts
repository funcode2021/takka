import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import noNb from "./locales/no-nb.json";
import noNn from "./locales/no-nn.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "no-nb": { translation: noNb },
    "no-nn": { translation: noNn },
  },
  lng: "no-nb",
  fallbackLng: "no-nb",
  supportedLngs: ["no-nb", "no-nn", "en"],
  lowerCaseLng: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
