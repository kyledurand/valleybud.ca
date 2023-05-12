import {Text} from "components/Text";
import styled from "styled-components";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fullWidth?: boolean;
  hasIcon?: boolean;
  background?: boolean;
  labelHidden?: boolean;
}

export function Input({label, labelHidden, ...rest}: InputProps) {
  return (
    <label>
      <Text visuallyHidden={labelHidden} size="1">
        {label}
      </Text>
      <StyledInput {...rest} />
    </label>
  );
}

const StyledInput = styled.input<{
  fullWidth?: boolean;
  hasIcon?: boolean;
  background?: boolean;
}>`
  border: none;
  border-radius: var(--radius-1);
  border: ${({background}) =>
    background ? "initial" : "1px solid var(--text)"};
  background-color: ${({background}) =>
    background ? "var(--background-dark)" : "initial"};
  padding: var(--space-1) var(--space-2);
  color: var(--text);
  padding-left: ${({hasIcon}) =>
    hasIcon ? "var(--space-6)" : "var(--space-2)"};
  width: ${({fullWidth}) => (fullWidth ? "100%" : "auto")};

  &::placeholder {
    color: var(--text);
  }
`;
