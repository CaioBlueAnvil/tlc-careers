// src/pages/tlc/[slug].js

import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchTLCJobs } from "../../../lib/tlcJobs";
import styles from "../../styles/CareersPage.module.css";


export default function JobDetail({ job }) {
  return (
    <Layout>
      <section className={styles.detailPage}>
        <div className={styles.detailContainer}>
          <nav className={styles.breadcrumbs}>
            <Link href="/tlc">Careers</Link>
            <span>/</span>
            <span>{job["Job Name"]}</span>
          </nav>
          <div className={styles.detailCard}>
            <h1 className={styles.detailTitle}>{job["Job Name"]}</h1>
            <p className={styles.detailMeta}>
              <strong>Type:</strong> {job["Employment Type"] || "Flexible"}
            </p>
            <p className={styles.detailMeta}>
              <strong>Location:</strong> {job["Location"]}
            </p>
            <div className={styles.detailDescription}>
              {job["Description"]
                .split("\n\n")
                .map((para, i) => (
                  <p key={i} className={styles.detailParagraph}>
                    {para}
                  </p>
                ))}
            </div>
            <a
              href={job["Form URL"]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyNow}
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const jobs = await fetchTLCJobs();
  const paths = jobs.map((job) => ({
    params: { slug: job.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const jobs = await fetchTLCJobs();
  const job = jobs.find((j) => j.slug === params.slug);

  if (!job) {
    return { notFound: true };
  }

  return { props: { job }, revalidate: 60 };
}
