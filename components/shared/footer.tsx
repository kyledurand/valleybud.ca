import styled from "styled-components";
import { mediaQueriesUp } from "styles/media-queries";

export function Footer(): JSX.Element {
  return (
    <Container>
      <LinkListsContainer>
        <LinkList>
          <LinkListItem>
            <a href="menu">shop by category</a>
          </LinkListItem>
          <LinkListItem>
            <a href="menu">shop by brand</a>
          </LinkListItem>
          <LinkListItem>
            <a href="menu">accessories</a>
          </LinkListItem>
          <LinkListItem>
            <a href="menu">apparel</a>
          </LinkListItem>
          <LinkListItem>
            <a href="location">location</a>
          </LinkListItem>
          <LinkListItem>
            <a href="contact">contact us</a>
          </LinkListItem>
          <LinkListItem>
            <a href="faq">faqs</a>
          </LinkListItem>
          <LinkListItem>
            <a href="about">about valley bud</a>
          </LinkListItem>

          <LinkListItem>
            <a href="terms-and-conditions">terms &amp; conditions</a>
          </LinkListItem>
          <LinkListItem>
            <a href="return-policy">return policy</a>
          </LinkListItem>
          <LinkListItem>
            <a href="privacy-policy">privacy policy</a>
          </LinkListItem>
          <Li>&copy; {new Date().getFullYear()} valley bud</Li>
        </LinkList>
      </LinkListsContainer>
    </Container>
  );
}

const Container = styled.footer`
  margin-top: var(--space-7);
  color: var(--text);
  background-color: var(--brand);
  padding: 0px 10px;
`;

const LinkListsContainer = styled.div`
  padding: 14px;

  @media ${mediaQueriesUp.sm} {
    margin-bottom: 90px;
  }
`;

const LinkList = styled.ul`
  display: grid;
  gap: var(--space-2);
  grid-template-columns: 1fr;
  text-align: left;
  padding: var(--space-4);

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${mediaQueriesUp.md} {
    gap: var(--space-3);
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

const LinkListItem = styled.li`
  cursor: pointer;
  display: inline;
  font-size: 13px;
`;

const Li = styled.li`
  list-style: none;
  font-size: 13px;
`;
