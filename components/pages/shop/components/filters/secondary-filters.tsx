import styled from "styled-components";

import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import {Category, Effects, useMenuQuery} from "api/queries/menu.graphql";
import {Text} from "components/Text";
import {Stack} from "components/Stack";
import {retailerId} from "api/apollo";
import {
  MenuSortKey,
  // PotencyUnit,
  SortDirection,
  StrainType,
} from "api/fragments/menu-product.graphql";
import {enumToTitleCase} from "utils/product";

interface SecondaryFiltersProps {
  onEffectSelect: (effect: Effects) => void;
}

export function SecondaryFilters({
  onEffectSelect,
}: SecondaryFiltersProps): JSX.Element {
  const {data} = useMenuQuery({
    variables: {
      retailerId: retailerId,
      category: Category.Flower,
      effects: [],
      brandId: undefined,
      offset: 0,
      limit: 250,
      sortDirection: SortDirection.Asc,
      sortKey: MenuSortKey.Popular,
      search: undefined,
      // minimumThc: 0,
      // maximumThc: 100,
      // minimumCbd: 0,
      // maximumCbd: 100,
      // unit: PotencyUnit.Percentage,
    },
  });

  const products = data?.menu?.products;
  const types = new Set(
    products
      ?.map((product) => product.strainType)
      .filter((strain) => strain !== StrainType.NotApplicable)
  );

  const subCategories = new Set(
    products?.map((product) => product.subcategory)
  );

  console.log({products});

  return (
    <Container>
      <FormGroup>
        <Stack gap>
          <Text as="legend" variant="subheading">
            Subcategories
          </Text>
          <Stack>
            <FormControlLabel
              style={{marginInlineStart: 0}}
              // onChange={(event) =>
              //   console.log("change", event.currentTarget.id)
              // }
              label="Flower"
              control={
                <Checkbox
                  hidden
                  style={{padding: "var(--space-1)", color: "var(--text)"}}
                  id="flower"
                  size="small"
                />
              }
            />
            <FormControlLabel
              style={{marginInlineStart: 0}}
              // onChange={(event) => console.log("change", event.target.value)}
              label="Concentrates"
              control={
                <Checkbox
                  hidden
                  style={{padding: "var(--space-1)", color: "var(--text)"}}
                  id="concentrates"
                  value="concentrates"
                  size="small"
                />
              }
            />
          </Stack>
        </Stack>
      </FormGroup>
      <hr style={{marginBlock: "var(--space-4)"}} />
      sub categoriesToShow
      {Array.from(subCategories).map((subCategory) => (
        <div key={subCategory}>
          {subCategory === "DEFAULT"
            ? "Flower"
            : enumToTitleCase(subCategory ?? "")}
        </div>
      ))}
      <hr style={{marginBlock: "var(--space-4)"}} />
      types
      {Array.from(types).map((type) => (
        <div key={type}>{enumToTitleCase(type ?? "")}</div>
      ))}
      <hr style={{marginBlock: "var(--space-4)"}} />
      <FormGroup>
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
      </FormGroup>
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid #ddd9d2;

  &:last-of-type {
    border: none;
  }
`;
