import { Category } from "api/queries/menu.graphql";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { DesktopOnly } from "components/shared/responsive/desktop-only";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export interface NavProps {
  page?: "shop";
  selectSingleCategory?(category?: Category): void;
  selectSingleBrand?(brand?: { name?: string; id?: string }): void;
}

export function Nav(props: NavProps): JSX.Element {
  return (
    <>
      <DesktopOnly>
        <DesktopNav {...props} />
      </DesktopOnly>
      <MobileOnly>
        <MobileNav {...props} />
      </MobileOnly>
    </>
  );
}
