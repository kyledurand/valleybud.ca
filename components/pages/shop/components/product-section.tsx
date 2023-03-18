import styled from "styled-components";
import { Category, useMenuQuery } from "api/queries/menu.graphql";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueriesUp } from "styles/media-queries";
import { retailerId } from "api/apollo";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { Effects } from "api/fragments/menu-product.graphql";
import { enumToTitleCase } from "utils/product";

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
}

export function ProductSection({
  category,
  view = "grid",
  selectedBrand,
  searchQuery,
  selectedEffects,
  offset,
  paginationLimit,
}: ProductSectionProps) {
  const Layout = view === "grid" ? Grid : List;

  const { data, loading } = useMenuQuery({
    variables: {
      retailerId,
      category: category,
      search: searchQuery,
      brandId: selectedBrand?.id,
      effects: selectedEffects,
      offset: offset,
      limit: paginationLimit,
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
  ) : (
    <p>No products found</p>
  );
}

const Section = styled.section`
  margin-bottom: 50px;

  @media ${mediaQueriesUp.sm} {
    margin-bottom: var(--space-4);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-3);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @media ${mediaQueriesUp.sm} {
    gap: var(--space-2);
  }
`;

const SectionHeader = styled.h2`
  margin: var(--space-2) 0;
`;
