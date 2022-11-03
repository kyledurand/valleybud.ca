import { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Drawer from "@material-ui/core/Drawer";
import { useApollo } from "api/apollo";
import { Category } from "api/queries/checkout.graphql";
import { Chevron, ChevronDirection } from "components/shared/svg/chevron";
import { Logo } from "components/shared/svg/logo";
import { CartIcon } from "components/shared/svg/cart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { displayNameForCategory } from "utils/enum-to-display-name/category";

import { NavProps } from "./index";
import { Cart } from "./cart/index";
import { VisuallyHidden } from "components/utilities";

const SUBMENU_CATEGORIES = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

export function DesktopNav(props: NavProps): JSX.Element {
  const { page, selectSingleCategory = () => undefined } = props;

  const [isBrandMenuVisible, setBrandMenuVisible] = useState(false);
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
    if (page === "menu") {
      selectSingleCategory(category);
      closeShopMenu();
    } else {
      router.push(`/menu?category=${category}`);
    }
  }

  function closeShopMenu() {
    setBrandMenuVisible(false);
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
    <>
      {(isBrandMenuVisible || isCategoryMenuVisible) && (
        <Backdrop onClick={closeShopMenu} />
      )}
      <NavContainer>
        <Logo onClick={handleLogoClick} width={200} />
        <NavLinksContainer>
          <NavLinkListItem
            onClick={() => {
              setBrandMenuVisible(false);
              setIsCategoryMenuVisible(
                (isCategoryMenuVisible) => !isCategoryMenuVisible
              );
            }}
          >
            <NavLink>
              shop by category
              <Chevron direction={ChevronDirection.Down} color="#000" />
            </NavLink>
          </NavLinkListItem>
          <NavLinkListItem
            onClick={() => {
              setIsCategoryMenuVisible(false);
              setBrandMenuVisible((isBrandMenuVisible) => !isBrandMenuVisible);
            }}
          >
            <NavLink isUnderlined={page === "menu"}>
              shop by brand
              <Chevron
                direction={
                  isBrandMenuVisible
                    ? ChevronDirection.Up
                    : ChevronDirection.Down
                }
                color="#000"
              />
            </NavLink>
          </NavLinkListItem>
          <NavLinkList>
            <NavLinkListItem>
              <NavLink>
                <label>
                  <VisuallyHidden>search: </VisuallyHidden>
                  <input
                    value={props.search}
                    onChange={({ target }) => props.setSearch(target.value)}
                    placeholder="search"
                  />
                </label>
              </NavLink>
            </NavLinkListItem>
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
        </NavLinksContainer>

        {/* SHOP BRANDS */}
        {isBrandMenuVisible && (
          <StyledMenu>
            <SubmenuSection>
              <SubmenuItem>brand1</SubmenuItem>
            </SubmenuSection>
          </StyledMenu>
        )}
        {/* SHOP BRANDS */}
        {isCategoryMenuVisible && (
          <StyledMenu>
            <SubmenuSection>
              {SUBMENU_CATEGORIES.map((category) => (
                <SubmenuItem
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {displayNameForCategory(category)}
                </SubmenuItem>
              ))}
            </SubmenuSection>
          </StyledMenu>
        )}
        {/* CART */}
        <Drawer anchor="right" open={isCartVisible} onBackdropClick={closeCart}>
          <Cart onClose={closeCart} apolloClient={apolloClient} />
        </Drawer>
      </NavContainer>
    </>
  );
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SubmenuSection = styled.div`
  outline: none;
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  height: 363px;
  width: 100%;
  max-width: 1440px;
  background-color: #ffffff;

  display: flex;
  justify-content: space-between;
  padding: 25px 200px;
`;

const SubmenuItem = styled.div`
  margin-bottom: 18px;

  // for items that aren't actually links yet
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

const NavContainer = styled.nav<{ darkBackground?: boolean }>`
  z-index: 3;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0px 29px;
  height: 122px;

  color: var(--text);
  background-color: #ffffff;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkListItem = styled.div`
  margin-right: 40px;
  height: 100%;

  &:last-of-type {
    margin-right: 48px;
  }
`;

const NavLink = styled.div<{
  darkBackground?: boolean;
  isUnderlined?: boolean;
}>`
  color: ${(props) => (props.darkBackground ? "#ffffff" : "#1F2B49")};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  user-select: none;
  border-bottom: ${(props) =>
    props.isUnderlined ? "3px solid #F4BD33" : "none"};

  // hacky. will revisit this
  & > svg {
    margin-left: 4px;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 100%;
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
