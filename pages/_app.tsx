import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { normalize } from "styled-normalize";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
import {
  mediaSizes,
  mediaQueriesDown,
  prefersDark,
} from "styles/media-queries";
import { Meta } from "components/Meta";
import { useSessionStorage } from "hooks/use-session-storage";
import { AgeGate } from "components/age-gate";

export {
  ThemeProvider as MuiProvider,
  StylesProvider,
} from "@material-ui/core/styles";
export { ThemeProvider as StyledComponentsProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo();
  const router = useRouter();
  const isDarkMode = useMediaQuery(prefersDark);
  const [sessionVerified, setSessionVerified] = useSessionStorage("verified");
  console.log({ isDarkMode });
  return (
    <>
      <Meta />
      <QueryParamProvider>
        <ApolloProvider client={apolloClient}>
          <StyledComponentsProvider theme={styledComponentsTheme}>
            <MuiProvider theme={muiTheme}>
              <StylesProvider injectFirst>
                <GlobalStyle />
                {sessionVerified === "true" ? (
                  <Component {...pageProps} />
                ) : (
                  <AgeGate
                    onVerify={setSessionVerified}
                    sessionVerified={sessionVerified}
                  />
                )}
              </StylesProvider>
            </MuiProvider>
          </StyledComponentsProvider>
        </ApolloProvider>
      </QueryParamProvider>
    </>
  );
}
export const styledComponentsTheme = {
  breakpoints: Object.values(mediaSizes)
    .reverse()
    .map((size) => `${size + 1}px`),
  mediaQueriesDown,
};
export const muiTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {box-sizing: border-box;}
`;
