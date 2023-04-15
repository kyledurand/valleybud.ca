import styled from "styled-components";
import {Category, SortDirection, useMenuQuery} from "api/queries/menu.graphql";
import {ProductCard} from "components/shared/product/product-card";
import {mediaQueriesUp} from "styles/media-queries";
import {retailerId} from "api/apollo";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {
  Effects,
  MenuSortKey,
  PotencyRange,
  PotencyUnit,
} from "api/fragments/menu-product.graphql";
import {enumToTitleCase} from "utils/product";

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
  range?: {
    minThc?: number;
    maxThc?: number;
    minCbd?: number;
    maxCbd?: number;
    unit?: PotencyUnit;
  };
}

export function ProductSection({
  category,
  view = "grid",
  selectedBrand,
  searchQuery,
  selectedEffects,
  offset,
  paginationLimit,
  range,
  sort: {sortKey = MenuSortKey.Popular, sortDirection = SortDirection.Asc},
}: ProductSectionProps) {
  const Layout = view === "grid" ? Grid : List;
  // const unit = range?.unit
  //   ? category === Category.Flower
  //     ? PotencyUnit.Milligrams
  //     : PotencyUnit.Percentage
  //   : undefined;

  const unit: PotencyRange["unit"] = range?.unit
    ? range.unit
    : PotencyUnit.Percentage;

  // PotencyUnit.Milligrams
  // Edibles, concentrates, accessories

  // PotencyUnit.MilligramsPerGram
  // None

  // PotencyUnit.MilligramsPerMl
  // Concentrates, different result than milligrams wtf

  // PotencyUnit.Percentage
  // Flower, prerolls, concentrates, accessories

  console.log({unit});

  const {data, loading} = useMenuQuery({
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
      // minimumThc: range?.minThc ?? 0,
      // maximumThc: range?.maxThc ?? 100,
      // minimumCbd: range?.minCbd ?? 0,
      // maximumCbd: range?.maxCbd ?? 100,
      // unit,
    },
  });

  return data?.menu?.products.length ? (
    <Section>
      {loading && <LoadingSpinner />}
      <SectionHeader>{enumToTitleCase(category)}</SectionHeader>
      <Layout>
        {(data?.menu?.products || []).map((product) => (
          <ProductCard layout={view} key={product.id} product={product} />
        ))}
      </Layout>
    </Section>
  ) : loading ? (
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
