import { GetStaticProps } from "next";
import { useDebounce } from "use-debounce";
import styled from "styled-components";
import { useQueryParam } from "use-query-params";

import { initializeApollo, retailerId } from "api/apollo";
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

const ProductSectionCategories = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
  Category.Apparel,
];

function Menu() {
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

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Container>
        <Nav
          page="shop"
          selectSingleCategory={selectSingleCategory}
          search={query}
          setSearch={setQuery}
        />
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

export const getStaticProps: GetStaticProps = async function () {
  const apolloClient = initializeApollo();

  const queries = ProductSectionCategories.map((category) =>
    apolloClient.query({
      query: MenuDocument,
      variables: {
        retailerId,
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

export default Menu;
