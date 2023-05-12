import {Checkbox, FormControlLabel, Slider} from "@material-ui/core";
import {Category, Effects, useMenuQuery} from "api/queries/menu.graphql";
import {Text} from "components/Text";
import {Stack} from "components/Stack";
import {retailerId} from "api/apollo";
import {
  MenuSortKey,
  PotencyUnit,
  SortDirection,
  StrainType,
} from "api/fragments/menu-product.graphql";
import {enumToTitleCase} from "utils/product";
import {Potency} from "pages/shop";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {useEffect, useState} from "react";
import styled from "styled-components";

interface SecondaryFiltersProps {
  selectedCategory: Category;
  onEffectSelect: (effect: Effects) => void;
  onPotencyChange: (potency: Potency) => void;
}

export function SecondaryFilters({
  selectedCategory,
  onEffectSelect,
}: // onPotencyChange,
SecondaryFiltersProps) {
  const showPotency =
    selectedCategory === Category.Flower ||
    selectedCategory === Category.PreRolls ||
    selectedCategory === Category.Vaporizers ||
    selectedCategory === Category.Concentrates ||
    selectedCategory === Category.Edibles ||
    selectedCategory === Category.Topicals;

  const isPercentage =
    selectedCategory === Category.Flower ||
    selectedCategory === Category.PreRolls ||
    selectedCategory === Category.Vaporizers ||
    selectedCategory === Category.Concentrates;

  const [thcRange, setThcRange] = useState<number[]>([
    0,
    isPercentage ? 50 : 1000,
  ]);
  const [cbdRange, setCbdRange] = useState<number[]>([
    0,
    isPercentage ? 50 : 1000,
  ]);
  const [unit, setUnit] = useState(
    isPercentage ? PotencyUnit.Percentage : PotencyUnit.Milligrams
  );
  const isFilterableQuery = selectedCategory === Category.Flower;
  console.log(thcRange);

  useEffect(() => {
    setThcRange([0, isPercentage ? 50 : 1000]);
    setCbdRange([0, isPercentage ? 50 : 1000]);
    setUnit(isPercentage ? PotencyUnit.Percentage : PotencyUnit.Milligrams);
  }, [selectedCategory]);

  const {data: filteredData, loading: filteredDataLoading} = useMenuQuery({
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

  if (finalLoading)
    return (
      <Stack align="center" padding="5">
        <LoadingSpinner centered />
      </Stack>
    );

  const products = finalData?.menu?.products;
  const types = new Set(
    products
      ?.map((product) => product.strainType)
      .filter((strain) => strain !== StrainType.NotApplicable)
  );

  const subCategories = new Set(
    products?.map((product) => product.subcategory)
  );

  const handleThcChange = (_: unknown, newValue: number | number[]) => {
    setThcRange(() => newValue as number[]);
  };

  const handleCbdChange = (_: unknown, newValue: number | number[]) => {
    setCbdRange(() => newValue as number[]);
  };

  return (
    <>
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
          <Divider />
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
          <Divider />
        </>
      )}

      {showPotency && (
        <>
          <Stack gap>
            <Text variant="subheading">Potency</Text>

            <Text size="1" weight="1">
              <Text as="span" weight="3">
                THC:{" "}
              </Text>
              {thcRange[0]} - {thcRange[1]}{" "}
              {unit === PotencyUnit.Percentage ? "%" : "mg"}
            </Text>
            <StyledSlider
              getAriaLabel={() => "CBD range"}
              value={thcRange}
              onChange={handleThcChange}
              valueLabelDisplay="auto"
              getAriaValueText={(value: number) =>
                `${value}${unit} === ${PotencyUnit.Percentage ? "%" : "mg"}`
              }
              min={0}
              max={isPercentage ? 50 : 1000}
              color={undefined}
            />

            <Text size="1" weight="1">
              <Text as="span" weight="3">
                CBD:{" "}
              </Text>
              {cbdRange[0]} - {cbdRange[1]}{" "}
              {unit === PotencyUnit.Percentage ? "%" : "mg"}
            </Text>
            <StyledSlider
              getAriaLabel={() => "CBD range"}
              value={cbdRange}
              onChange={handleCbdChange}
              valueLabelDisplay="auto"
              getAriaValueText={(value: number) =>
                `${value}${unit} === ${PotencyUnit.Percentage ? "%" : "mg"}`
              }
              min={0}
              max={isPercentage ? 50 : 1000}
            />
          </Stack>
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
    </>
  );
}

const Divider = ({subtle}: {subtle?: boolean}) => (
  <hr
    style={{
      marginBlock: subtle ? "var(--space-2)" : "var(--space-4)",
      borderColor: subtle ? "transparent" : "initial",
    }}
  />
);

const StyledSlider = styled(Slider)`
  color: var(--text);
`;
