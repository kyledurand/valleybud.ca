import styles from "../../../styles/Home.module.css";
import { Logo } from "components/shared/svg/logo";

const Home = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
      }}
    >
      <main className={styles.main}>
        <div className={styles.logo}>
          <Logo width={600} height={188} />
        </div>
        <h1 className={styles.title}>
          opening after carp fair, but probably before deer season
        </h1>
        <p className={styles.address}>
          433B Donald B. Munro Drive, Carp ON. |{" "}
          <a href="mailto:gday@valleybud.ca">gday@valleybud.ca</a>
        </p>
        {/* <a
          aria-label="secret"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "42px",
            height: "42px",
            background: "none",
            border: "none",
          }}
          href="/home"
        /> */}
      </main>
    </div>
  );
};

export default Home;
