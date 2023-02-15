import styled from "styled-components";

import { Category, useMenuQuery } from "api/queries/menu.graphql";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueriesUp } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { retailerId } from "api/apollo";
import { LoadingSpinner } from "components/shared/loading-spinner";

interface ProductSectionProps {
  searchQuery: string;
  category: Category;
  selectedBrand?: {
    name?: string | null;
    id?: string | null;
  };
}

export function ProductSection({
  category,
  selectedBrand,
  searchQuery,
}: ProductSectionProps) {
  const { data, loading } = useMenuQuery({
    variables: {
      retailerId,
      category: category,
      search: searchQuery,
      brandId: selectedBrand?.id,
    },
  });

  return data?.menu?.products.length ? (
    <Section>
      {loading && <LoadingSpinner />}
      <SectionHeader>{displayNameForCategory(category)}</SectionHeader>
      <Grid>
        {(data?.menu?.products || []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  ) : null;
}

const Section = styled.section`
  margin-bottom: 50px;

  @media ${mediaQueriesUp.sm} {
    margin-bottom: 64px;
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

const SectionHeader = styled.h2`
  margin: var(--space-2) 0;
`;
