import {useState, useContext} from "react";
import styled, {css} from "styled-components";
import {useRouter} from "next/router";
import Drawer from "@material-ui/core/Drawer";
import {useApollo} from "api/apollo";
import {Category} from "api/queries/checkout.graphql";
import {Chevron, ChevronDirection} from "components/shared/svg/chevron";
import {Logo} from "components/shared/svg/logo";
import {CartIcon} from "components/shared/svg/cart-icon";
import {CheckoutContext} from "components/shared/checkout-context";
import {LoadingSpinner} from "components/shared/loading-spinner";

import {NavProps} from "./index";
import {Cart} from "./cart/index";
import {VisuallyHidden} from "components/utilities";

import SearchIcon from "@mui/icons-material/Search";
import {enumToTitleCase} from "utils/product";
import {Stack} from "components/Stack";
import Link from "next/link";
import {Input} from "components/Input";
import {Button} from "components/Button";
import {CATEGORIES} from "pages/shop";

export function DesktopNav(props: NavProps): JSX.Element {
  const {page, selectSingleCategory = () => undefined} = props;

  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();
  const apolloClient = useApollo();
  const {checkout, loading} = useContext(CheckoutContext);

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
                  {CATEGORIES.map((category) => (
                    <SubmenuItem key={category}>
                      <Button
                        padding
                        fullWidth
                        stopPropagation
                        onClick={() => {
                          setIsCartVisible(false);
                          handleCategoryClick(category);
                        }}
                      >
                        {enumToTitleCase(category)}
                      </Button>
                    </SubmenuItem>
                  ))}
                  <SubmenuItem>
                    <Button
                      padding
                      fullWidth
                      stopPropagation
                      onClick={() => {
                        handleCategoryClick(undefined);
                        setIsCategoryMenuVisible(false);
                      }}
                    >
                      Shop all
                    </Button>
                  </SubmenuItem>
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
                  style={{position: "relative"}}
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
                      color: "var(--text)",
                    }}
                  />
                  <Input name="search" placeholder="search" />
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
  padding: var(--space-5) var(--space-7);

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
  color: var(--text);

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
  right: 0;
  background-color: var(--background);

  display: flex;
  justify-content: space-between;
  box-shadow: var(--shadow-1);
  border-radius: var(--radius-1);
`;

const SubmenuSection = styled.ul`
  outline: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-block: 0;
  padding-inline: 0;
  text-align: start;
  width: 100%;
`;

const SubmenuItem = styled.li`
  list-style: none;
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
