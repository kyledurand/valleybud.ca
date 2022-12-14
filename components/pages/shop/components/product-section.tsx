import styled from "styled-components";

import { Category, useMenuQuery } from "api/queries/menu.graphql";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueriesDown } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";
import { retailerId } from "api/apollo";

interface ProductSectionProps {
  searchQuery: string;
  category: Category;
}

export function ProductSection({
  category,
  searchQuery,
}: ProductSectionProps): JSX.Element {
  const { data, loading } = useMenuQuery({
    variables: {
      retailerId,
      category: category,
      search: searchQuery,
    },
  });

  return (
    <Section>
      {loading && <div>Loading...</div>}
      <SectionHeader>{displayNameForCategory(category)}</SectionHeader>

      <Grid>
        {(data?.menu?.products || []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 64px;

  @media ${mediaQueriesDown.phone} {
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 22px;

  @media ${mediaQueriesDown.phone} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const SectionHeader = styled.h2`
  font-family: "Playfair Display";
  margin: var(--space-2) 0;
`;
