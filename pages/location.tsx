import {PortableText} from "@portabletext/react";
import {GetStaticProps} from "next";
import {createClient} from "next-sanity";
import {Nav} from "components/shared/nav";
import {Footer} from "components/shared/footer";
import styled from "styled-components";
import {Meta} from "components/Meta";
import Image from "next/image";
import {Fragment} from "react";
import {Stack} from "components/Stack";

interface Data {
  content: any;
  imageUrl?: string;
}

interface Props {
  data: Data[];
}

export default function Location({data}: Props): React.ReactNode {
  return (
    <Container>
      <Meta title="Location | Valleybud.ca" />
      <Nav />
      <iframe
        aria-label="Google Maps location of Valleybud.ca"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d701.0553989150294!2d-76.03663367073423!3d45.34433889869374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd203369771bb2f%3A0x34d763c771b837ba!2svalley%20bud!5e0!3m2!1sen!2sca!4v1679162039187!5m2!1sen!2sca"
        width="100%"
        height={500}
        style={{border: 0}}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {data.map(({content, imageUrl}) => (
        <Fragment key={imageUrl}>
          <Stack align="center" padding gap>
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
          </Stack>
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
  const data = await client.fetch(`*[_type == "location"]{
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
