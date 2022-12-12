import SearchResultItemContainer from './Style';

interface SearchResultContainerProps {
  children: JSX.Element[];
  handleClick?: () => void;
}

const SearchResultContainer = ({ children, handleClick }: SearchResultContainerProps) => {
  return <SearchResultItemContainer onClick={handleClick}>{children}</SearchResultItemContainer>;
};
export default SearchResultContainer;
