import styled, {createGlobalStyle} from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {Meta} from "components/Meta";
import {GoogleAnalytics, GoogleTagManager} from "@next/third-parties/google";
import {Logo} from "components/shared/svg/logo";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

const GlobalStyle = createGlobalStyle`
  #__next {
    height: 100%;
    overflow: hidden;
  }
`;

export default function Shop() {
  const {breakpoints} = useTheme();
  const mediaQuery = breakpoints.up("md");
  const breakpointMatches = useMediaQuery(mediaQuery);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const [iframeSrc, setIframeSrc] = useState(
    "https://valleybudwebmenu.azurewebsites.net/homepage/1"
  );

  useEffect(() => {
    const baseUrl = "https://valleybudwebmenu.azurewebsites.net/homepage/1";

    // Handle URL parameters on mount
    if (router.isReady) {
      const {identifier, id} = router.query;

      if (identifier && id) {
        let identifierPath = "";
        if (identifier === "product") {
          identifierPath = "product";
        } else if (identifier === "category") {
          identifierPath = "productGroup";
        } else if (identifier === "cart") {
          identifierPath = "cart";
        } else if (identifier === "signUp") {
          identifierPath = "account/register";
        }

        if (identifierPath) {
          setIframeSrc(`${baseUrl}/${identifierPath}/${id}`);
        }
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        !event.origin.startsWith("https://valleybudwebmenu.azurewebsites.net")
      ) {
        console.log("Message from non-allowed origin", event.origin);
        return;
      }

      const data = event.data;
      console.log("Message from allowed origin", data);

      // Handle height adjustment
      if (!isNaN(data) && iframeRef.current) {
        iframeRef.current.style.height = `${data}px`;
      }
      // Handle navigation with identifier
      else if (typeof data === "string" && data.includes("identifier")) {
        window.location.href = data;
      }
      // Handle cart/branch data and scrolling
      else if (typeof data === "string") {
        const dataArray = data.split("_");
        const scrollToHeight = dataArray[1];
        const cartId = dataArray[2];
        const branchId = dataArray[3];

        window.scrollTo(0, Number(scrollToHeight));

        if (
          (!localStorage.getItem("cartId") ||
            localStorage.getItem("cartId") !== cartId) &&
          cartId !== "0"
        ) {
          localStorage.setItem("cartId", cartId);
        }

        if (
          !localStorage.getItem("selectedBranch") ||
          localStorage.getItem("selectedBranch") !== branchId
        ) {
          localStorage.setItem("selectedBranch", branchId);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Meta />
      <LogoContainer>
        <Logo width={breakpointMatches ? 300 : undefined} color="white" />
      </LogoContainer>

      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{opacity: 1, visibility: "visible"}}
        id="iframe"
        src={iframeSrc}
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
