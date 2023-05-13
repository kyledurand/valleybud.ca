import {useState, useContext} from "react";
import styled from "styled-components";

import {useTheme} from "@material-ui/core/styles";
import {Snackbar, useMediaQuery} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {useAddItemToCheckoutMutation} from "api/mutations/add-item-to-checkout.graphql";
import {ProductFragmentFragment} from "api/fragments/menu-product.graphql";
import {DesktopOnly} from "components/shared/responsive/desktop-only";
import {MobileOnly} from "components/shared/responsive/mobile-only";
import {CloseButton} from "components/shared/svg/close-button";
import {CartIcon} from "components/shared/svg/cart-icon";
import {CheckoutContext} from "components/shared/checkout-context";
import {LoadingSpinner} from "components/shared/loading-spinner";
import {mediaQueriesDown} from "styles/media-queries";
import {deriveDisplayPrices} from "utils/product";
import {formatPrice} from "utils/number-format";

import {retailerId} from "api/apollo";
import {Button} from "components/Button";
import {Stack} from "components/Stack";

interface ProductModalProps {
  product: ProductFragmentFragment;
  open: boolean;
  onClose: () => void;
}

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8];

export function ProductModal(props: ProductModalProps): JSX.Element {
  const {product, open, onClose} = props;
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {checkout} = useContext(CheckoutContext);

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0].option
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [
    addItemToCheckoutMutation,
    {loading: addingToCart},
  ] = useAddItemToCheckoutMutation();

  function handleCloseClick() {
    onClose();
  }

  async function handleAddToCartClick() {
    try {
      await addItemToCheckoutMutation({
        variables: {
          retailerId,
          checkoutId: checkout?.id || "",
          productId: product.id,
          quantity: selectedQuantity,
          option: selectedVariant,
        },
      });
      onClose();
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? undefined : "lg"}
      fullScreen={isMobile}
    >
      <StyledSnackbar
        open={!!error}
        message={error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      />
      <DialogContent>
        <ImageContainer>
          <Image src={product.image} alt={product.name} />
          <MobileOnly>
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseClick} isDark />
            </CloseButtonContainer>
          </MobileOnly>
        </ImageContainer>

        <ContentContainer>
          <DesktopOnly>
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseClick} isDark />
            </CloseButtonContainer>
          </DesktopOnly>

          <p>{product.strainType?.toLocaleUpperCase()}</p>

          {product.brand?.name && <Brand>{product.brand.name}</Brand>}

          <Name>{product.name}</Name>

          <DisplayPrice>{deriveDisplayPrices(product).rec}</DisplayPrice>

          <Description>{product.description}</Description>

          {product.potencyThc?.formatted && (
            <CanabanoidDetail>
              <CanabanoidLabel>THC:</CanabanoidLabel>{" "}
              {product.potencyThc.formatted}
            </CanabanoidDetail>
          )}
          {product.potencyCbd?.formatted && (
            <CanabanoidDetail>
              <CanabanoidLabel>CBD:</CanabanoidLabel>{" "}
              {product.potencyCbd.formatted}
            </CanabanoidDetail>
          )}
          <FormContainer>
            {product.variants.length > 1 && (
              <VariantSelect
                value={selectedVariant}
                onChange={(e) => {
                  setSelectedVariant(e.target.value as string);
                }}
                variant="outlined"
              >
                {product.variants.map((variant) => (
                  <MenuItem key={variant.option} value={variant.option}>
                    {variant.option} - {formatPrice(variant.priceRec)}
                  </MenuItem>
                ))}
              </VariantSelect>
            )}

            <QuantitySelect
              value={selectedQuantity}
              onChange={(e) => {
                setSelectedQuantity(e.target.value as number);
              }}
              variant="outlined"
            >
              {QUANTITIES.map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </QuantitySelect>
            <Button
              padding="4"
              variant="primary"
              onClick={handleAddToCartClick}
            >
              <Stack inline align="center" gap>
                <CartIcon />
                {addingToCart ? (
                  <StyledLoadingSpinner size={16} color="#ffffff" />
                ) : (
                  "Add to cart"
                )}
              </Stack>
            </Button>
          </FormContainer>
        </ContentContainer>
      </DialogContent>
    </Dialog>
  );
}

const StyledLoadingSpinner = styled(LoadingSpinner)`
  margin-right: 34px;
  margin-left: 34px;
`;

const FormContainer = styled.div`
  height: 58px;
  display: flex;
  justify-content: stretch;
  margin-bottom: 61px;

  @media ${mediaQueriesDown.phone} {
    height: 116px;
    display: block;
    margin-bottom: 0;
  }
`;

const StyledSnackbar = styled(Snackbar)`
  & .MuiSnackbarContent-root {
    background-color: var(--background-error);
    color: #ffffff;
  }
`;

// TODO: make a proper shared select component. currently the dropdown does not match specs.
const StyledSelect = styled(Select)`
  border-radius: 0px !important;
  margin-right: 12px;
  height: 58px;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 18px;
  }

  @media ${mediaQueriesDown.phone} {
    margin-bottom: 13px;
  }
`;

const VariantSelect = styled(StyledSelect)`
  width: 197px;
`;

const QuantitySelect = styled(StyledSelect)`
  width: 106px;

  @media ${mediaQueriesDown.phone} {
    margin-right: 0;
  }
`;

const DialogContent = styled.div`
  position: relative;
  display: flex;

  @media ${mediaQueriesDown.phone} {
    flex-direction: column;
    max-height: auto;
  }
`;

const ImageContainer = styled.div`
  width: 450px;
  padding: 29px;
  flex-shrink: 0;
  background-color: rgba(248, 245, 240, 0.4);
  border-right: 1px solid rgba(160, 154, 142, 0.4);

  @media ${mediaQueriesDown.phone} {
    padding: 0;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(160, 154, 142, 0.4);
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  mix-blend-mode: darken;

  @media ${mediaQueriesDown.phone} {
    height: 288px;
  }
`;

const ContentContainer = styled.div`
  width: 600px;
  flex-shrink: 0;
  padding: 80px 61px 47px;
  overflow-y: auto;

  @media ${mediaQueriesDown.phone} {
    width: 100%;
    padding: 27px 30px;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 2;
`;

const Brand = styled.div`
  color: #1f2b49;
  font-size: 16px;

  @media ${mediaQueriesDown.phone} {
    font-size: 14px;
  }
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 20px;

  @media ${mediaQueriesDown.phone} {
    font-size: 23px;
  }
`;

const DisplayPrice = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 34px;
  line-height: 27px;
  font-weight: 300;

  @media ${mediaQueriesDown.phone} {
    font-size: 13px;
    line-height: 23px;
  }
`;

const CanabanoidDetail = styled.div`
  font-size: 13px;
  margin-bottom: 13px;

  & + & {
    margin-bottom: 50px;
  }

  @media ${mediaQueriesDown.phone} {
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 23px;

    & + & {
      margin-right: 0px;
      margin-bottom: 23px;
    }
  }
`;

const CanabanoidLabel = styled.span`
  font-weight: 600;
`;
