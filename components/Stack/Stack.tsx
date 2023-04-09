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
  gap?: Space | boolean;
  justify?: Justify;
  align?: Align;
  wrap?: boolean;
  grow?: boolean;
  inline?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  padding?: Space | boolean;
  children: React.ReactNode;
}

export function Stack({
  children,
  wrap = true,
  grow,
  inline,
  justify,
  padding,
  align,
  fullHeight,
  fullWidth,
  gap,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: inline ? "row" : "column",
        gap:
          gap === true
            ? "var(--space-4)"
            : gap
            ? `var(--space-${gap})`
            : undefined,
        padding:
          padding === true
            ? "var(--space-2)"
            : padding
            ? `var(--space-${padding})`
            : undefined,
        justifyContent: justify,
        alignItems: align,
        height: fullHeight ? "100%" : undefined,
        flex: grow ? 1 : undefined,
        flexWrap: wrap ? "wrap" : undefined,
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  );
}
