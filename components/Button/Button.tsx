import styled from "styled-components";
import {Space} from "types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "plain" | "primary" | "secondary";
  fullWidth?: boolean;
  padding?: Space | boolean;
  paddingBlock?: Space | boolean;
  paddingInline?: Space | boolean;
  stopPropagation?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "plain",
  fullWidth,
  stopPropagation,
  padding,
  paddingBlock,
  paddingInline,
  children,
  selected,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      selected={selected}
      style={{
        width: fullWidth ? "100%" : undefined,
        padding:
          padding === true
            ? "var(--space-2)"
            : padding
            ? `var(--space-${padding})`
            : undefined,
        paddingBlock:
          paddingBlock === true
            ? "var(--space-2)"
            : paddingBlock
            ? `var(--space-${paddingBlock})`
            : undefined,
        paddingInline:
          paddingInline === true
            ? "var(--space-2)"
            : paddingInline
            ? `var(--space-${paddingInline})`
            : undefined,
      }}
      variant={variant}
      onClick={(event) => {
        if (stopPropagation) event.stopPropagation();
        if (onClick) onClick(event);
      }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  variant: ButtonProps["variant"];
  selected: ButtonProps["selected"];
}>`
  border: none;
  background: none;
  color: var(--text);
  font-size: var(--font-size-1);
  text-align: start;
  text-decoration: underline;
  padding: 0;
  box-shadow: none;
  transition: box-shadow 100ms ease-in-out, background 100ms ease-in-out;

  ${({selected}) =>
    selected &&
    `box-shadow: inset 0 0.125rem 0px var(--shadow-inset);
  background: var(--background-dark);`}

  ${({variant}) => {
    switch (variant) {
      case "plain":
        return `text-decoration: none;`;
      case "primary":
        return `
          color: var(--text);
          background-color: var(--brand);
          border-radius: var(--radius-1);
          `;
      case "secondary":
        return `
          color: var(--text);
          border-radius: var(--radius-1);
          border: 1px solid var(--text);
          `;
    }
  }}
`;
