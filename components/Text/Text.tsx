import type {Weight, Size} from "types";
import styles from "./Text.module.css";

type Element = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface Props {
  as?: Element;
  size?: Size;
  weight?: Weight;
  children: React.ReactNode;
}

export function Text({as, children, weight, size}: Props) {
  const Component = as || "p";

  return (
    <Component
      style={
        {
          fontSize: size ? `var(--font-size-${size})` : undefined,
          ...(weight ? {fontWeight: `var(--font-weight-${weight})`} : {}),
        } as React.CSSProperties
      }
      className={styles.Text}
    >
      {children}
    </Component>
  );
}
