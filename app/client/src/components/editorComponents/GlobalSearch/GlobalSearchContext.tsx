import React from "react";
import type {
  SearchItem,
  SelectEvent,
} from "@appsmith/components/editorComponents/GlobalSearch/utils";

type SearchContextType = {
  handleItemLinkClick: (
    event: SelectEvent,
    item?: SearchItem,
    source?: string,
  ) => void;
  setActiveItemIndex: (index: number) => void;
  activeItemIndex: number;
};

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined,
);

export default SearchContext;
