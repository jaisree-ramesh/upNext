import SearchArea from "./searchArea";

interface IPageHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const PageHeader = (props: IPageHeaderProps) => {
  return (
    <div className="mb-6 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:w-3/5">
      <h2 className="text-lg sm:text-md ">
        {props.title}
      </h2>

      <SearchArea value={props.searchValue} onChange={props.onSearchChange} />
    </div>
  );
};

export default PageHeader;
