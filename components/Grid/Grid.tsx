import styled from "styled-components";

export function Grid({children}: {children: React.ReactNode}) {
  return <StyledGrid>{children}</StyledGrid>;
}

const StyledGrid = styled.div`
  display: grid;
  gap: var(--space-1);
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
`;
