import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import de from './de.json';

const savedLanguage = localStorage.getItem('savedLanguage') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            },
            de: {
                translation: de
            }
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
