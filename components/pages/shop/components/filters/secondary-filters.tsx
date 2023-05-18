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
import {Button} from "components/Button";

interface SecondaryFiltersProps {
  selectedWeights?: string[];
  selectedCategory: Category;
  onEffectSelect: (effect: Effects) => void;
  onPotencyChange: (potency: Potency) => void;
  onWeightChange?: (weight: string) => void;
  onTypeChange?: (type?: StrainType) => void;
  onSubCategoryChange: (subCategory?: string) => void;
}

export function SecondaryFilters({
  selectedWeights,
  selectedCategory,
  onEffectSelect,
  onPotencyChange,
  onWeightChange,
  onTypeChange,
  onSubCategoryChange,
}: SecondaryFiltersProps) {
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

  const isFilterableByWeight =
    selectedCategory === Category.Flower ||
    selectedCategory === Category.Vaporizers;

  const [thcRange, setThcRange] = useState<number[]>([
    0,
    isPercentage ? 50 : 1000,
  ]);
  const [cbdRange, setCbdRange] = useState<number[]>([
    0,
    isPercentage ? 50 : 1000,
  ]);
  const [selectedEffects, setSelectedEffects] = useState<Effects[]>([]);

  const [unit, setUnit] = useState(
    isPercentage ? PotencyUnit.Percentage : PotencyUnit.Milligrams
  );
  const isFilterableQuery = selectedCategory === Category.Flower;

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
  const products = finalData?.menu?.products;

  if (finalLoading)
    return (
      <Stack align="center" padding="5">
        <LoadingSpinner centered />
      </Stack>
    );

  const types = new Set(
    products
      ?.map((product) => product.strainType)
      .filter((strain) => strain !== StrainType.NotApplicable)
  );

  const subCategories = new Set(
    products?.map((product) => product.subcategory)
  );

  const weights = new Set(
    products?.map((product) => {
      const weight = product.variants[0].option;
      return weight.includes("x") ? weight.split("x")[1] : weight;
    })
  );

  const handleThcChange = (_: unknown, newValue: number | number[]) => {
    setThcRange(() => newValue as number[]);
    onPotencyChange({
      thcRange: newValue as number[],
      cbdRange,
      unit,
    });
  };

  const handleCbdChange = (_: unknown, newValue: number | number[]) => {
    setCbdRange(() => newValue as number[]);
    onPotencyChange({
      thcRange,
      cbdRange: newValue as number[],
      unit,
    });
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
                  label={
                    subCategory === "DEFAULT"
                      ? enumToTitleCase(selectedCategory)
                      : enumToTitleCase(subCategory!)
                  }
                  control={
                    <Checkbox
                      style={{
                        padding: "var(--space-1)",
                        color: "var(--text)",
                      }}
                      onClick={() => onSubCategoryChange(subCategory!)}
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

      {isFilterableByWeight && [...weights].length > 1 && (
        <>
          <Stack gap>
            <Text as="legend" variant="subheading">
              Weights
            </Text>
            <Stack inline gap>
              {Array.from(weights).map((weight) => (
                <Button
                  key={weight}
                  padding
                  variant="secondary"
                  selected={selectedWeights?.includes(weight)}
                  onClick={() => onWeightChange?.(weight)}
                >
                  {weight}
                </Button>
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
                  label={enumToTitleCase(type)}
                  control={
                    <Checkbox
                      id={type!}
                      size="small"
                      onClick={() => onTypeChange?.(type!)}
                      style={{padding: "var(--space-1)", color: "var(--text)"}}
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
          <Stack gap justify="center">
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
          <Divider />
        </>
      )}
      {selectedCategory !== Category.Accessories && (
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
                onChange={() => {
                  if (selectedEffects.includes(effect)) {
                    setSelectedEffects((prev) =>
                      prev.filter((e) => e !== effect)
                    );
                  } else {
                    setSelectedEffects((prev) => [...prev, effect]);
                  }
                  onEffectSelect(effect);
                }}
                control={
                  <Checkbox
                    id={key}
                    style={{padding: "var(--space-1)", color: "var(--text)"}}
                    size="small"
                    value={effect}
                    checked={selectedEffects.includes(effect)}
                  />
                }
              />
            ))}
          </Stack>
        </Stack>
      )}
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
  width: 75%;
  margin: 0 auto;
`;
