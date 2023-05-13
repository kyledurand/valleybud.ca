import type {Weight, Size} from "types";
import styles from "./Text.module.css";

type Element = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "legend";
type Tone = "positive";
interface Props {
  as?: Element;
  size?: Size;
  weight?: Weight;
  tone?: Tone;
  inclusivelyHidden?: boolean;
  align?: "start" | "center" | "end";
  variant?: "subheading";
  children: React.ReactNode;
}

export function Text({
  as,
  align,
  tone,
  variant,
  inclusivelyHidden,
  children,
  weight,
  size,
}: Props) {
  const Component = as || "p";

  return (
    <Component
      style={
        {
          textAlign: align,
          color: tone ? "var(--brand-accent-blue)" : undefined,
          fontSize: size ? `var(--font-size-${size})` : undefined,
          ...(weight ? {fontWeight: `var(--font-weight-${weight})`} : {}),
          textTransform: variant === "subheading" ? "uppercase" : undefined,
        } as React.CSSProperties
      }
      className={[
        styles.Text,
        inclusivelyHidden && styles.inclusivelyHidden,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
