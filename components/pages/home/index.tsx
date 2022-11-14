import styles from "../../../styles/Home.module.css";
import { Logo } from "components/shared/svg/logo";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo width={600} height={188} color="white" />
        </div>
        <h1 className={styles.title}>
          opening after carp fair, but probably before deer season
        </h1>
        <p className={styles.address}>
          433B Donald B. Munro Drive, Carp ON. |{" "}
          <a href="mailto:gday@valleybud.ca">gday@valleybud.ca</a>
        </p>
      </div>
    </main>
  );
};

export default Home;
