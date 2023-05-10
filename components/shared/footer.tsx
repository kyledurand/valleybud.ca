import styled from "styled-components";
import {mediaQueriesUp} from "styles/media-queries";

export const SHARED_LINKS = [
  {
    name: "shop by category",
    href: "shop",
  },
  {
    name: "shop by brand",
    href: "brands",
  },
  {
    name: "accessories",
    href: "shop?category=ACCESSORIES",
  },
  {
    name: "apparel",
    href: "shop?category=APPAREL",
  },
  {
    name: "location",
    href: "location",
  },
  {
    name: "contact us",
    href: "contact",
  },
  {
    name: "about valley bud",
    href: "about",
  },
  {
    name: "terms & conditions",
    href: "terms-and-conditions",
  },
  {
    name: "return policy",
    href: "return-policy",
  },
  {
    name: "privacy policy",
    href: "privacy-policy",
  },
];

export function Footer(): JSX.Element {
  return (
    <>
      <Container>
        <LinkList>
          {SHARED_LINKS.map((link) => (
            <LinkListItem key={link.name}>
              <a href={link.href}>{link.name}</a>
            </LinkListItem>
          ))}
          <Li>&copy; {new Date().getFullYear()} valley bud</Li>
        </LinkList>
      </Container>
      <Accent />
    </>
  );
}

const Container = styled.footer`
  margin-top: var(--space-7);
  color: var(--text-inverse);
  background-color: var(--brand-accent-orange);
  padding: 0px 10px;
  border-bottom: 4px solid var(--text-inverse);
`;

const LinkList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  padding: var(--space-4);
  margin: 0;

  @media ${mediaQueriesUp.xs} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
  }

  @media ${mediaQueriesUp.md} {
    gap: var(--space-3);
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const LinkListItem = styled.li`
  cursor: pointer;
  padding: var(--space-1) 0;
  display: inline;
  font-size: 13px;
`;

const Li = styled.li`
  list-style: none;
  font-size: 13px;
`;

const Accent = styled.div`
  height: 40px;
  background-color: var(--brand);
`;
