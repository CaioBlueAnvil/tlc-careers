// src/components/Layout.js
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.pageContainer}>
     
      {/* ===== HEADER ===== */}
      <header className={styles.headerWhite}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img
              src="/tlc-logo.svg"
              alt="Trades Labour Corporation Logo"
              className={styles.logoImg}
            />
          </Link>

          <nav className={styles.nav}>
            
      
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.main}>{children}</main>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Blue Anvil. All rights reserved.</p>
          <p>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
            {" | "}
            <a href="/terms" className={styles.footerLink}>
              Terms of Use
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

