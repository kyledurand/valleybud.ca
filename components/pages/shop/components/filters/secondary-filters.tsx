import styled from "styled-components";

import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";

import {Effects} from "api/queries/menu.graphql";

interface SecondaryFiltersProps {
  onEffectSelect: (effect: Effects) => void;
}

export function SecondaryFilters({
  onEffectSelect,
}: SecondaryFiltersProps): JSX.Element {
  return (
    <Container>
      <FormGroup style={{marginTop: "var(--space-4)"}}>
        <legend>Effects:</legend>
        {Object.entries(Effects).map(([key, effect]) => (
          <FormControlLabel
            key={key}
            onChange={() => onEffectSelect(effect)}
            control={
              <Checkbox
                style={{padding: "var(--space-1)", color: "var(--text)"}}
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
