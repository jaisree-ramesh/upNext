import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IEmptyStateProps {
  title?: string;
  description?: string;
}
const EmptyState = (props: IEmptyStateProps) => {
  const { t } = useTranslation();

  const title = props.title || t("emptyState.title");
  const description = props.description || t("emptyState.message");

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
      <SearchX className="h-12 w-12 mb-4 opacity-50" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm mt-1 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
