import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { normalize } from "styled-normalize";
import "../styles/globals.css";
import {
  createGlobalStyle,
  ThemeProvider as StyledComponentsProvider,
} from "styled-components";
import { useApollo } from "api/apollo";
import { QueryParamProvider } from "components/shared/query-param-provider";
import {
  ThemeProvider as MuiProvider,
  StylesProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { mediaSizes, mediaQueries } from "styles/media-queries";
import { Meta } from "components/Meta";

// exports for use in storybook TODO: move/reorganize this stuff
export {
  ThemeProvider as MuiProvider,
  StylesProvider,
} from "@material-ui/core/styles";
export { ThemeProvider as StyledComponentsProvider } from "styled-components";
export const styledComponentsTheme = {
  breakpoints: Object.values(mediaSizes)
    .reverse()
    .map((size) => `${size + 1}px`), // +1 required to avoid conflicts on exact pixels. - Alex 9/17/18
  mediaQueries,
  // TODO: colors/spacing/other shtuff
};
export const muiTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application
    },
  },
});
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
  }
`;
const PagesStyle = createGlobalStyle`
  html, body {
    background-color: rgb(248,245,240);
  }
`;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo();

  return (
    <>
      <Meta />
      <QueryParamProvider>
        <ApolloProvider client={apolloClient}>
          <StyledComponentsProvider theme={styledComponentsTheme}>
            <MuiProvider theme={muiTheme}>
              <StylesProvider injectFirst>
                <GlobalStyle />
                <PagesStyle />
                <Component {...pageProps} />
              </StylesProvider>
            </MuiProvider>
          </StyledComponentsProvider>
        </ApolloProvider>
      </QueryParamProvider>
    </>
  );
}
