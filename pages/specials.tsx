import {retailerId} from "api/apollo";
import {useGetSpecialsListQuery} from "api/queries/specials.graphql";
import {Meta} from "components/Meta";
import {Container} from "components/pages/home/Styled";
import {Footer} from "components/shared/footer";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {Nav} from "components/shared/nav";
import {Text} from "components/Text";
import Image from "next/image";
import styled from "styled-components";
import {mediaQueriesUp} from "styles/media-queries";

export default function Specials() {
  const {data, loading} = useGetSpecialsListQuery({
    variables: {retailerId},
  });
  const specials = data?.specials;

  return (
    <Container>
      <Meta title="Specials | Valleybud.ca" />
      <Nav />
      {loading && <LoadingSpinner centered />}
      <h1>Specials</h1>
      {specials?.length ? (
        <Grid>
          {specials?.map((product) => {
            return (
              <a
                key={product?.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-1)",
                }}
                href={`/shop?brandID=${product?.id}&brandName=${product?.name}`}
              >
                {product?.menuDisplayConfiguration?.image ? (
                  <Image
                    src={product?.menuDisplayConfiguration.image}
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
                  />
                )}
                <Text size="2">{product?.name}</Text>
                <p>{product?.menuDisplayConfiguration?.description}</p>
              </a>
            );
          })}
        </Grid>
      ) : (
        <div>No specials at this time</div>
      )}
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
