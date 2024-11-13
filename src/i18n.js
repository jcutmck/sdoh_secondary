// src/i18n.js
import i18next from 'i18next';

i18next
//  .use(LanguageDetector)
  .init({   
    fallbackLng: 'en',
    resources: {
      en: {
        translation: require('./locales/en/en.json') 
      },
      es: {
        translation: require('./locales/es/es.json') 
      }
    },
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18next;