import polyglotI18nProvider from "ra-i18n-polyglot";
import en from "./i18n/en";
import zh from "./i18n/zh";

const messages = {
  zh: zh,
  en: en,
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale], "zh", [
  { locale: "en", name: "English" },
  { locale: "zh", name: "Chinese" },
]);
// const locals = {
//   en: "en",
//   zh: "zh",
// };
// let currentLocal: keyof typeof locals = "zh";
// let lang = { en, zh };
// const i18Provider: I18nProvider = {
//   changeLocale: async (local, options) => {
//     console.log("changeLocals");
//     console.log(local);
//     console.log(options);
//     currentLocal = locals?.[local] || "en";
//   },
//   getLocale: () => currentLocal,
//   translate: (key, options) => {
//     try {
//       // take key and return string
//       const str = eval(`lang[currentLocal].${key}`) || key;
//       return str;
//     } catch (error) {
//       console.log({ key, options });
//       return key;
//     }
//   },
//   getLocales: () => {
//     const locals: Locale[] = [
//       { name: "English", locale: "en" },
//       { name: "Chinese", locale: "zh" },
//     ];
//     return locals;
//   },
// };
export default i18nProvider;
