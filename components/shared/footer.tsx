import styled from "styled-components";
import { mediaQueries } from "styles/media-queries";

export function Footer(): JSX.Element {
  return (
    <Container>
      {/* <Header>Join our secret society</Header>
      <Subheader>
        Join our mailing list to learn about specials and new products arriving
        at Valley Bud.
      </Subheader> */}

      {/* TODO
      <EmailContainer>
        <EmailInput
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <img src="icons/right-arrow-circle.svg" />
            </InputAdornment>
          }
        />
      </EmailContainer> */}

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

          <LinkListItem>location</LinkListItem>
          <LinkListItem>contact us</LinkListItem>
          <LinkListItem>faqs</LinkListItem>
          <LinkListItem>about valley bud</LinkListItem>

          <LinkListItem>terms &amp; conditions</LinkListItem>
          <LinkListItem>return policy</LinkListItem>
          <LinkListItem>privacy policy</LinkListItem>
          <LinkListItem>
            &copy; {new Date().getFullYear()} valley bud
          </LinkListItem>
        </LinkList>
      </LinkListsContainer>
    </Container>
  );
}

const Container = styled.footer`
  background-color: rgba(248, 245, 240, 0.56);
  padding: 120px 0 150px;
  @media ${mediaQueries.phone} {
    padding: 0px 10px;
  }
`;

const LinkListsContainer = styled.div`
  margin-bottom: 90px;
  @media ${mediaQueries.phone} {
    padding: 14px;
  }
`;

const LinkList = styled.ul`
  display: grid;
  gap: 25px;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  text-align: left;
  padding: 0;
  margin-bottom: 28px;

  @media ${mediaQueries.phone} {
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

const LinkListItem = styled.li`
  cursor: pointer;
  display: inline;
  margin-right: 43px;
  font-size: 13px;

  &:last-of-type {
    margin-right: 0px;
  }
`;
