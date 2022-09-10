import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Grid } from "../components";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cellx — Just not Excel</title>
        <meta
          name="description"
          content="Cells app, like excel, just not excel"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
