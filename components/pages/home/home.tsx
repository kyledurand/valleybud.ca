import { GetStaticProps } from "next";
import styled from "styled-components";
import { createClient } from "next-sanity";

import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueriesUp } from "styles/media-queries";

import { Carousel } from "components/Carousel";
import { useState } from "react";

interface Carousel {
  link: string;
  background: string;
  imageAlt: string;
  imageUrl: string;
}

function Home({ carousel }: { carousel: Carousel[] }): React.ReactNode {
  const [selected, setSelected] = useState(0);
  const checkoutContext = useCheckout();

  console.log(carousel);
  carousel?.forEach((item: any) => {
    console.log(item);
  });

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav search="" setSearch={() => {}} />
        <HomeGrid>
          <CarouselContainer>
            <Carousel
              images={carousel}
              selected={selected}
              onSelect={setSelected}
            />
          </CarouselContainer>
          <ScrollableContainer>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{`0${index}`}</div>
            ))}
          </ScrollableContainer>
          <PromosContainer>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{`0${index}`}</div>
            ))}
          </PromosContainer>
        </HomeGrid>
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background-color: var(--background);
`;

const HomeGrid = styled.div`
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

const CarouselContainer = styled.div`
  grid-area: carousel;

  @media ${mediaQueriesUp.sm} {
  }
`;

const ScrollableContainer = styled.div`
  grid-area: scrollable;
  display: flex;
  gap: var(--space-4);
  max-width: 100%;
  overflow: scroll;

  > * {
    min-width: 100px;
    height: 50px;
    background: var(--placeholder-2);
  }

  @media ${mediaQueriesUp.sm} {
    flex-direction: column;
  }
`;

const PromosContainer = styled.div`
  grid-area: promos;
  display: grid;
  gap: inherit;
  grid-template-columns: minmax(0, 1fr);

  > * {
    background: var(--placeholder-1);
  }

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`;

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: false,
});

export const getStaticProps: GetStaticProps = async function () {
  const carousel = await client.fetch(`*[_type == "carousel"]{
    link,
    background,
    imageAlt,
    "imageUrl": image.asset->url,
  }`);

  return {
    props: {
      carousel,
    },
  };
};

export default Home;
