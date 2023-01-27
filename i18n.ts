import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import httpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(httpApi)
  .init({
    supportedLngs: ["en", "ge"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "path", "subdomain", "cookie", "htmlTag",],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
