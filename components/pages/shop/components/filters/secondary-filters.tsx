import styled from "styled-components";

import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

import { Category, Effects } from "api/queries/menu.graphql";
import { Text } from "components/Text";
import { enumToTitleCase } from "utils/product";

interface SecondaryFiltersProps {
  selectedCategories: Set<Category>;
  onCategorySelect: (category: Category) => void;
  onEffectSelect: (effect: Effects) => void;
}

const filteredCategories = Object.entries(Category)
  .map(([_, category]) => category)
  .filter((category) => category !== Category.NotApplicable);

export function SecondaryFilters({
  onCategorySelect,
  onEffectSelect,
}: SecondaryFiltersProps): JSX.Element {
  return (
    <Container>
      <Text size="2">Categories</Text>
      <FormGroup>
        {filteredCategories.map((category) => (
          <FormControlLabel
            key={category}
            label={enumToTitleCase(category)}
            onChange={() => onCategorySelect(category)}
            control={
              <Checkbox
                style={{ padding: "var(--space-1)" }}
                id={category}
                size="small"
              />
            }
          />
        ))}
      </FormGroup>

      <FormGroup style={{ marginTop: "var(--space-4)" }}>
        <legend>Effects:</legend>
        {Object.entries(Effects).map(([key, effect]) => (
          <FormControlLabel
            key={key}
            onChange={() => onEffectSelect(effect)}
            control={
              <Checkbox
                style={{ padding: "var(--space-1)" }}
                id={key}
                size="small"
              />
            }
            label={key}
          />
        ))}
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
