type Justify =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type Align = "start" | "end" | "center" | "stretch" | "baseline";

interface Props {
  space?: string;
  justify?: Justify;
  align?: Align;
  inline?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
}

export function Stack({
  children,
  inline,
  justify,
  align,
  fullHeight,
  space = "var(--space-4)",
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: inline ? "row" : "column",
        gap: space,
        justifyContent: justify,
        alignItems: align,
        height: fullHeight ? "100%" : undefined,
      }}
    >
      {children}
    </div>
  );
}
