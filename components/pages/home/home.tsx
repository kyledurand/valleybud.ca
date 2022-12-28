import { GetStaticProps } from "next";
import { createClient } from "next-sanity";
import styled from "styled-components";

import { initializeApollo } from "api/apollo";
import { HomePageMenuDocument } from "api/queries/home-page-menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueriesUp } from "styles/media-queries";

import { SHOP_SECTION_CATEGORIES } from "./components/shop-section";
import { Carousel } from "components/Carousel";
import { useState } from "react";

function Home({ carousel }: any): React.ReactNode {
  const [selected, setSelected] = useState(0);
  const checkoutContext = useCheckout();

  carousel.forEach((item: any) => {
    console.log(item);
  });

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav search="" setSearch={() => {}} />
        <HomeGrid>
          <CarouselContainer>
            <Carousel
              images={[
                { source: "/gday-bud.png", link: "/shop" },
                { source: "/logo-alt.png", link: "/shop" },
                { source: "/gday-bud.png", link: "/shop" },
              ]}
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

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: false,
});

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();
  const carousel = await client.fetch(`*[_type == "carousel"]`);

  const queries = [undefined, ...SHOP_SECTION_CATEGORIES].map((category) =>
    apolloClient.query({
      query: HomePageMenuDocument,
      variables: {
        category,
      },
    })
  );

  await Promise.all(queries);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      carousel,
    },
    revalidate: 10,
  };
};

export default Home;

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
