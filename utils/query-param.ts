import {encodeDelimitedArray, decodeDelimitedArray} from "use-query-params";
import {Category, Effects} from "api/fragments/menu-product.graphql";

type QueryParamValue = string | (string | null)[] | null | undefined;

export const CategoriesParam = {
  encode: (categories: Set<Category>): QueryParamValue =>
    categories.size > 0
      ? encodeDelimitedArray([...categories], ",")
      : undefined,
  decode: (categoriesStr: QueryParamValue): Set<Category> => {
    const categoriesArray = decodeDelimitedArray(categoriesStr, ",")?.filter(
      // explicitly checking if the provided query params are actually in the enum type here
      // if they're not, ignore them and don't include them in the set
      (param) => param && Object.values(Category).includes(param as Category)
    );
    return new Set(categoriesArray) as Set<Category>;
  },
};

export const EffectsParam = {
  encode: (effects: Set<Effects>): QueryParamValue =>
    effects.size > 0 ? encodeDelimitedArray([...effects], ",") : undefined,
  decode: (effectsStr: QueryParamValue): Set<Effects> => {
    const effectsArray = decodeDelimitedArray(effectsStr, ",")?.filter(
      (param) => param && Object.values(Effects).includes(param as Effects)
    );
    return new Set(effectsArray) as Set<Effects>;
  },
};
