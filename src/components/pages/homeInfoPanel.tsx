import { useTranslation } from "react-i18next";

const HomeInfoPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-5 rounded-md border p-6 text-sm text-muted-foreground">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        {t("homePage.homePageDiscoverText")}
      </h3>

      <p className="mb-4">{t("homePage.info1")}</p>

      <p className="mb-4">{t("homePage.info2")}</p>

      <ul className="space-y-1">
        <li>🎬 {t("homePage.info3")}</li>
        <li>📺 {t("homePage.info4")}</li>
        <li>🎧 {t("homePage.info5")}</li>
      </ul>
    </div>
  );
};

export default HomeInfoPanel;
