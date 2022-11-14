import { GetStaticProps } from "next";
import styled from "styled-components";

import { initializeApollo } from "api/apollo";
import { HomePageMenuDocument } from "api/queries/home-page-menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueriesDown } from "styles/media-queries";

import { SHOP_SECTION_CATEGORIES } from "./components/shop-section";
import { Carousel } from "components/Carousel";
import { useState } from "react";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ffffff;

  @media ${mediaQueriesDown.phone} {
    width: 100%;
  }
`;

function Home(): React.ReactNode {
  const [selected, setSelected] = useState(0);
  const checkoutContext = useCheckout();

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav search="" setSearch={() => {}} />
        <Carousel
          images={[
            { source: "/gday-bud.png", link: "/shop" },
            {
              source: "/logo-alt.png",
              link: "/shop",
              background: "var(--brand-accent-orange)",
            },
            { source: "/gday-bud.png", link: "/shop" },
          ]}
          selected={selected}
          onSelect={setSelected}
        />
        {/* <ShopSection /> */}
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();

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
    },
    revalidate: 10,
  };
};

export default Home;
