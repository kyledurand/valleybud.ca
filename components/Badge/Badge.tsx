import styled from "styled-components";

interface BadgeProps {
  children: React.ReactNode;
}

export function Badge({children}: BadgeProps) {
  return <StyledBadge>{children}</StyledBadge>;
}

const StyledBadge = styled.span`
  background-color: var(--bg-color-positive);
  color: var(--background);
  padding: 0 var(--space-2);
  border-radius: var(--radius-1);
`;
