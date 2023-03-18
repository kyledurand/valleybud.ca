import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { GetStaticProps } from "next";
import { createClient } from "next-sanity";
import { Nav } from "components/shared/nav";
import { Footer } from "components/shared/footer";
import styled from "styled-components";
import { Meta } from "components/Meta";
import { Fragment } from "react";

interface Data {
  content: any;
  imageUrl?: string;
}

interface Props {
  data: Data[];
}

export default function About({ data }: Props): React.ReactNode {
  return (
    <Container>
      <Meta title="About Valleybud.ca" />
      <Nav />
      {data.map(({ content, imageUrl }) => (
        <Fragment key={imageUrl}>
          {imageUrl && (
            <Image
              src={imageUrl}
              width={2048}
              height={1089}
              style={{
                maxWidth: "100%",
                height: "auto",
                margin: "0 auto",
              }}
            />
          )}
          <PortableText value={content} />
        </Fragment>
      ))}
      <Footer />
    </Container>
  );
}

const client = createClient({
  projectId: "oldv6j45",
  dataset: "production",
  apiVersion: new Date().toISOString().split("T")[0],
  useCdn: false,
});

export const getStaticProps: GetStaticProps = async function () {
  const data = await client.fetch(`*[_type == "about"]{
    content,
    "imageUrl": image.asset->url,
  }`);

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
