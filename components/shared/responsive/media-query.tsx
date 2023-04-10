import {useState, useEffect, ReactNode} from "react";
import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";

export interface MediaQueryProps {
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl";
  direction: "up" | "down" | "only" | "width";
  children: ReactNode;
  className?: string;
}

export function MediaQuery(props: MediaQueryProps): JSX.Element | null {
  const {breakpoints} = useTheme();
  const [shouldUseMediaQuery, setShouldUseMediaQuery] = useState(false);
  const {breakpoint, direction, children, className = ""} = props;
  const mediaQuery = String(breakpoints[direction](breakpoint));
  const doesMatch = useMediaQuery(mediaQuery);

  useEffect(() => {
    setShouldUseMediaQuery(true);
  }, []);

  if (shouldUseMediaQuery && !doesMatch) return null;

  return (
    <Content mediaQuery={mediaQuery} className={className}>
      {children}
    </Content>
  );
}

const Content = styled.div<{mediaQuery: string}>`
  display: none;

  ${({mediaQuery}) => mediaQuery} {
    display: contents;
  }
`;
