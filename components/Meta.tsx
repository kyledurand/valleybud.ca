import Head from "next/head";
import {MetaHTMLAttributes} from "react";
import {GoogleAnalytics} from '@next/third-parties/google'

const LIGHT_THEME_COLOR_PROPS = {
  name: "theme-color",
  content: "#ffffff",
  media: "(prefers-color-scheme: light)",
} as MetaHTMLAttributes<HTMLMetaElement>;

const DARK_THEME_COLOR_PROPS = {
  name: "theme-color",
  content: "#1a1a1a",
  media: "(prefers-color-scheme: dark)",
} as MetaHTMLAttributes<HTMLMetaElement>;

interface Props {
  title?: string;
}

export function Meta({title}: Props) {
  return (
    <Head>
      <title>{title || "Welcome to Valleybud.ca"}</title>
      <meta
        name="description"
        content="Cannabis retailer based in the Ottawa valley"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#b86047" />
      <meta {...LIGHT_THEME_COLOR_PROPS} />
      <meta {...DARK_THEME_COLOR_PROPS} />
      <meta name="test" />
      <GoogleAnalytics gaId="G-GNN3NEKVKF" />
    </Head>
  );
}
