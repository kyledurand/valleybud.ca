import styled from "styled-components";

import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Category, Effects, useMenuQuery} from "api/queries/menu.graphql";
import {Text} from "components/Text";
import {Stack} from "components/Stack";
import {retailerId} from "api/apollo";
import {
  MenuSortKey,
  PotencyRange,
  SortDirection,
  StrainType,
} from "api/fragments/menu-product.graphql";
import {enumToTitleCase} from "utils/product";
import {useFilteredMenuQuery} from "api/queries/filtered-menu.graphql";

interface SecondaryFiltersProps {
  selectedCategory: Category;
  cbdRange?: PotencyRange;
  thcRange?: PotencyRange;
  onEffectSelect: (effect: Effects) => void;
}

export function SecondaryFilters({
  selectedCategory,
  cbdRange,
  thcRange,
  onEffectSelect,
}: SecondaryFiltersProps) {
  const isFilterableQuery = selectedCategory === Category.Flower;
  const {
    data: filteredData,
    loading: filteredDataLoading,
  } = useFilteredMenuQuery({
    variables: {
      retailerId,
      category: selectedCategory,
      search: undefined,
      effects: [],
      offset: 0,
      limit: 250,
      sortDirection: SortDirection.Asc,
      sortKey: MenuSortKey.Popular,
      minimumCbd: cbdRange?.min,
      maximumCbd: thcRange?.max,
      minimumThc: thcRange?.min,
      maximumThc: thcRange?.max,
      unit: cbdRange?.unit ?? thcRange?.unit,
    },
  });

  const {data, loading} = useMenuQuery({
    variables: {
      retailerId,
      category: selectedCategory,
      search: undefined,
      effects: [],
      offset: 0,
      limit: 250,
      sortDirection: SortDirection.Asc,
      sortKey: MenuSortKey.Popular,
    },
  });

  const finalData = isFilterableQuery ? filteredData : data;
  const finalLoading = isFilterableQuery ? filteredDataLoading : loading;

  if (finalLoading) return null;

  const products = finalData?.menu?.products;
  const types = new Set(
    products
      ?.map((product) => product.strainType)
      .filter((strain) => strain !== StrainType.NotApplicable)
  );

  const subCategories = new Set(
    products?.map((product) => product.subcategory)
  );

  return (
    <Container>
      {[...subCategories].length > 1 && (
        <>
          <Stack gap>
            <Text as="legend" variant="subheading">
              Subcategories
            </Text>
            <Stack>
              {Array.from(subCategories).map((subCategory) => (
                <FormControlLabel
                  key={subCategory}
                  style={{marginInlineStart: 0}}
                  onClick={() => console.log("change", subCategory)}
                  label={
                    subCategory === "DEFAULT"
                      ? enumToTitleCase(selectedCategory)
                      : enumToTitleCase(subCategory!)
                  }
                  control={
                    <Checkbox
                      hidden
                      style={{
                        padding: "var(--space-1)",
                        color: "var(--text)",
                      }}
                      id={subCategory!}
                      size="small"
                    />
                  }
                />
              ))}
            </Stack>
          </Stack>
          <hr style={{marginBlock: "var(--space-4)"}} />
        </>
      )}

      {[...types].length > 1 && (
        <>
          <Stack gap>
            <Text as="legend" variant="subheading">
              Types
            </Text>
            <Stack>
              {Array.from(types).map((type) => (
                <FormControlLabel
                  key={type}
                  style={{marginInlineStart: 0}}
                  onClick={() => console.log("change", type)}
                  label={enumToTitleCase(type)}
                  control={
                    <Checkbox
                      hidden
                      style={{padding: "var(--space-1)", color: "var(--text)"}}
                      id={type!}
                      size="small"
                    />
                  }
                />
              ))}
            </Stack>
          </Stack>
          <hr style={{marginBlock: "var(--space-4)"}} />
        </>
      )}

      <Stack gap>
        <Text as="legend" variant="subheading">
          Effects
        </Text>
        <Stack>
          {Object.entries(Effects).map(([key, effect]) => (
            <FormControlLabel
              key={key}
              style={{marginInlineStart: -6}}
              label={key}
              onChange={() => onEffectSelect(effect)}
              control={
                <Checkbox
                  id={key}
                  style={{padding: "var(--space-1)", color: "var(--text)"}}
                  size="small"
                  value={effect}
                />
              }
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid #ddd9d2;

  &:last-of-type {
    border: none;
  }
`;
