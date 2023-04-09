import {retailerId} from "api/apollo";
import {useBrandsQueryQuery} from "api/queries/brands.graphql";
import {Meta} from "components/Meta";
import {Container} from "components/pages/home/Styled";
import {Footer} from "components/shared/footer";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {Nav} from "components/shared/nav";
import {Text} from "components/Text";
import Image from "next/image";
import styled from "styled-components";
import {mediaQueriesUp} from "styles/media-queries";

export default function Brands() {
  const {data, loading} = useBrandsQueryQuery({variables: {retailerId}});
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
                      borderRadius: "var(--radius-1)",
                    }}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 260 260"
                    >
                      <path
                        fill="gray"
                        d="M127.4 15.7c-2.9 2.9-8.5 12.2-12.5 20.8-7.7 16.3-11.9 36.5-12.2 57.7-.2 14.5 1 13.9-9.7 4.3-12.3-11-30.1-21.1-46.9-26.5-12.2-3.9-17.4-3.8-17.9.2-.2 1.4 1.1 6.8 2.8 12 4.7 14 12 26.5 23.9 40.5L61 132h-7.9c-9.1 0-22.9 2.2-29.8 4.8-6.5 2.4-6.7 4.7-1.2 11.2 11.5 13.7 37.6 27.8 56.1 30.5l4.7.7-6.8 6.7c-7.1 7-16.1 19.4-16.1 22.2 0 3.6 2.5 4.2 15.3 3.7 15.2-.7 24.6-2.9 36.4-8.9l9.3-4.6-.5 5.1c-3.1 30.6-2.6 36.5 2.9 40.2 3.4 2.2 9.8 2.2 13.2 0 5.5-3.7 6-9.6 2.9-40.2l-.5-5.1 9.3 4.6c11.8 6 21.2 8.2 36.4 8.9 12.8.5 15.3-.1 15.3-3.7 0-2.8-9-15.2-16.1-22.2l-6.8-6.7 4.7-.7c18.5-2.7 44.6-16.8 56.1-30.5 5.5-6.6 5.3-8.8-1.2-11.2-5.2-2-19.1-4.4-29.9-5.4l-6.7-.5 7.2-8.9c13.1-16 23.7-37.3 24.1-48l.1-4.5-3.9-.3c-5-.4-21 4.7-31.9 10.2-10.3 5.1-21.4 12.6-28.7 19.1-10.7 9.6-9.5 10.2-9.7-4.3-.3-21.2-4.5-41.4-12.2-57.7C139.4 24.3 132.5 14 130 14c-.5 0-1.6.8-2.6 1.7z"
                      />
                    </svg>
                  </div>
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
