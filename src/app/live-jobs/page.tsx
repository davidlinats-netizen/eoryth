"use client";

import { useMemo, useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Short Form Video Editor",
    company: "Creator Brand",
    source: "LinkedIn",
    postedMinutes: 4,
    pay: "$50/video",
    score: 96,
    status: "New",
  },
  {
    id: 2,
    title: "TikTok & Reels Video Editor",
    company: "Ecommerce Brand",
    source: "Upwork",
    postedMinutes: 12,
    pay: "$800/month",
    score: 94,
    status: "New",
  },
  {
    id: 3,
    title: "UGC Video Editor",
    company: "Marketing Agency",
    source: "OnlineJobs",
    postedMinutes: 28,
    pay: "$75/video",
    score: 92,
    status: "Saved",
  },
  {
    id: 4,
    title: "YouTube Video Editor",
    company: "Education Creator",
    source: "LinkedIn",
    postedMinutes: 75,
    pay: "$12/hour",
    score: 89,
    status: "New",
  },
  {
    id: 5,
    title: "Social Media Video Editor",
    company: "Real Estate Agency",
    source: "Indeed",
    postedMinutes: 180,
    pay: "$600/month",
    score: 84,
    status: "Reviewed",
  },
];

export default function LiveJobsPage() {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const [freshness, setFreshness] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesSource = source === "All" || job.source === source;
      const matchesStatus = status === "All" || job.status === status;

      let matchesFreshness = true;

      if (freshness === "2h") {
        matchesFreshness = job.postedMinutes <= 120;
      }

      if (freshness === "24h") {
        matchesFreshness = job.postedMinutes <= 1440;
      }

      return (
        matchesSearch &&
        matchesSource &&
        matchesStatus &&
        matchesFreshness
      );
    });
  }, [search, source, freshness, status]);

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-neutral-200 bg-white p-6">
          <h1 className="text-2xl font-semibold">Eoryth</h1>
          <p className="mt-1 text-xs text-neutral-400">Client Radar</p>

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
              <option>All</option>
              <option>LinkedIn</option>
              <option>Upwork</option>
              <option>OnlineJobs</option>
              <option>Indeed</option>
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
              <option>All</option>
              <option>New</option>
              <option>Saved</option>
              <option>Reviewed</option>
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px_100px] border-b border-neutral-200 px-5 py-4 text-xs text-neutral-400">
              <div>Opportunity</div>
              <div>Source</div>
              <div>Posted</div>
              <div>Pay</div>
              <div>Match</div>
              <div>Status</div>
            </div>

            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_100px_100px] items-center border-b border-neutral-100 px-5 py-5 last:border-none"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {job.company}
                  </p>
                </div>

                <div className="text-sm">{job.source}</div>

                <div className="text-sm text-neutral-500">
                  {formatTime(job.postedMinutes)}
                </div>

                <div className="text-sm">{job.pay}</div>

                <div>
                  <span
                    className={`inline-flex min-w-12 justify-center rounded-lg px-3 py-2 text-sm font-semibold ${
                      job.score >= 90
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {job.score}
                  </span>
                </div>

                <div>
                  <span className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs">
                    {job.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="p-10 text-center text-sm text-neutral-400">
                No opportunities match these filters.
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-neutral-400">
            Showing {filteredJobs.length} opportunities
          </p>
        </section>
      </div>
    </main>
  );
}

function formatTime(minutes: number) {
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  return `${hours} hr${hours > 1 ? "s" : ""} ago`;
}