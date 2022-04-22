import { createI18n } from "vue-i18n";
import messages from './getMessage';
import LANGUAGE from '../constants/app';
const localeData={
    legacy:false,
    locale:LANGUAGE,
    messages
};
export function setLanguage(){
    return createI18n(localeData);
}