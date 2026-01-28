import { useNavigate } from "react-router-dom";
import houseIcon from "../../assets/house.png";
import cinemaIcon from "../../assets/cinema.png";
import podcastIcon from "../../assets/podcast.png";
import bookmarkIcon from "../../assets/bookmark.png";
import { Card, CardContent } from "../../components/ui/card";
import { ShineBorder } from "../ui/shine-border";

const CategorySelector = () => {
  const categories = [
    { label: "At Home", path: "/watch", icon: houseIcon },
    { label: "Cinema", path: "/cinema", icon: cinemaIcon },
    { label: "Podcasts", path: "/podcasts", icon: podcastIcon },
    { label: "Watchlist", path: "/watchlist", icon: bookmarkIcon },
  ];

  const navigate = useNavigate();

  return (
    <div className="mx-20 mt-8 grid max-w-md grid-cols-1 gap-8 sm:max-w-4xl sm:grid-cols-2">
      {categories.map((cat) => (
        <Card
          key={cat.path}
          onClick={() => navigate(cat.path)}
          className="group relative mx-auto w-full max-w-xs cursor-pointer border-none p-0 shadow-none overflow-hidden hover:scale-110"
        >
          {/* Shine Border */}
          <ShineBorder
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          />

          <CardContent className="relative z-10 flex flex-col items-center gap-4 p-6">
            <div className="flex h-60 w-60 items-center justify-center">
              <img
                src={cat.icon}
                alt={cat.label}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="text-lg font-semibold text-center">{cat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategorySelector;
