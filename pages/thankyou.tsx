import styles from "../styles/Home.module.css";
import {Logo} from "components/shared/svg/logo";
import {Meta} from "components/Meta";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--brand-accent-orange)",
      }}
    >
      <Meta title="Thank you for your order! | Valleybud.ca" />
      <main className={styles.main}>
        <div className={styles.logo}>
          <Logo width={600} height={188} color="white" />
        </div>

        <p className={styles.address}>Thank you for your order</p>
      </main>
    </div>
  );
}
