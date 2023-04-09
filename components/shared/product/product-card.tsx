import {useContext, useState} from "react";
import styled from "styled-components";
import {Text} from "../../Text";
import {ProductFragment} from "api/queries/menu.graphql";
import {enumToTitleCase, deriveDisplayPrices} from "utils/product";

import {ProductModal} from "./product-modal";
import {Stack} from "components/Stack";
import {useAddItemToCheckoutMutation} from "api/mutations/add-item-to-checkout.graphql";
import {retailerId} from "api/apollo";
import {CheckoutContext} from "../checkout-context";
import Image from "next/image";
import {useMediaQuery, useTheme} from "@material-ui/core";

interface ProductCardProps {
  product: ProductFragment;
  layout: "grid" | "list";
}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const {breakpoints} = useTheme();
  const mdUp = useMediaQuery(breakpoints.up("md"));
  const {product, layout} = props;
  const {checkout} = useContext(CheckoutContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    addItemToCheckoutMutation,
    {loading: addingToCart},
  ] = useAddItemToCheckoutMutation();

  async function handleAddToCartClick(event: React.MouseEvent) {
    event.stopPropagation();
    await addItemToCheckoutMutation({
      variables: {
        retailerId,
        checkoutId: checkout?.id || "",
        productId: product.id,
        quantity: 1,
        option: product.variants[0].option,
      },
    });
  }

  const strainMarkup =
    product.strainType === "NOT_APPLICABLE" ? null : (
      <>
        <Text>
          {enumToTitleCase(product.strainType ?? "").replace(/_/g, " ")}
        </Text>
        •
      </>
    );
  console.log(product);

  return (
    <>
      <Container layout={layout} onClick={() => setIsModalOpen(true)}>
        <ProductImage
          width={layout === "list" ? 100 : 280}
          height={layout === "list" ? 100 : 280}
          src={product.image}
        />
        <Stack
          inline={layout === "list"}
          justify="space-between"
          gap
          grow
          wrap
          fullWidth
        >
          <Stack gap>
            <div>
              <Text size="2">{product.name}</Text>
              {product.brand?.name && <Text>{product.brand.name}</Text>}
            </div>

            <Stack inline align="center" gap>
              {strainMarkup}
              <Text>thc {product.potencyThc?.formatted || "0mg"}</Text>-
              <Text>cbd {product.potencyCbd?.formatted || "0mg"}</Text>
            </Stack>
          </Stack>

          <Stack
            gap="1"
            inline
            justify={
              layout === "grid"
                ? "space-between"
                : mdUp
                ? "end"
                : "space-between"
            }
            align="end"
            grow
          >
            <Text>{deriveDisplayPrices(product).rec}</Text>
            <AddToCart onClick={(event) => handleAddToCartClick(event)}>
              {addingToCart ? "Adding" : "+ Add to cart"}
            </AddToCart>
          </Stack>
        </Stack>
      </Container>

      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

const Container = styled.a<{layout: string}>`
  // TODO: Migrate this to use the new Stack component
  display: flex;
  flex-direction: ${({layout}) => (layout === "list" ? "row" : "column")};
  justify-content: ${({layout}) =>
    layout === "list" ? "flex-start" : "space-between"};
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  margin: 0 auto;
  background: none;
  border: none;
  text-align: left;
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: var(--space-2);
`;

const AddToCart = styled.button`
  background: none;
  color: gray;
  border: none;
  padding: 0;
  word-break: keep-all;
`;
