import { GetStaticProps } from "next";
import { useDebounce } from "use-debounce";
import styled from "styled-components";
import { useQueryParam } from "use-query-params";
import { initializeApollo } from "api/apollo";
import { MenuDocument, Category } from "api/queries/menu.graphql";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CheckoutContext } from "components/shared/checkout-context";
import { useCheckout } from "hooks/use-checkout";
import { mediaQueriesDown } from "styles/media-queries";
import { CategoriesParam } from "utils/query-param";
import { CategoryFilter } from "./components/filters/category-filter";
import { MobileFilters } from "./components/filters/mobile-filters";
import { ProductSection } from "./components/product-section";
import { useState } from "react";
import { createClient } from "next-sanity";

const ProductSectionCategories = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

interface Props {
  carousel: [
    {
      _id: string;
      title: string;
      titleColor: string;
      imageUrl: string;
      imageAlt: string;
      bgColor: string;
    }
  ];
}

function Menu({ carousel }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 100);
  const [selectedCategories, setSelectedCategories] = useQueryParam(
    "category",
    CategoriesParam
  );
  const checkoutContext = useCheckout();
  function onCategorySelect(category: Category) {
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
  }

  function selectSingleCategory(category?: Category) {
    selectedCategories.clear();
    if (category) {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
  }

  const categoriesToShow =
    selectedCategories.size === 0
      ? ProductSectionCategories
      : ProductSectionCategories.filter((category) =>
          selectedCategories.has(category)
        );

  const carouselMarkup = carousel.map((slide) => (
    <div style={{ background: slide.bgColor }} key={slide["_id"]}>
      <p style={{ color: slide.titleColor }}>{slide.title}</p>
      <img src={`${slide.imageUrl}?h=200`} alt={slide.imageAlt || ""} />
    </div>
  ));

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav
          page="menu"
          selectSingleCategory={selectSingleCategory}
          search={query}
          setSearch={setQuery}
        />
        {carouselMarkup}
        <Content>
          <DesktopOnly>
            <Sidebar>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCategorySelect={onCategorySelect}
              />
            </Sidebar>
          </DesktopOnly>
          <MobileOnly>
            <MobileFilters
              selectedCategories={selectedCategories}
              selectSingleCategory={selectSingleCategory}
            />
          </MobileOnly>
          <div>
            {categoriesToShow.map((category) => (
              <ProductSection
                key={category}
                category={category}
                searchQuery={debouncedQuery}
              />
            ))}
          </div>
        </Content>
        <Footer />
      </Container>
    </CheckoutContext.Provider>
  );
}

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--background);

  @media ${mediaQueriesDown.phone} {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 45px;
  display: flex;
  background: var(--background);

  @media ${mediaQueriesDown.largeTablet} {
    flex-direction: column;
    padding: 18px 25px;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  margin-right: 36px;
  flex-shrink: 0;
`;

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: false,
});

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();
  const carousel = await client.fetch(`*[_type == "carousel"]{
    _id,
    title,
    titleColor,
    bgColor,
    "imageUrl": image.asset->url,
    imageAlt,
  }`);

  const queries = ProductSectionCategories.map((category) =>
    apolloClient.query({
      query: MenuDocument,
      variables: {
        category,
      },
    })
  );

  await Promise.all(queries);

  return {
    props: {
      carousel,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 10,
  };
};

export default Menu;
