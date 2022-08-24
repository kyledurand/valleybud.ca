import Head from "next/head";
import type {NextPage} from "next";
import styles from "../styles/Home.module.css";
import {Logo} from "../components/logo";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to Valleybud.ca</title>
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
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <h1 className={styles.title}>
          opening after carp fair, but probably before deer season
        </h1>
      </main>
    </>
  );
};

export default Home;
