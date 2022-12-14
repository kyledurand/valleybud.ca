import { PortableText } from "@portabletext/react";
import { GetStaticProps } from "next";
import { createClient } from "next-sanity";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";

import { Carousel } from "components/Carousel";
import { useState } from "react";
import { useGetSpecialsListQuery } from "api/queries/specials.graphql";
import { retailerId } from "api/apollo";
import * as Styled from "./Styled";

interface Carousel {
  link: string;
  background: string;
  imageAlt: string;
  imageUrl: string;
}

interface Banner {
  _key: string;
  background: string;
  color: string;
  content: any;
}

interface Props {
  carousel: Carousel[];
  banner: Banner[];
}

function Home({ carousel, banner }: Props): React.ReactNode {
  const [selected, setSelected] = useState(0);
  const checkoutContext = useCheckout();
  const { data, loading, error } = useGetSpecialsListQuery({
    variables: {
      retailerId,
    },
  });

  console.log({ data, loading, error });

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Styled.Container>
        <Nav search="" setSearch={() => {}} />
        <Styled.Banner
          style={{
            backgroundColor: banner[0].background,
            color: banner[0].color,
          }}
        >
          <PortableText value={banner[0].content} />
        </Styled.Banner>
        <Styled.HomeGrid>
          <Styled.CarouselContainer>
            <Carousel
              images={carousel}
              selected={selected}
              onSelect={setSelected}
            />
          </Styled.CarouselContainer>
          <Styled.ScrollableContainer>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{`0${index}`}</div>
            ))}
          </Styled.ScrollableContainer>
          <Styled.PromosContainer>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{`0${index}`}</div>
            ))}
          </Styled.PromosContainer>
        </Styled.HomeGrid>
        <Footer />
      </Styled.Container>
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
  const banner = await client.fetch(`*[_type == "banner"]`);
  const carousel = await client.fetch(`*[_type == "carousel"]{
    link,
    background,
    imageAlt,
    "imageUrl": image.asset->url,
  }`);

  return {
    props: {
      banner,
      carousel,
    },
  };
};

export default Home;
