import { SearchX } from 'lucide-react';

interface IEmptyStateProps {
  title?: string;
    description?: string;
}
const EmptyState = (props: IEmptyStateProps) => {
    const title = props.title || "Nothing found";
    const description =
    props.description ||
    "We couldn't find any results matching your search. Try adjusting your filters or search terms.";
return (
  <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
    <SearchX className="h-12 w-12 mb-4 opacity-50" />
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-sm mt-1 max-w-sm">{description}</p>
  </div>
);
}

export default EmptyState