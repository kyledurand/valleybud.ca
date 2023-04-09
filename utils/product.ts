import {ProductFragment} from "api/fragments/menu-product.graphql";
import {formatPrice} from "./number-format";

interface DisplayPrices {
  med: string;
  rec: string;
}

export function deriveDisplayPrices(product: ProductFragment): DisplayPrices {
  if (product.variants?.length === 0) {
    return {
      med: "n/a",
      rec: "n/a",
    };
  }

  const variant =
    product.variants?.length === 1
      ? product.variants[0]
      : product.variants?.find((variant) => variant.option === "1g") ||
        product.variants[0];

  // TODO: handle specials
  return {
    med: variant?.priceMed ? formatPrice(variant.priceMed) : "n/a",
    rec: variant?.priceRec ? formatPrice(variant.priceRec) : "n/a",
  };
}

export function enumToTitleCase(enumValue: string) {
  return capitalizeFirstLetter(enumValue.replace(/_/g, " "));
}

export function capitalizeFirstLetter(string?: String) {
  return `${string?.charAt(0).toUpperCase()}${string
    ?.slice(1)
    .toLocaleLowerCase()}`;
}
