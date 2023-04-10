import styled from "styled-components";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export function Input({...rest}: InputProps) {
  return <StyledInput {...rest} />;
}

const StyledInput = styled.input<{fullWidth?: boolean}>`
  border: none;
  border-radius: var(--radius-1);
  background-color: var(--background-dark);
  padding: var(--space-1) var(--space-2);
  padding-left: 30px;
  color: var(--text);
  width: ${({fullWidth}) => (fullWidth ? "100%" : "auto")};

  &::placeholder {
    color: var(--text);
  }
`;
