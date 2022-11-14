import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Image from "next/image";
import styles from "../styles/Carousel.module.css";
interface Image {
  link: string;
  source: string;
  title?: string;
  subText?: string;
  background?: string;
}

interface CarouselProps {
  images: Image[];
  selected: number;
  height?: {
    mobile: string;
    desktop: string;
  };
  onSelect(selected: number): void;
}

export function Carousel({
  images,
  height = {
    mobile: "300px",
    desktop: "500px",
  },
  onSelect,
  selected,
}: CarouselProps) {
  const { breakpoints } = useTheme();
  const idealHeight = useMediaQuery(breakpoints.up("md"))
    ? height.desktop
    : height.mobile;

  useEffect(() => {
    const interval = setInterval(
      () => onSelect(selected + 1 < images.length ? selected + 1 : 0),
      5000
    );

    return () => clearInterval(interval);
  });
  const style = {
    "--carousel-height": idealHeight,
    "--carousel-background": images[selected].background,
  } as React.CSSProperties;
  return (
    <div className={styles.Carousel} style={style}>
      {images.map((image, index) => {
        let position;
        if (index < selected) position = styles.prev;
        if (index > selected || (index === 0 && selected === images.length - 1))
          position = styles.next;

        return (
          <div
            key={`Image-${index}`}
            className={[styles.Image, position].join(" ")}
            style={{ backgroundImage: `url(${image.source})` }}
          />
        );
      })}

      <div className={styles.Pips}>
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            key={`button-${index}`}
            className={[
              styles.PipButton,
              selected === index ? styles.selected : undefined,
            ].join(" ")}
            onClick={() => onSelect(index)}
            aria-label={`Select image ${index + 1}`}
          >
            <div className={styles.Pip} />
          </button>
        ))}
      </div>
    </div>
  );
}
