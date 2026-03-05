import { useEffect } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import CategorySelector from "../general/categorySelector";
import { MediaType } from "@/types/media";

const HomePage = () => {
  const { setFilterType, setTitle, clearQuery } = usePageHeader();

  useEffect(() => {
    setFilterType(MediaType.Home);
    setTitle("What do you want to watch?");
    clearQuery();
  }, [setFilterType, setTitle, clearQuery]);

  return <CategorySelector />;
};

export default HomePage;
