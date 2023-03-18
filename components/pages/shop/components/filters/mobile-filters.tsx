import styled from "styled-components";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Category } from "api/queries/menu.graphql";
import { enumToTitleCase } from "utils/product";

interface MobileFiltersProps {
  selectedCategories: Set<Category>;
  selectSingleCategory: (category?: Category) => void;
}

const ALL_PRODUCTS = "All products";

export function MobileFilters(props: MobileFiltersProps): JSX.Element {
  const { selectedCategories, selectSingleCategory } = props;
  const selectedCategory = [...selectedCategories][0] || ALL_PRODUCTS; // if changed from desktop to mobile, just show the first selected option in the set in this select

  return (
    <MobileCategorySelect
      value={selectedCategory}
      onChange={(e) => {
        const value =
          e.target.value === ALL_PRODUCTS
            ? undefined
            : (e.target.value as Category);
        selectSingleCategory(value);
      }}
      variant="outlined"
    >
      <MenuItem key="all-products" value={ALL_PRODUCTS}>
        All products
      </MenuItem>
      {Object.entries(Category).map(([key, category]) => (
        <MenuItem key={key} value={category}>
          {enumToTitleCase(category)}
        </MenuItem>
      ))}
    </MobileCategorySelect>
  );
}

const MobileCategorySelect = styled(Select)`
  width: 100%;
  height: 58px;
  border-radius: 0px !important;
  color: var(--text);

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 15px;
  }
`;
