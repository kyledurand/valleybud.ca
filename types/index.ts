export type Space = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
export type Weight = "1" | "2" | "3";
export type Size = "1" | "2" | "3" | "4";

export interface Category {
  title?: string;
  priority?: number;
  imageAlt?: string;
  link?: string;
  imageUrl?: string;
}

export interface Banner {
  background: string;
  color: string;
  content: any;
}
