import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Drawer from "@material-ui/core/Drawer";
import { useApollo } from "api/apollo";
import { Category } from "api/queries/checkout.graphql";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { Logo } from "components/shared/svg/logo";
import { CartIcon } from "components/shared/svg/cart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";

import { NavProps } from "./index";
import { Cart } from "./cart/index";
import { VisuallyHidden } from "components/utilities";

import { Button, ButtonGroup, SvgIcon } from "@material-ui/core";
import { ViewList, ViewModule } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { enumToTitleCase } from "utils/product";
import { Stack } from "components/Stack";
import Link from "next/link";

export function DesktopNav(props: NavProps): JSX.Element {
  const { page, selectSingleCategory = () => undefined } = props;

  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();
  const apolloClient = useApollo();
  const { checkout, loading } = useContext(CheckoutContext);

  const checkoutItemsCount = checkout?.items.length || 0;

  function handleLogoClick() {
    router.push("/");
  }

  function handleCategoryClick(category?: Category) {
    if (page === "shop") {
      selectSingleCategory(category);
      closeShopMenu();
    } else {
      closeShopMenu();
      router.push(`/shop?category=${category}`);
    }
  }

  function closeShopMenu() {
    setIsCategoryMenuVisible(false);
  }

  function openCart() {
    setIsCartVisible(true);
    closeShopMenu();
  }

  function closeCart() {
    setIsCartVisible(false);
  }

  return (
    <Wrapper>
      <Nav>
        <Logo onClick={handleLogoClick} width={200} />
        <Stack inline gap align="center">
          <NavButton
            onMouseEnter={() => {
              setIsCategoryMenuVisible(true);
            }}
            onMouseLeave={() => {
              setIsCategoryMenuVisible(false);
            }}
            onClick={() => {
              setIsCategoryMenuVisible(
                (isCategoryMenuVisible) => !isCategoryMenuVisible
              );
            }}
          >
            shop by category
            <Chevron direction={ChevronDirection.Down} />
            {isCategoryMenuVisible && (
              <StyledMenu>
                <SubmenuSection>
                  {Object.entries(Category)
                    .filter(([_, value]) => value !== Category.NotApplicable)
                    .map(([key, category]) => (
                      <SubmenuItem
                        key={key}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {enumToTitleCase(category)}
                      </SubmenuItem>
                    ))}
                  <NavButton
                    onClick={() => {
                      setIsCategoryMenuVisible(false);
                      router.push("/shop");
                    }}
                  >
                    shop all
                  </NavButton>
                </SubmenuSection>
              </StyledMenu>
            )}
          </NavButton>

          <NavLink href="/brands">shop by brand</NavLink>
          <NavLinkList>
            <Stack inline>
              <label>
                <VisuallyHidden>search: </VisuallyHidden>
                <form
                  style={{ position: "relative" }}
                  onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const query = formData.get("search");
                    router.push(`/shop?search=${query}`);
                  }}
                >
                  <SearchIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 4,
                      width: 20,
                      height: 20,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <StyledInput name="search" placeholder="search" />
                </form>
              </label>
            </Stack>
          </NavLinkList>
          <NavIcons>
            <NavIconContainer>
              <CartIconContainer>
                <CartCount>
                  {loading ? (
                    <LoadingSpinner size={8} color="#ffffff" />
                  ) : (
                    checkoutItemsCount
                  )}
                </CartCount>
                <CartIcon onClick={openCart} isDark />
              </CartIconContainer>
            </NavIconContainer>
          </NavIcons>
        </Stack>
        <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
          <Cart onClose={closeCart} apolloClient={apolloClient} />
        </Drawer>
      </Nav>
      {page === "shop" && (
        <ViewToggle>
          <ButtonGroup>
            <Button variant="contained" onClick={() => props.setView?.("list")}>
              <SvgIcon component={ViewList} inheritViewBox />
            </Button>
            <Button variant="contained" onClick={() => props.setView?.("grid")}>
              <SvgIcon component={ViewModule} inheritViewBox />
            </Button>
          </ButtonGroup>
        </ViewToggle>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  z-index: 3;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0px 29px;
  height: 122px;

  color: var(--text);
  background-color: var(--background);
`;

const NavLinkList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-block: var(--space-2);
`;

const linkProperties = css`
  display: flex;
  align-items: center;
  padding-block: var(--space-2);
  color: var(--link);

  & > svg {
    margin-left: var(--space-2);
  }
`;

const NavLink = styled(Link)`
  ${linkProperties}
`;

const NavButton = styled.button`
  ${linkProperties}
  position: relative;
  background: none;
  border: none;
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--background);

  display: flex;
  justify-content: space-between;
  padding: var(--space-4);
  box-shadow: var(--shadow-1);
  border-radius: var(--radius-1);
`;

const SubmenuSection = styled.ul`
  outline: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-block: 0;
  padding-inline: 0;
`;

const SubmenuItem = styled.li`
  list-style: none;
  text-align: start;
  font-size: 13px;
  color: rgba(31, 43, 73, 0.7);
  text-decoration: none;

  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  &:hover {
    text-decoration: ${(props) => (props.onClick ? "underline" : "none")};
  }

  & > a {
    font-size: 13px;
    color: rgba(31, 43, 73, 0.7);
    text-decoration: none;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 100%;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: var(--radius-1);
  background-color: lightgray;
  padding: var(--space-1) var(--space-2);
  padding-left: 30px;
  color: black;

  &::placeholder {
    color: black;
  }
`;

const NavIconContainer = styled.div`
  height: 100%;
  margin-right: 20px;
  display: flex;
  align-items: center;

  :last-of-type {
    margin-right: 0;
  }
`;

const CartIconContainer = styled.div`
  position: relative;
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const CartCount = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 100%;
  background-color: #f4bd33;
  font-size: 11px;
  font-weight: 700;
  top: -11px;
  right: -22px;
  color: #ffffff;
`;

const ViewToggle = styled.div`
  align-self: end;
  padding: 0 var(--space-7);
`;
