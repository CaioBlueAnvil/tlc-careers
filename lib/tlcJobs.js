// lib/tlcJobs.js

export async function fetchTLCJobs() {
  // 1) Get the TLC sheet ID from env
  const tlcSheetId = process.env.TLC_SHEET_ID;
  if (!tlcSheetId) {
    throw new Error("Missing TLC_SHEET_ID in environment");
  }

  // 2) Build the Sheets API URL
  const range = "Sheet1"; // Change if your tab name differs
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${tlcSheetId}/values/${range}?key=${process.env.GOOGLE_API_KEY}`;

  // 3) Fetch the data
  const response = await fetch(url);
  if (!response.ok) {
    // Show the actual error for debugging
    const errText = await response.text();
    throw new Error(
      `Sheets API error (${response.status}): ${errText}`
    );
  }
  const json = await response.json();

  // 4) Parse headers and rows
  const [headers, ...rows] = json.values || [];
  if (!headers) {
    // No data at all
    return [];
  }

  // 5) Map each row to an object and generate a slug
  const jobs = rows.map((row) => {
    const job = Object.fromEntries(
      headers.map((h, i) => [h, row[i] || ""])
    );
    job.slug = job["Job Name"]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return job;
  });

  // 6) Return the array of jobs
  return jobs;
}

