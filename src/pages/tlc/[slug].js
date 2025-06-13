// src/pages/tlc/[slug].js

import Layout from "../../components/Layout";
import { fetchTLCJobs } from "../../../lib/tlcJobs";
import styles from "../../styles/CareersPage.module.css";

export default function JobDetail({ job }) {
  return (
    <Layout>
      <div className={styles.container} style={{ padding: "2rem 0" }}>
        <h1 style={{ fontSize: "2rem", color: "#164791" }}>
          {job["Job Name"]}
        </h1>
        <p style={{ margin: "0.5rem 0", fontWeight: "500" }}>
          <strong>Type:</strong> {job["Employment Type"]}
        </p>
        <p style={{ margin: "0.5rem 0", fontWeight: "500" }}>
          <strong>Location:</strong> {job["Location"]}
        </p>
        <p style={{ margin: "1rem 0" }}>{job["Description"]}</p>

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
            marginTop: "1rem",
          }}
        >
          Apply Now
        </a>
      </div>
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
