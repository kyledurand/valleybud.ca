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
import { mediaQueriesDown, mediaQueriesUp } from "styles/media-queries";
import { CategoriesParam, EffectsParam } from "utils/query-param";

import { SecondaryFilters } from "./components/filters/secondary-filters";
import { MobileFilters } from "./components/filters/mobile-filters";
import { ProductSection } from "./components/product-section";
import { useBrandsQueryQuery } from "api/queries/brands.graphql";
import { Meta } from "components/Meta";
import { Button, ButtonGroup, SvgIcon, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  Effects,
  MenuSortKey,
  SortDirection,
} from "api/fragments/menu-product.graphql";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Stack } from "components/Stack";

export const CATEGORIES: Category[] = Object.entries(Category)
  .map(([_, category]) => category)
  .filter((category) => category !== Category.NotApplicable);

const PAGINATION_LIMIT = 12; // 12 products per category with many categories on the page.

const SORT_OPTIONS = {
  [`${MenuSortKey.Popular}-${SortDirection.Asc}`]: "Popular",
  [`${MenuSortKey.Price}-${SortDirection.Desc}`]: "Price: High to Low",
  [`${MenuSortKey.Price}-${SortDirection.Asc}`]: "Price: Low to High",
  [`${MenuSortKey.Potency}-${SortDirection.Desc}`]: "Potency: High to Low",
  [`${MenuSortKey.Potency}-${SortDirection.Asc}`]: "Potency: Low to High",
};

function Menu() {
  const { breakpoints } = useTheme();
  const defaultView = useMediaQuery(breakpoints.up("sm")) ? "grid" : "list";
  const [view, setView] = useState<"list" | "grid">(defaultView);
  const [sort, setSort] = useState({
    sortKey: MenuSortKey.Popular,
    sortDirection: SortDirection.Asc,
  });
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

  function handleSort(value: string) {
    const [sortKey, sortDirection] = value.split("-") as [
      sortKey: MenuSortKey,
      sortDirection: SortDirection
    ];
    setSort({ sortKey, sortDirection });
  }

  const categoriesToShow =
    selectedCategories.size === 0
      ? CATEGORIES
      : CATEGORIES.filter((category) => selectedCategories.has(category));

  const brandsMarkup = !brandsLoading && (
    <Select
      name="brands"
      onChange={(event) => {
        setBrandId(event.target.value);
        setBrandName(event.target.options[event.target.selectedIndex].text);
      }}
    >
      <option value="">Choose a brand</option>
      {brandData?.menu?.brands.map((brand) => (
        <option key={brand.id} value={brand.id}>
          {brand.name}
        </option>
      ))}
    </Select>
  );

  const sortMarkup = (
    <Select name="Sort by" onChange={(event) => handleSort(event.target.value)}>
      {Object.entries(SORT_OPTIONS).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Select>
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
            <Stack inline justify="end" gap="2">
              {brandsMarkup}
              {sortMarkup}
            </Stack>
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
                sort={sort}
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
  padding: var(--space-7);
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

const Select = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: var(--space-1);
  font-size: 13px;
  width: 100%;

  @media ${mediaQueriesUp.xs} {
    width: auto;
  }
`;

export default Menu;
