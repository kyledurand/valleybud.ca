import { Category } from "api/queries/menu.graphql";

import { Select } from "components/Select";
import { enumToTitleCase } from "utils/product";

interface MobileFiltersProps {
  selectedCategories: Set<Category>;
  selectSingleCategory: (category?: Category) => void;
}

const ALL_PRODUCTS = "All products";

export function MobileFilters(props: MobileFiltersProps): JSX.Element {
  const { selectedCategories, selectSingleCategory } = props;
  const selectedCategory = [...selectedCategories][0] || ALL_PRODUCTS;

  return (
    <Select
      fullWidth
      value={selectedCategory}
      onChange={(event) => {
        const value =
          event.target.value === ALL_PRODUCTS
            ? undefined
            : (event.target.value as Category);
        selectSingleCategory(value);
      }}
      options={[
        { value: ALL_PRODUCTS, label: "Shop by category" },
        ...Object.entries(Category)
          .filter(([_, category]) => category !== Category.NotApplicable)
          .map(([_, category]) => ({
            label: enumToTitleCase(category),
            value: category,
          })),
      ]}
    />
  );
}
