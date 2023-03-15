import styled from "styled-components";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
} from "@material-ui/core";

import { Category, Effects } from "api/queries/menu.graphql";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { Text } from "components/Text";
import { CATEGORIES } from "../..";

interface CategoryFilterProps {
  // selectedCategories: Set<Category>;
  onCategorySelect: (category: Category) => void;
  onEffectSelect: (effect: Effects) => void;
}

const useStyles = makeStyles({
  root: {
    padding: "var(--space-1)",
  },
});

export function CategoryFilter({
  onCategorySelect,
  onEffectSelect,
}: CategoryFilterProps): JSX.Element {
  const classes = useStyles();
  return (
    <Container>
      <Text size="2">Filter</Text>
      <FormGroup>
        {CATEGORIES.map((category) => (
          <FormControlLabel
            key={category}
            label={displayNameForCategory(category)}
            onClick={() => onCategorySelect(category)}
            control={
              <Checkbox className={classes.root} id={category} size="small" />
            }
          />
        ))}
      </FormGroup>

      <FormGroup style={{ marginTop: "var(--space-4)" }}>
        <legend>Effects:</legend>
        {Object.entries(Effects).map(([key, effect]) => (
          <FormControlLabel
            key={key}
            onClick={() => onEffectSelect(effect)}
            control={
              <Checkbox className={classes.root} id={key} size="small" />
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
