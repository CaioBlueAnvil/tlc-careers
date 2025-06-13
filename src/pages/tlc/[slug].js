// src/pages/tlc/[slug].js

import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchTLCJobs } from "../../../lib/tlcJobs";
import styles from "../../styles/CareersPage.module.css";


export default function JobDetail({ job }) {
  return (
    <Layout>
      {/* Outer full‐page background */}
      <section className={styles.detailPage}>
        {/* Centering container */}
        <div className={styles.detailContainer}>
 {/* ─── Breadcrumbs ─────────────────────────────────────────── */}
           <nav className={styles.breadcrumbs}>
	   <Link href="/tlc">Careers</Link>
	   <span>/</span>
	   <span>{job["Job Name"]}</span>
	 </nav>
          {/* White card */}
          <div className={styles.detailCard}>
            <h1 style={{ color: "#164791", fontSize: "2rem" }}>
              {job["Job Name"]}
            </h1>
            <p>
              <strong>Type:</strong> {job["Employment Type"]}
            </p>
            <p>
              <strong>Location:</strong> {job["Location"]}
            </p>
            <div style={{ margin: "1.5rem 0", textAlign: "left" }}>
              {job["Description"]
                .split("\n\n")
                .map((para, i) => (
                  <p key={i} style={{ marginBottom: "1rem" }}>
                    {para}
                  </p>
                ))}
            </div>
            <a
              href={job["Form URL"]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#0070f3",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                textDecoration: "none",
              }}
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

  return { paths, fallback: 'blocking', };
}

export async function getStaticProps({ params }) {
  const jobs = await fetchTLCJobs();
  const job = jobs.find((j) => j.slug === params.slug);

  if (!job) {
    return { notFound: true };
  }

  return { props: { job }, revalidate: 60 };
}
