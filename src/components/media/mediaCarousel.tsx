import type { IMovieMediaProps, IPodcastProps, ITvMediaProps } from "../../types/media";
import MediaCard from "./mediaCard";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IMediaCarouselProps {
  items: (IMovieMediaProps | IPodcastProps | ITvMediaProps)[];
  onDetails?: (item: IMovieMediaProps | IPodcastProps) => void;
}

const MediaCarousel = ({ items, onDetails }: IMediaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ],
  );

  const hasMultipleItems = items.length > 1;

  return (
    <div className="w-full max-w-5xl ml-20">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden py-4 rounded-lg">
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] flex justify-center">
              <MediaCard media={item} onDetails={onDetails} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls  */}
      {hasMultipleItems && (
        <div className="mt-9 flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            className="cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            className="cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
