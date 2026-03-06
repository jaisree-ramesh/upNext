import { useTranslation } from "react-i18next";

const PodcastPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="mt-12 text-center text-muted-foreground">
        {t("homePage.podcastText1")}
      </p>
      <p className="text-center text-muted-foreground">
        {t("homePage.podcastText2")}
      </p>
      <p className="text-center text-muted-foreground">
        {t("homePage.podcastText3")}
      </p>
    </div>
  );
};

export default PodcastPage;
