import type {Space} from "types";

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
  paddingBlock?: Space;
  paddingInline?: Space;
  children: React.ReactNode;
}

export function Stack({
  children,
  wrap = true,
  grow,
  inline,
  justify,
  padding,
  paddingBlock,
  paddingInline,
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
            ? "var(--space-2)"
            : gap
            ? `var(--space-${gap})`
            : undefined,
        padding:
          padding === true
            ? "var(--space-2)"
            : padding
            ? `var(--space-${padding})`
            : undefined,
        paddingBlock: paddingBlock ? `var(--space-${paddingBlock})` : undefined,
        paddingInline: paddingInline
          ? `var(--space-${paddingInline})`
          : undefined,
        justifyContent: justify,
        alignItems: align,
        height: fullHeight ? "100%" : undefined,
        flexGrow: grow ? 1 : undefined,
        flexWrap: wrap ? "wrap" : undefined,
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  );
}
