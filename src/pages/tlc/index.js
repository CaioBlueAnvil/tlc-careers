// src/pages/tlc/index.js

import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchTLCJobs } from "../../../lib/tlcJobs";
import styles from "../../styles/CareersPage.module.css";
import layoutStyles from "../../components/Layout.module.css";

export default function TLCJobs({ jobs }) {
  return (
    <Layout>
      {/* ===== 1) HERO (full‐screen cracked BG with “TLC / Careers”) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}></h1>
          <h1 className={styles.heroTitle}></h1>
        </div>
      </section>

      {/* ===== 2) TAGLINE STRIP ===== */}
      <section className={styles.taglineStrip}>
        <p className={styles.taglineText}>
        </p>
      </section>

      {/* ===== 3) JOB LIST ===== */}
      <section className={styles.jobsWrapper}>
        <div className={layoutStyles.container}>
          <Link href="/tlc" className={styles.jobsButton}>
            Our Jobs
          </Link>

          <div className={styles.jobsGrid}>
            {jobs.map((job) => (
              <Link
                href={`/tlc/${job.slug}`}
                key={job.slug}
                className={styles.jobCard}
              >
                <p className={styles.jobName}>{job["Job Name"]}</p>
                <p className={styles.jobType}>
                  {job["Employment Type"] || "Full Time"}
                </p>
                <p className={styles.jobLocation}>{job["Location"]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const jobs = await fetchTLCJobs();
  return { props: { jobs }, revalidate: 60 };
}

