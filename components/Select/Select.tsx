import styled from "styled-components";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
  options?: {
    label?: string;
    value?: string;
  }[];
}

export function Select({options, ...rest}: SelectProps) {
  return (
    <StyledSelect {...rest}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select<{fullWidth?: boolean}>`
  background-color: inherit;
  border: var(--outline-1);
  padding: var(--space-2);
  border-radius: var(--radius-1);
  width: ${({fullWidth}) => (fullWidth ? "100%" : "auto")};
`;
