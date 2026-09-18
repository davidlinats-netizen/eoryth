const jobs = [
  {
    title: "Short Form Video Editor",
    company: "Creator Brand",
    source: "LinkedIn",
    posted: "4 min ago",
    pay: "$50/video",
    score: 96,
  },
  {
    title: "TikTok & Reels Video Editor",
    company: "Ecommerce Brand",
    source: "Upwork",
    posted: "12 min ago",
    pay: "$800/month",
    score: 94,
  },
  {
    title: "UGC Video Editor",
    company: "Marketing Agency",
    source: "Remote",
    posted: "28 min ago",
    pay: "$75/video",
    score: 92,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <div className="flex min-h-screen">

        <aside className="w-64 border-r border-neutral-200 bg-white p-6">
          <h1 className="text-2xl font-semibold">Eoryth</h1>
          <p className="mt-1 text-xs text-neutral-400">Client Radar</p>

          <nav className="mt-10 space-y-2 text-sm">
            <div className="rounded-lg bg-black px-4 py-3 text-white">
              Dashboard
            </div>

            <div className="px-4 py-3 text-neutral-500">
              Live Jobs
            </div>

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

          <div>
            <p className="text-sm text-neutral-500">
              Client opportunity radar
            </p>

            <h2 className="mt-1 text-3xl font-semibold">
              Dashboard
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              Eoryth is monitoring opportunities that match your profile.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">

            <Stat title="New opportunities" value="24" />

            <Stat title="90+ matches" value="3" />

            <Stat title="Applications" value="7" />

          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white">

            <div className="border-b border-neutral-200 p-5">
              <h3 className="font-medium">
                Priority Opportunities
              </h3>

              <p className="mt-1 text-xs text-neutral-400">
                Jobs with a match score of 90+
              </p>
            </div>

            {jobs.map((job) => (
              <div
                key={job.title}
                className="flex items-center justify-between border-b border-neutral-100 p-5 last:border-none"
              >

                <div>
                  <p className="font-medium">{job.title}</p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {job.company} · {job.source} · {job.posted}
                  </p>
                </div>

                <div className="flex items-center gap-6">

                  <div className="text-right">
                    <p className="font-medium">{job.pay}</p>
                    <p className="text-xs text-neutral-400">
                      Compensation
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
                    {job.score}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}