import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import noNb from './locales/no-nb.json';
import noNn from './locales/no-nn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      'no-nb': { translation: noNb },
      'no-nn': { translation: noNn },
    },
    fallbackLng: 'no-nb',
    supportedLngs: ['no-nb', 'no-nn', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
