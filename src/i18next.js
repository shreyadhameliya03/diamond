import i18n from "i18next";
import {initReactI18next}  from "react-i18next";
import  LanguageDetector from "i18next-browser-languagedetector"

import en from "../src/locales/en/translation.json"
import gu from "../src/locales/gu/translation.json"

 i18n.use(initReactI18next).use(LanguageDetector).init({


  resources:{
    en:{translation:en},
    gu:{translation:gu},
  },
  lng:"gu",
  fallbackLng:"gu",
  interpolation:{
    escapeValue:false,
  }
});
export default i18n;