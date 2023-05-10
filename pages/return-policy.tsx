import {PortableText} from "@portabletext/react";
import {GetStaticProps} from "next";
import {createClient} from "next-sanity";
import {Nav} from "components/shared/nav";
import {Footer} from "components/shared/footer";
import styled from "styled-components";
import {Meta} from "components/Meta";

interface Data {
  content: any;
}

interface Props {
  data: Data[];
}

export default function Returns({data}: Props): React.ReactNode {
  return (
    <Container>
      <Meta title="Returns Policy | Valleybud.ca" />
      <Nav />
      <PortableText value={data[0].content} />
      <Footer />
    </Container>
  );
}

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: true,
});

export const getStaticProps: GetStaticProps = async function () {
  const data = await client.fetch(`*[_type == "returns"]`);

  return {
    props: {
      data,
    },
  };
};

export const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  background-color: var(--background);
`;
