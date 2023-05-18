import styled from "styled-components";
import {Category, SortDirection, useMenuQuery} from "api/queries/menu.graphql";
import {ProductCard} from "components/shared/product/product-card";
import {mediaQueriesUp} from "styles/media-queries";
import {retailerId} from "api/apollo";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {
  Effects,
  MenuSortKey,
  PotencyUnit,
  StrainType,
  Subcategory,
} from "api/fragments/menu-product.graphql";
import {enumToTitleCase} from "utils/product";
import {useFilteredMenuQuery} from "api/queries/filtered-menu.graphql";
import {Fragment} from "react";

interface ProductSectionProps {
  searchQuery: string;
  category: Category;
  view: "grid" | "list";
  selectedBrand?: {
    name?: string | null;
    id?: string | null;
  };
  selectedEffects: Effects[];
  offset: number;
  paginationLimit: number;
  sort: {
    sortKey?: MenuSortKey;
    sortDirection: SortDirection;
  };
  cbdRange?: number[];
  thcRange?: number[];
  unit?: PotencyUnit;
  selectedWeights?: string[];
  selectedType?: string;
  selectedSubCategory?: string;
}

export function ProductSection({
  category,
  view = "grid",
  selectedBrand,
  searchQuery,
  selectedEffects,
  offset,
  paginationLimit,
  cbdRange,
  thcRange,
  unit,
  selectedWeights,
  selectedType,
  selectedSubCategory,
  sort: {sortKey = MenuSortKey.Popular, sortDirection = SortDirection.Asc},
}: ProductSectionProps) {
  const Layout = view === "grid" ? Grid : List;
  console.log(selectedWeights);

  const isFilterableQuery =
    category === Category.Flower ||
    category === Category.PreRolls ||
    category === Category.Vaporizers ||
    category === Category.Edibles ||
    category === Category.Concentrates ||
    category === Category.Topicals;

  const {
    data: filteredData,
    loading: filteredDataLoading,
    error: filteredDataError,
  } = useFilteredMenuQuery({
    variables: {
      retailerId,
      category: category,
      search: searchQuery,
      brandId: selectedBrand?.id,
      effects: selectedEffects,
      offset: offset,
      limit: paginationLimit,
      sortDirection: sortDirection,
      sortKey: sortKey,
      minimumCbd: cbdRange?.[0],
      maximumCbd: thcRange?.[1],
      minimumThc: thcRange?.[0],
      maximumThc: thcRange?.[1],
      unit,
      weights: selectedWeights,
      strainType: selectedType as StrainType,
      subcategory: selectedSubCategory as Subcategory,
    },
  });

  const {data, loading, error} = useMenuQuery({
    variables: {
      retailerId,
      category: category,
      search: searchQuery,
      brandId: selectedBrand?.id,
      effects: selectedEffects,
      offset: offset,
      limit: paginationLimit,
      sortDirection: sortDirection,
      sortKey: sortKey,
    },
  });

  const finalData = isFilterableQuery ? filteredData : data;
  const finalLoading = isFilterableQuery ? filteredDataLoading : loading;
  const finalError = isFilterableQuery ? filteredDataError : error;

  if (finalData?.menu?.products.length === 0) {
    return <p>no products found</p>;
  }

  if (finalError) {
    return <p>Error! {finalError.message}. Please refresh the page</p>;
  }

  return finalData?.menu?.products.length ? (
    <Section>
      {finalLoading && <LoadingSpinner />}
      <SectionHeader>{enumToTitleCase(category)}</SectionHeader>
      <Layout>
        {finalData.menu.products.length ? (
          [...finalData?.menu?.products].map((product) => (
            <Fragment key={product.id}>
              <ProductCard layout={view} key={product.id} product={product} />
              {view === "list" && (
                <hr
                  style={{
                    marginBlock: "var(--space-05)",
                    width: "calc(100% - var(--space-7))",
                  }}
                />
              )}
            </Fragment>
          ))
        ) : (
          <p>No products found</p>
        )}
      </Layout>
    </Section>
  ) : finalLoading ? (
    <p>Loading...</p>
  ) : null;
}

const Section = styled.section`
  margin-bottom: 50px;

  @media ${mediaQueriesUp.sm} {
    margin-bottom: var(--space-4);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6);

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const List = styled.div<{view: "grid" | "list"}>`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media ${mediaQueriesUp.sm} {
    gap: ${({view}) => (view === "grid" ? "var(--space-2)" : "var(--space-5)")};
  }
`;

const SectionHeader = styled.h2`
  margin: var(--space-2) 0;
`;
