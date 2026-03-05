import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface IGridPagiationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const MediaPagination = (props: IGridPagiationProps) => {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={props.onPrev}
            aria-disabled={props.page <= 1}
            className={cn(
              "cursor-pointer transition-opacity",
              props.page <= 1 && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="px-4 text-sm text-muted-foreground">
             {props.page} / {props.totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={props.onNext}
            aria-disabled={props.page >= props.totalPages}
      
            className={cn(
              "cursor-pointer transition-opacity",
              props.page >= props.totalPages && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MediaPagination;
