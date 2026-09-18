"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: number;
  created_at: string;
  title: string | null;
  company: string | null;
  source: string | null;
  job_url: string | null;
  posted_at: string | null;
  pay_text: string | null;
  score: number | null;
  status: string | null;
  match_reason: string | null;
  source_job_id: string | null;
  dedupe_key: string | null;
};

export default function LiveJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const [freshness, setFreshness] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("posted_at", { ascending: false });

      if (error) {
        console.error(error);
        setError(error.message);
        setJobs([]);
      } else {
        setJobs(data ?? []);
      }

      setLoading(false);
    }

    loadJobs();
  }, []);

  const sources = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.source)
          .filter((value): value is string => Boolean(value))
      )
    );
  }, [jobs]);

  const statuses = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.status)
          .filter((value): value is string => Boolean(value))
      )
    );
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (job.title ?? "").toLowerCase().includes(searchText) ||
        (job.company ?? "").toLowerCase().includes(searchText);

      const matchesSource =
        source === "All" || job.source === source;

      const matchesStatus =
        status === "All" || job.status === status;

      let matchesFreshness = true;

      if (freshness !== "All") {
        if (!job.posted_at) {
          matchesFreshness = false;
        } else {
          const postedTime = new Date(job.posted_at).getTime();
          const now = Date.now();
          const ageInHours =
            (now - postedTime) / (1000 * 60 * 60);

          if (freshness === "2h") {
            matchesFreshness = ageInHours <= 2;
          }

          if (freshness === "24h") {
            matchesFreshness = ageInHours <= 24;
          }
        }
      }

      return (
        matchesSearch &&
        matchesSource &&
        matchesStatus &&
        matchesFreshness
      );
    });
  }, [jobs, search, source, freshness, status]);

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-neutral-200 bg-white p-6">
          <h1 className="text-2xl font-semibold">Eoryth</h1>
          <p className="mt-1 text-xs text-neutral-400">
            Client Radar
          </p>

          <nav className="mt-10 space-y-2 text-sm">
            <a
              href="/"
              className="block rounded-lg px-4 py-3 text-neutral-500 hover:bg-neutral-100"
            >
              Dashboard
            </a>

            <a
              href="/live-jobs"
              className="block rounded-lg bg-black px-4 py-3 text-white"
            >
              Live Jobs
            </a>

            <div className="px-4 py-3 text-neutral-500">
              Recommended
            </div>

            <div className="px-4 py-3 text-neutral-500">
              Saved
            </div>

            <div className="px-4 py-3 text-neutral-500">
              Applied
            </div>

            <div className="px-4 py-3 text-neutral-500">
              Analytics
            </div>
          </nav>
        </aside>

        <section className="flex-1 p-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500">
                Opportunity monitoring
              </p>

              <h2 className="mt-1 text-3xl font-semibold">
                Live Jobs
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Newly detected opportunities from connected sources.
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
              Radar active
            </div>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none"
            >
              <option value="All">All sources</option>

              {sources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={freshness}
              onChange={(e) => setFreshness(e.target.value)}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none"
            >
              <option value="All">Any time</option>
              <option value="2h">Posted within 2 hours</option>
              <option value="24h">Posted within 24 hours</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none"
            >
              <option value="All">All statuses</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {capitalize(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px_100px_100px] border-b border-neutral-200 px-5 py-4 text-xs text-neutral-400">
              <div>Opportunity</div>
              <div>Source</div>
              <div>Posted</div>
              <div>Pay</div>
              <div>Match</div>
              <div>Status</div>
              <div></div>
            </div>

            {loading && (
              <div className="p-10 text-center text-sm text-neutral-400">
                Loading opportunities...
              </div>
            )}

            {!loading && error && (
              <div className="p-10 text-center">
                <p className="text-sm font-medium text-red-600">
                  Could not load jobs
                </p>

                <p className="mt-2 text-xs text-neutral-500">
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_100px_100px_100px] items-center border-b border-neutral-100 px-5 py-5 last:border-none"
                >
                  <div>
                    <p className="font-medium">
                      {job.title || "Untitled opportunity"}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {job.company || "Unknown company"}
                    </p>

                    {job.match_reason && (
                      <p className="mt-2 max-w-xl text-xs text-neutral-500">
                        {job.match_reason}
                      </p>
                    )}
                  </div>

                  <div className="text-sm">
                    {job.source || "Unknown"}
                  </div>

                  <div className="text-sm text-neutral-500">
                    {formatTime(job.posted_at)}
                  </div>

                  <div className="text-sm">
                    {job.pay_text || "Not listed"}
                  </div>

                  <div>
                    <span
                      className={`inline-flex min-w-12 justify-center rounded-lg px-3 py-2 text-sm font-semibold ${
                        (job.score ?? 0) >= 90
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {job.score ?? "N/A"}
                    </span>
                  </div>

                  <div>
                    <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs">
                      {capitalize(job.status || "new")}
                    </span>
                  </div>

                  <div>
                    {job.job_url ? (
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium hover:bg-neutral-100"
                      >
                        Open
                      </a>
                    ) : (
                      <span className="text-xs text-neutral-300">
                        No link
                      </span>
                    )}
                  </div>
                </div>
              ))}

            {!loading &&
              !error &&
              filteredJobs.length === 0 && (
                <div className="p-10 text-center text-sm text-neutral-400">
                  No opportunities match these filters.
                </div>
              )}
          </div>

          {!loading && !error && (
            <p className="mt-4 text-xs text-neutral-400">
              Showing {filteredJobs.length} of {jobs.length} opportunities
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function formatTime(date: string | null) {
  if (!date) {
    return "Unknown";
  }

  const posted = new Date(date).getTime();
  const now = Date.now();

  const minutes = Math.max(
    0,
    Math.floor((now - posted) / (1000 * 60))
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}