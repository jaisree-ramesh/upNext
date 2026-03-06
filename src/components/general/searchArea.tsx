import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { AnimatedGradientText } from "../ui/animated-gradient-text";
import { useTranslation } from "react-i18next";

interface ISearchAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchArea = (props: ISearchAreaProps) => {
  const { t } = useTranslation();
  return (
    <div className="group relative mx-auto flex w-full max-w-md items-center justify-center rounded-full px-4 py-1.5 sm:mx-0 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
      {/* Animated gradient border */}
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />

      {/* Input */}
      <Input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Search movies, shows, podcasts…"
        className="relative z-10 h-9 flex-1 border-none bg-transparent px-0 focus-visible:ring-0 placeholder:text-muted-foreground"
      />

      {/* Animated label */}
      <div className="pointer-events-none relative z-10 ml-2 shrink-0">
        <AnimatedGradientText className="text-sm font-medium" speed={1.2}>
          {t("search.title")}
        </AnimatedGradientText>
      </div>
    </div>
  );
};

export default SearchArea;
