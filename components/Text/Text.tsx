import styles from "./Text.module.css";

type Variation = "heading" | "subheading" | "body" | "caption";

type Element = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface Props {
  as?: Element;
  variation?: Variation;
  children: React.ReactNode;
}

export function Text({ as, children, variation }: Props) {
  const Component = as || "p";

  return (
    <Component
      className={[styles.Text, variation ? styles[variation] : undefined].join(
        " "
      )}
    >
      {children}
    </Component>
  );
}
