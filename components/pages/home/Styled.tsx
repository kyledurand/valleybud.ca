import styled from "styled-components";
import { mediaQueriesUp } from "styles/media-queries";

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background-color: var(--background);
`;

export const HomeGrid = styled.div`
  display: grid;
  gap: var(--space-4);
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "carousel" "scrollable" "promos";

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      "carousel carousel"
      "scrollable scrollable"
      "promos promos";
  }

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: minmax(0, 1fr) minmax(auto, 200px);
    grid-template-areas:
      "carousel carousel"
      "promos scrollable";
  }
`;

export const CarouselContainer = styled.div`
  grid-area: carousel;

  @media ${mediaQueriesUp.sm} {
  }
`;

export const ScrollableContainer = styled.div`
  grid-area: scrollable;
  display: flex;
  gap: var(--space-6);
  max-width: 100%;
  overflow: scroll;
  justify-content: start;
  padding: var(--space-4) 0;

  > * {
    min-width: 100px;
    text-align: center;
    display: block;
  }

  @media ${mediaQueriesUp.sm} {
    flex-direction: column;
    align-items: center;
  }
`;

export const Banner = styled.div`
  padding: var(--space-1) var(--space-4);
  margin-bottom: var(--space-4);

  @media ${mediaQueriesUp.md} {
    border-radius: var(--border-radius-1);
    margin-bottom: var(--space-4);
  }
`;

export const PromosContainer = styled.div`
  grid-area: promos;
  display: grid;
  gap: inherit;
  grid-template-columns: minmax(0, 1fr);

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`;
