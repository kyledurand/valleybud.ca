import { useContext, useState } from "react";
import styled from "styled-components";
import { Text } from "../../Text";
import { MenuProductFragment } from "api/queries/menu.graphql";
import { capitalizeFirstLetter, deriveDisplayPrices } from "utils/product";

import { ProductModal } from "./product-modal";
import { Stack } from "components/Stack";
import { useAddItemToCheckoutMutation } from "api/mutations/add-item-to-checkout.graphql";
import { retailerId } from "api/apollo";
import { CheckoutContext } from "../checkout-context";

interface ProductCardProps {
  product: MenuProductFragment;
}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { product } = props;
  const { checkout } = useContext(CheckoutContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [
    addItemToCheckoutMutation,
    { loading: addingToCart },
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

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <ProductImage src={product.image} />
        <Stack gap="2">
          <div>
            <Text size="2">{product.name}</Text>
            {product.brand?.name && <Text>{product.brand.name}</Text>}
          </div>

          <Stack inline align="center" gap="2">
            <Text>
              {capitalizeFirstLetter(product.strainType ?? "").replace(
                /_/g,
                " "
              )}
            </Text>
            •<Text>thc {product.potencyThc?.formatted || "0mg"}</Text>-
            <Text>cbd {product.potencyCbd?.formatted || "0mg"}</Text>
          </Stack>

          <Stack inline justify="space-between">
            <Text>{deriveDisplayPrices(product).rec}</Text>
            <AddToCart onClick={(event) => handleAddToCartClick(event)}>
              {addingToCart ? "Adding" : "Add to cart"}
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

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: var(--space-2);
  background: none;
  border: none;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: var(--space-2);
`;

const AddToCart = styled.button`
  background: none;
  color: gray;
  border: none;
`;
