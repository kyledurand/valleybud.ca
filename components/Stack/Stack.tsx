import type { Space } from "types";

type Justify =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type Align = "start" | "end" | "center" | "stretch" | "baseline";

interface Props {
  gap?: Space;
  justify?: Justify;
  align?: Align;
  wrap?: boolean;
  grow?: boolean;
  inline?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
}

export function Stack({
  children,
  wrap,
  grow,
  inline,
  justify,
  align,
  fullHeight,
  gap = "2",
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: inline ? "row" : "column",
        gap: `var(--space-${gap})`,
        justifyContent: justify,
        alignItems: align,
        height: fullHeight ? "100%" : undefined,
        flex: grow ? 1 : undefined,
        flexWrap: wrap ? "wrap" : undefined,
      }}
    >
      {children}
    </div>
  );
}
