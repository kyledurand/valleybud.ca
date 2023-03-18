import { useLayoutEffect, useState } from "react";
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
import { CategoriesParam, EffectsParam } from "utils/query-param";

import { SecondaryFilters } from "./components/filters/secondary-filters";
import { MobileFilters } from "./components/filters/mobile-filters";
import { ProductSection } from "./components/product-section";
import { useBrandsQueryQuery } from "api/queries/brands.graphql";
import { Meta } from "components/Meta";
import { Button, ButtonGroup, SvgIcon, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Effects } from "api/fragments/menu-product.graphql";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export const CATEGORIES: Category[] = Object.entries(Category)
  .map(([_, category]) => category)
  .filter((category) => category !== Category.NotApplicable);

const PAGINATION_LIMIT = 12; // 12 products per category.

function Menu() {
  const { breakpoints } = useTheme();
  const defaultView = useMediaQuery(breakpoints.up("sm")) ? "grid" : "list";
  const [view, setView] = useState<"list" | "grid">(defaultView);
  const [offset, setOffset] = useState(0);
  const [query] = useQueryParam("search", StringParam);
  const [brandID, setBrandId] = useQueryParam("brandID", StringParam);
  const [brandName, setBrandName] = useQueryParam("brandName", StringParam);
  const checkoutContext = useCheckout();
  const { data: brandData, loading: brandsLoading } = useBrandsQueryQuery({
    variables: { retailerId },
  });

  useLayoutEffect(() => setView(defaultView), [defaultView]);

  const [selectedEffects, setSelectedEffects] = useQueryParam(
    "effect",
    EffectsParam
  );

  const [selectedCategories, setSelectedCategories] = useQueryParam(
    "category",
    CategoriesParam
  );

  function onCategorySelect(category: Category) {
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
    setOffset(0);
  }

  function onEffectSelect(effect: Effects) {
    if (selectedEffects.has(effect)) {
      selectedEffects.delete(effect);
    } else {
      selectedEffects.add(effect);
    }
    setSelectedEffects(selectedEffects);
    setOffset(0);
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
      ? CATEGORIES
      : CATEGORIES.filter((category) => selectedCategories.has(category));

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
              <SecondaryFilters
                onCategorySelect={onCategorySelect}
                onEffectSelect={onEffectSelect}
                selectedCategories={selectedCategories}
              />
            </Sidebar>
          </DesktopOnly>
          <MobileOnly>
            <MobileFilters
              selectedCategories={selectedCategories}
              selectSingleCategory={selectSingleCategory}
            />
          </MobileOnly>
          <Products>
            {brandsMarkup}
            {categoriesToShow.map((category) => (
              <ProductSection
                view={view}
                key={category}
                category={category}
                searchQuery={query || ""}
                selectedBrand={{ id: brandID, name: brandName }}
                selectedEffects={[...selectedEffects]}
                offset={offset}
                paginationLimit={PAGINATION_LIMIT}
              />
            ))}
          </Products>
        </Content>

        <Pagination>
          <ButtonGroup>
            <Button
              aria-label="Previous products"
              variant="contained"
              onClick={() => {
                setOffset((offset) => offset - PAGINATION_LIMIT);
                window.scrollTo(0, 0);
              }}
            >
              <SvgIcon component={ChevronLeft} inheritViewBox />
            </Button>
            <Button
              aria-label="More products"
              variant="contained"
              onClick={() => {
                setOffset((offset) => offset + PAGINATION_LIMIT);
                window.scrollTo(0, 0);
              }}
            >
              <SvgIcon component={ChevronRight} inheritViewBox />
            </Button>
          </ButtonGroup>
        </Pagination>
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

const Products = styled.div`
  flex: 1;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
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
