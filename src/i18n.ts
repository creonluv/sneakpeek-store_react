import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector, { DetectorOptions } from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

interface CustomInitOptions extends InitOptions {
  supportedLngs: string[];
}

const options: CustomInitOptions & { detection: DetectorOptions } = {
  supportedLngs: ["en", "ua", "de", "fr", "es"],
  fallbackLng: "en",
  debug: true,
  detection: {
    order: ["queryString", "cookie"],
    caches: ["cookie"],
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options)
  .catch((error: Error) => {
    console.error("i18n initialization failed:", error);
  });

export default i18n;
