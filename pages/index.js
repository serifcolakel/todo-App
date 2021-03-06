import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TODO APP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.hizliresim.com/a27dhrh.jpg" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>TODO APP</h1>
          <div className={styles.route}>
            {" "}
            <Link href="/login">
              <a className={styles.link}>Login</a>
            </Link>
            <Link href="/register">
              <a className={styles.link}>Register</a>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <h1>Task -manager for small teams.</h1>
            <p>
              This page is a simple to-do list for small companies or teams.
            </p>
          </div>
          <img src="https://i.hizliresim.com/68ha2bp.png" alt="content-image" />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerLink}>
          <Link href="https://github.com/serifcolakel/">
            <a target="_blank">
              <FaGithub className={styles.icon} />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/serifcolakel/">
            <a target="_blank">
              <FaLinkedinIn className={styles.icon} />
            </a>
          </Link>
        </div>
        <p>Allright Reserved </p>
      </footer>
    </div>
  );
}
