import { useEffect } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import CategorySelector from "../general/categorySelector";
import { MediaType } from "@/types/media";
import { useTranslation } from "react-i18next";


const HomePage = () => {
  const { t } = useTranslation();

  const { setFilterType, setTitle, clearQuery } = usePageHeader();

  useEffect(() => {
    setFilterType(MediaType.Home);
    setTitle(t("homePage.title"));
    clearQuery();
  }, [setFilterType, setTitle, clearQuery]);

  return <CategorySelector />;
};

export default HomePage;
