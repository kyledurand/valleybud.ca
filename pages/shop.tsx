import {useLayoutEffect, useState} from "react";
import {GetStaticProps} from "next";
import Image from "next/future/image";
import {createClient} from "next-sanity";
import styled from "styled-components";
import {StringParam, useQueryParam} from "use-query-params";

import {retailerId} from "api/apollo";
import {Category, Brand} from "api/queries/menu.graphql";
import {Nav} from "components/shared/nav";
import {Footer} from "components/shared/footer";
import {DesktopOnly} from "components/shared/responsive/desktop-only";
import {MobileOnly} from "components/shared/responsive/mobile-only";
import {CheckoutContext} from "components/shared/checkout-context";
import {useCheckout} from "hooks/use-checkout";
import {mediaQueriesDown} from "styles/media-queries";
import {CategoriesParam, EffectsParam} from "utils/query-param";

import {useBrandsQueryQuery} from "api/queries/brands.graphql";
import {Meta} from "components/Meta";
import {Button, ButtonGroup, SvgIcon, useMediaQuery} from "@material-ui/core";
import {ViewList, ViewModule} from "@mui/icons-material";
import {useTheme} from "@material-ui/core/styles";
import {
  Effects,
  MenuSortKey,
  PotencyUnit,
  SortDirection,
} from "api/fragments/menu-product.graphql";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {Stack} from "components/Stack";
import {Select} from "components/Select";
import {MobileFilters} from "components/pages/shop/components/filters/mobile-filters";
import {SecondaryFilters} from "components/pages/shop/components/filters/secondary-filters";
import {ProductSection} from "components/pages/shop/components/product-section";
import {Banner, Category as DisplayCategory} from "types";
import {PortableText} from "@portabletext/react";
import {Button as PlainButton} from "components/Button";
import {Text} from "components/Text";

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

type Range = number[];

export interface Potency {
  thcRange?: Range;
  cbdRange?: Range;
  unit?: PotencyUnit;
}

function Menu({
  categories,
  banner,
}: {
  categories: DisplayCategory[];
  banner: Banner[];
}) {
  const {breakpoints} = useTheme();
  const smUp = useMediaQuery(breakpoints.up("sm"));
  const mdUp = useMediaQuery(breakpoints.up("md"));
  const defaultView = smUp ? "grid" : "list";
  const [view, setView] = useState<"list" | "grid">(defaultView);
  const [sort, setSort] = useState({
    sortKey: MenuSortKey.Popular,
    sortDirection: SortDirection.Asc,
  });
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useQueryParam("search", StringParam);
  const [brandID, setBrandId] = useQueryParam("brandID", StringParam);
  const [brandName, setBrandName] = useQueryParam("brandName", StringParam);
  const checkoutContext = useCheckout();
  const {data: brandData, loading: brandsLoading} = useBrandsQueryQuery({
    variables: {retailerId},
  });
  const [selectedEffects, setSelectedEffects] = useQueryParam(
    "effect",
    EffectsParam
  );

  const [selectedCategories, setSelectedCategories] = useQueryParam(
    "category",
    CategoriesParam
  );

  const category = [...selectedCategories][0];

  const [potency, setPotency] = useState<Potency>({
    thcRange: undefined,
    cbdRange: undefined,
    unit:
      category === Category.Edibles || category === Category.Topicals
        ? PotencyUnit.Milligrams
        : PotencyUnit.Percentage,
  });

  useLayoutEffect(() => setView(defaultView), [defaultView]);

  function onEffectSelect(effect: Effects) {
    if (selectedEffects.has(effect)) {
      selectedEffects.delete(effect);
    } else {
      selectedEffects.add(effect);
    }
    setQuery(undefined);
    setSelectedEffects(selectedEffects);
    setOffset(0);
  }

  function selectSingleCategory(category?: Category) {
    selectedCategories.clear();
    if (category) {
      selectedCategories.add(category);
    }
    setSelectedCategories(selectedCategories);
    setPotency({
      thcRange: undefined,
      cbdRange: undefined,
      unit: PotencyUnit.Percentage,
    });
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
    setSort({sortKey, sortDirection});
  }

  const categoriesToShow =
    selectedCategories.size === 0
      ? CATEGORIES
      : CATEGORIES.filter((category) => selectedCategories.has(category));

  const brandsMarkup = !brandsLoading && (
    <Select
      name="brands"
      fullWidth={!smUp}
      onChange={({target}) => {
        const value = target.value === "All" ? undefined : target.value;
        setBrandId(value);
        setBrandName(
          value ? target.options[target.selectedIndex].text : undefined
        );
      }}
      options={[
        {value: "All", label: "Choose a brand"},
        ...(brandData?.menu?.brands ?? []).map((brand) => ({
          label: brand.name,
          value: brand.id,
        })),
      ]}
    />
  );

  const sortMarkup = (
    <Select
      name="Sort by"
      fullWidth={!smUp}
      onChange={(event) => handleSort(event.target.value)}
      options={[
        ...Object.entries(SORT_OPTIONS).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      ]}
    />
  );

  const clearFiltersMarkup =
    brandName || selectedEffects.size || selectedCategories.size ? (
      <Button
        color="inherit"
        style={{
          fontFamily: "inherit",
          textTransform: "none",
          fontSize: "inherit",
        }}
        variant="outlined"
        onClick={() => {
          setBrandId(undefined);
          setBrandName(undefined);
          setSelectedCategories(new Set());
          selectSingleCategory(undefined);
          setSelectedEffects(new Set());
          setSort({
            sortKey: MenuSortKey.Popular,
            sortDirection: SortDirection.Asc,
          });
        }}
      >
        Reset
      </Button>
    ) : null;

  const bannerMarkup = banner.length ? (
    <Stack gap data-wrapper="banner map">
      {banner.map((banner) => (
        <div
          key={banner.content}
          style={{
            backgroundColor: banner.background,
            color: banner.color,
            padding: "var(--space-2)",
            borderRadius: "var(--radius-1)",
          }}
        >
          <PortableText value={banner.content} />
        </div>
      ))}
    </Stack>
  ) : null;

  const categoriesMarkup = categories.length ? (
    <Stack inline gap wrap={false}>
      {categories
        .sort(({priority}, {priority: sortedPriority}) =>
          priority && sortedPriority ? priority - sortedPriority : -1
        )
        .map((category) => (
          <PlainButton
            variant="plain"
            key={category.title}
            onClick={() =>
              selectSingleCategory(
                (category.link?.split("=")[1] ?? undefined) as Category
              )
            }
          >
            <Image
              src={category.imageUrl ?? ""}
              alt={category.imageAlt ?? ""}
              width={180}
              height={95}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                borderRadius: "4px",
              }}
            />
            <Text align="center">{category.title}</Text>
          </PlainButton>
        ))}
    </Stack>
  ) : null;

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      <Meta title="Shop Valleybud.ca" />
      <Container>
        <Nav
          page="shop"
          selectSingleCategory={selectSingleCategory}
          selectSingleBrand={selectSingleBrand}
        />
        {bannerMarkup || categoriesMarkup ? (
          <Stack
            gap="4"
            paddingBlock="4"
            paddingInline={mdUp ? "7" : "5"}
            fullWidth
          >
            {bannerMarkup}
            <DesktopOnly>{categoriesMarkup}</DesktopOnly>
          </Stack>
        ) : null}
        <Content>
          {selectedCategories.size ? (
            <DesktopOnly>
              <Sidebar>
                <SecondaryFilters
                  selectedCategory={category}
                  onEffectSelect={onEffectSelect}
                  onPotencyChange={setPotency}
                />
              </Sidebar>
            </DesktopOnly>
          ) : null}
          <Stack gap="1" grow>
            <MobileOnly>
              <MobileFilters
                selectedCategories={selectedCategories}
                selectSingleCategory={selectSingleCategory}
              />
            </MobileOnly>

            <Stack inline gap="1" justify="end">
              <Stack inline justify="end" grow>
                {brandsMarkup}
              </Stack>
              {sortMarkup}
              {clearFiltersMarkup}
              <ButtonGroup color="inherit">
                <Button variant="outlined" onClick={() => setView?.("list")}>
                  <SvgIcon component={ViewList} inheritViewBox />
                </Button>
                <Button variant="outlined" onClick={() => setView?.("grid")}>
                  <SvgIcon component={ViewModule} inheritViewBox />
                </Button>
              </ButtonGroup>
            </Stack>
            {categoriesToShow.map((category) => (
              <ProductSection
                view={view}
                key={category}
                category={category}
                searchQuery={query || ""}
                selectedBrand={{id: brandID, name: brandName}}
                selectedEffects={[...selectedEffects]}
                offset={offset}
                paginationLimit={PAGINATION_LIMIT}
                sort={sort}
                cbdRange={potency.cbdRange}
                thcRange={potency.thcRange}
                unit={potency.unit}
              />
            ))}
          </Stack>
        </Content>

        <Pagination>
          <ButtonGroup color="inherit">
            <Button
              aria-label="Previous products"
              variant="outlined"
              onClick={() => {
                setOffset((offset) => offset - PAGINATION_LIMIT);
                window.scrollTo(0, 0);
              }}
            >
              <SvgIcon component={ChevronLeft} inheritViewBox />
            </Button>
            <Button
              aria-label="More products"
              variant="outlined"
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  padding-inline: var(--space-7);
  background: var(--background);

  @media ${mediaQueriesDown.largeTablet} {
    flex-direction: column;
    padding-inline: var(--space-5);
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  margin-right: var(--space-7);
  padding-top: 58px;
  flex-shrink: 0;
`;

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: true,
});

export const getStaticProps: GetStaticProps = async function () {
  const banner = await client.fetch(`*[_type == "banner"]`);
  const categories = await client.fetch(`*[_type == "categories"]{
    title,
    imageAlt,
    link,
    priority,
    "imageUrl": image.asset->url,
  }`);

  return {
    props: {
      banner,
      categories,
    },
  };
};

export default Menu;
