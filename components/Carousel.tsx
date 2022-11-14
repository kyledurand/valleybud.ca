import React, { useEffect } from "react";
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
  height?: number;
  onSelect(selected: number): void;
}

export function Carousel({
  images,
  height = 260,
  onSelect,
  selected,
}: CarouselProps) {
  useEffect(() => {
    const interval = setInterval(
      () => onSelect(selected + 1 < images.length ? selected + 1 : 0),
      5000
    );

    return () => clearInterval(interval);
  });
  const style = {
    minHeight: height,
    "--carousel-image-background": images[selected].background,
  } as React.CSSProperties;
  return (
    <div className={styles.Carousel} style={style}>
      <div className={styles.Images}>
        {images.map((image, index) => {
          let position;
          if (index < selected) position = styles.prev;
          if (
            index > selected ||
            (index === 0 && selected === images.length - 1)
          )
            position = styles.next;

          return (
            <div className={[styles.Image, position].join(" ")}>
              <Image src={image.source} width={1480} height={492} />
            </div>
          );
        })}
      </div>

      <div className={styles.Pips}>
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            className={[
              styles.Pip,
              selected === index ? styles.selected : undefined,
            ].join(" ")}
            onClick={() => onSelect(index)}
            aria-label={`Select image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
