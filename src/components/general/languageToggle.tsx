import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const storedLang = localStorage.getItem("app-language");
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
      setLang(storedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "de" : "en";

    i18n.changeLanguage(newLang);
    localStorage.setItem("app-language", newLang);
    setLang(newLang);
  };

  return (
    <button className="text-lg font-medium " onClick={toggleLanguage}>
      {lang === "en" ? "DE" : "EN"}
    </button>
  );
};

export default LanguageToggle;
