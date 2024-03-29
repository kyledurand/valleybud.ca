export const mediaSizes = {
  largeDesktop: 1200,
  desktop: 992,
  largeTablet: 960,
  tablet: 900,
  largePhone: 768,
  phone: 575,
  smallPhone: 390,
};

export const prefersDark = "(prefers-color-scheme: dark)";

export const mediaQueriesUp = {
  lg: `only screen and (min-width: ${mediaSizes.largeDesktop + 1}px)`,
  md: `only screen and (min-width: ${mediaSizes.largeTablet + 1}px)`,
  sm: `only screen and (min-width: ${mediaSizes.largePhone + 1}px)`,
  xs: `only screen and (min-width: ${mediaSizes.smallPhone + 1}px)`,
  custom: (px: number): string => `only screen and (min-width: ${px}px)`,
};

export const mediaQueriesDown = {
  largeDesktop: `only screen and (max-width: ${mediaSizes.largeDesktop + 1}px)`,
  desktop: `only screen and (max-width: ${mediaSizes.desktop + 1}px)`,
  largeTablet: `only screen and (max-width: ${mediaSizes.largeTablet - 1}px)`, // to match our MobileOnly component
  tablet: `only screen and (max-width: ${mediaSizes.tablet + 1}px)`,
  largePhone: `only screen and (max-width: ${mediaSizes.largePhone + 1}px)`,
  phone: `only screen and (max-width: ${mediaSizes.phone + 1}px)`,
  smallPhone: `only screen and (max-width: ${mediaSizes.smallPhone + 1}px)`,
  iPhone5: "only screen and (max-width: 325px)",
  custom: (px: number): string => `only screen and (max-width: ${px}px)`,
};
