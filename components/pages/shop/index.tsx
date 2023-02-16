import { useState } from "react";
import styled from "styled-components";
import { StringParam, useQueryParam } from "use-query-params";

import { retailerId } from "api/apollo";
import { Category, Brand } from "api/queries/menu.graphql";
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
import { useBrandsQueryQuery } from "api/queries/brands.graphql";
import { Meta } from "components/Meta";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

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
  const { breakpoints } = useTheme();
  const defaultView = useMediaQuery(breakpoints.up("md")) ? "grid" : "list";
  const [view, setView] = useState<"list" | "grid">(defaultView);
  const [query] = useQueryParam("search", StringParam);
  const [brandID, setBrandId] = useQueryParam("brandID", StringParam);
  const [brandName, setBrandName] = useQueryParam("brandName", StringParam);
  const { data: brandData, loading: brandsLoading } = useBrandsQueryQuery({
    variables: { retailerId },
  });

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

  function selectSingleBrand(brand: Partial<Brand>) {
    setBrandId(brand.id);
    setBrandName(brand.name);
  }

  const categoriesToShow =
    selectedCategories.size === 0
      ? ProductSectionCategories
      : ProductSectionCategories.filter((category) =>
          selectedCategories.has(category)
        );
  const brandsMarkup = !brandsLoading && (
    <select
      name="brands"
      onChange={(event) => {
        setBrandId(event.target.value);
        setBrandName(event.target.options[event.target.selectedIndex].text);
      }}
    >
      <option value="">Choose a brand</option>
      {brandData?.menu?.brands.map((brand) => {
        return (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        );
      })}
    </select>
  );
  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Meta title="Shop Valleybud.ca" />
      <Container>
        <Nav
          page="shop"
          setView={setView}
          selectSingleCategory={selectSingleCategory}
          selectSingleBrand={selectSingleBrand}
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
            {brandsMarkup}
            {categoriesToShow.map((category) => (
              <ProductSection
                view={view}
                key={category}
                category={category}
                searchQuery={query || ""}
                selectedBrand={{ id: brandID, name: brandName }}
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

export default Menu;
