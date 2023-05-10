import styled from "styled-components";

export function Grid({children}: {children: React.ReactNode}) {
  return <StyledGrid>{children}</StyledGrid>;
}

const StyledGrid = styled.div`
  display: flex;
  gap: var(--space-1);
  padding: var(--space-3) 0;
`;
