import { retailerId } from "api/apollo";
import { useBrandsQueryQuery } from "api/queries/brands.graphql";
import { Meta } from "components/Meta";
import { Container } from "components/pages/home/Styled";
import { Footer } from "components/shared/footer";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { Nav } from "components/shared/nav";
import { Text } from "components/Text";
import Image from "next/image";
import styled from "styled-components";
import { mediaQueriesUp } from "styles/media-queries";

export default function Brands() {
  const { data, loading } = useBrandsQueryQuery({ variables: { retailerId } });
  const brands = [...(data?.menu?.brands || [])];
  return (
    <Container>
      <Meta title="Brands | Valleybud.ca" />
      <Nav />
      {loading && <LoadingSpinner centered />}
      <h1>Brands</h1>
      <BrandsContainer>
        <BrandList>
          {brands.map((brand) => (
            <li key={brand.id}>
              <a href={`/shop?brandID=${brand.id}&brandName=${brand.name}`}>
                {brand.name}
              </a>
            </li>
          ))}
        </BrandList>
        <Grid>
          {brands.map((brand) => {
            return (
              <a
                key={brand.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-1)",
                }}
                href={`/shop?brandID=${brand.id}&brandName=${brand.name}`}
              >
                {brand.imageUrl ? (
                  <Image
                    src={brand.imageUrl}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                ) : (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      background: "lightgray",
                      borderRadius: "var(--border-radius-1)",
                    }}
                  />
                )}
                <Text size="2">{brand.name}</Text>
              </a>
            );
          })}
        </Grid>
      </BrandsContainer>
      <Footer />
    </Container>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${mediaQueriesUp.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${mediaQueriesUp.sm} {
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-3);
  }
`;

const BrandsContainer = styled.div`
  display: flex;
`;

const BrandList = styled.ul`
  display: none;

  @media ${mediaQueriesUp.sm} {
    margin: 0;
    display: block;
    list-style: none;
    padding: 0;
  }
`;
