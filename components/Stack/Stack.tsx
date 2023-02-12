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
  inline?: boolean;
  justify?: Justify;
  align?: Align;
  children: React.ReactNode;
}

export function Stack({
  children,
  inline,
  justify,
  align,
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
      }}
    >
      {children}
    </div>
  );
}
