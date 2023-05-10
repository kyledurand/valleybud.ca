import {ProductFragmentFragment} from "api/fragments/menu-product.graphql";

interface DisplayPrices {
  med: number;
  rec: number;
  specialMed?: number;
  specialRec?: number;
}

export function deriveDisplayPrices(
  product: ProductFragmentFragment
): DisplayPrices {
  if (product.variants?.length === 0) {
    return {
      med: 0,
      rec: 0,
    };
  }

  const variant =
    product.variants?.length === 1
      ? product.variants[0]
      : product.variants?.find((variant) => variant.option === "1g") ||
        product.variants[0];

  return {
    med: variant?.priceMed ? variant.priceMed : 0,
    rec: variant?.priceRec ? variant.priceRec : 0,
    specialMed: variant?.specialPriceMed ? variant.specialPriceMed : 0,
    specialRec: variant?.specialPriceRec ? variant.specialPriceRec : 0,
  };
}

export function enumToTitleCase(enumValue?: string | null) {
  return capitalizeFirstLetter(enumValue?.replace(/_/g, " "));
}

export function capitalizeFirstLetter(string?: String) {
  return `${string?.charAt(0).toUpperCase()}${string
    ?.slice(1)
    .toLocaleLowerCase()}`;
}
