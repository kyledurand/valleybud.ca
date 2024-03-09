import Script from "next/script";
import {Logo} from "components/shared/svg/logo";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {Meta} from "components/Meta";
import {GoogleAnalytics, GoogleTagManager} from "@next/third-parties/google";

export default function Shop() {
  const {breakpoints} = useTheme();
  const mediaQuery = breakpoints.up("md");
  const breakpointMatches = useMediaQuery(mediaQuery);

  return (
    <>
      <Meta />
      <LogoContainer>
        <Logo width={breakpointMatches ? 300 : undefined} color="white" />
      </LogoContainer>
      <Script
        async={false}
        defer={false}
        id="dutchie--embed__script"
        src="https://dutchie.com/api/v2/embedded-menu/62faac762c50bd00aa734b8c.js"
      />
      <GoogleAnalytics gaId="G-GNN3NEKVKF" dataLayerName="shop" />
      <GoogleTagManager gtmId="G-GNN3NEKVKF" dataLayerName="shop" />
    </>
  );
}

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--space-2);
  background-color: var(--brand-accent-orange);
`;
