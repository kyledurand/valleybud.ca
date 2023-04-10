import {PortableText} from "@portabletext/react";
import {GetStaticProps} from "next";
import {createClient} from "next-sanity";
import {Nav} from "components/shared/nav";
import {Footer} from "components/shared/footer";
import {CheckoutContext} from "components/shared/checkout-context";
import {useCheckout} from "hooks/use-checkout";

import {Text} from "components/Text";
import {Carousel} from "components/Carousel";
import {useState} from "react";
import {useGetSpecialsListQuery} from "api/queries/specials.graphql";
import {retailerId} from "api/apollo";
import * as Styled from "../styles/home-styles";
import Image from "next/image";
import {Stack} from "components/Stack";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {Meta} from "components/Meta";
import {Banner, Category} from "types";

interface Carousel {
  link: string;
  background: string;
  imageAlt: string;
  imageUrl: string;
}

interface Special {
  title?: string;
  imageAlt?: string;
  link?: string;
  details?: string;
  promo?: string;
  priority?: number;
  action?: string;
  accentColor?: string;
  imageUrl?: string;
}

interface Props {
  carousel: Carousel[];
  banner: Banner[];
  categories: Category[];
  specials: Special[];
}

function Home({
  carousel,
  banner,
  categories,
  specials,
}: Props): React.ReactNode {
  const [selected, setSelected] = useState(0);
  const checkoutContext = useCheckout();
  const {data, loading} = useGetSpecialsListQuery({
    variables: {
      retailerId,
    },
  });

  const dutchieSpecials = data?.specials || [];

  console.log(dutchieSpecials ? {dutchieSpecials} : null);

  return loading ? (
    <LoadingSpinner centered />
  ) : (
    <CheckoutContext.Provider value={checkoutContext}>
      <Meta />
      <Styled.Container>
        <Nav />
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
          <div style={{position: "relative", gridArea: "scrollable"}}>
            <Styled.ScrollableContainer>
              {categories
                .sort(({priority}, {priority: sortedPriority}) =>
                  priority && sortedPriority ? priority - sortedPriority : -1
                )
                .map((category) => (
                  <a
                    href={category.link}
                    key={category.title}
                    data-prioity={category.priority}
                  >
                    <Image
                      src={category.imageUrl || ""}
                      alt={category.imageAlt}
                      width={256}
                      height={136}
                      style={{width: "100%", height: "auto"}}
                    />
                    <div>{category.title}</div>
                  </a>
                ))}
            </Styled.ScrollableContainer>
            <Styled.ScrollHint />
          </div>
          <Styled.PromosContainer>
            {specials
              .sort(({priority}, {priority: sortedPriority}) =>
                priority && sortedPriority ? priority - sortedPriority : -1
              )
              .map((special) => (
                <a
                  href={special.link}
                  key={special.title}
                  style={{display: "flex", flexDirection: "column"}}
                >
                  <Image
                    src={special.imageUrl || ""}
                    alt={special.imageAlt}
                    width={640}
                    height={640}
                    style={{width: "100%", height: "auto"}}
                  />
                  <div
                    style={{
                      padding: "var(--space-4)",
                      border: `2px solid ${special.accentColor}`,
                      borderEndEndRadius: "3px",
                      borderEndStartRadius: "3px",
                      flex: 1,
                    }}
                  >
                    <Stack fullHeight justify="space-between" gap>
                      <div>
                        <Text as="h4" size="3">
                          {special.title}
                        </Text>
                        <Text size="2">{special.details}</Text>
                      </div>

                      <Stack inline justify="space-between" align="center" gap>
                        <Text>{special.promo}</Text>
                        <button
                          style={{
                            background: special.accentColor,
                            padding: "var(--space-2)",
                            border: "none",
                            borderRadius: "3px",
                          }}
                        >
                          {special.action}
                        </button>
                      </Stack>
                    </Stack>
                  </div>
                </a>
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
  const categories = await client.fetch(`*[_type == "categories"]{
    title,
    imageAlt,
    link,
    priority,
    "imageUrl": image.asset->url,
  }`);
  const specials = await client.fetch(`*[_type == "specials"]{
    title,
    imageAlt,
    link,
    details,
    promo,
    priority,
    action,
    accentColor,
    "imageUrl": image.asset->url,
  }`);

  return {
    props: {
      banner,
      carousel,
      categories,
      specials,
    },
  };
};

export default Home;
