import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section id="/" className="relative flex min-h-screen items-center overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1800&auto=format&fit=crop"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-green-900/80" />
<div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">

  <h2 className="text-5xl font-bold leading-tight md:text-7xl">
   Better Climate Data. Stronger Farming Communities.
  </h2>

  <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-green-100 md:text-xl">
    Report climate-related crop impacts, visualize trends across regions, and support faster, data-driven decisions for farmers, organizations, and policymakers.
  </p>

  <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

    <Link
      to="/report"
      className="rounded-xl bg-white px-8 py-4 font-semibold text-green-700 transition hover:scale-105 hover:bg-green-100"
    >
      Submit Report
    </Link>

    <Link
      to="/dashboard"
      className="rounded-xl border border-white px-8 py-4 transition hover:bg-white hover:text-green-700"
    >
      Explore Dashboard
    </Link>

  </div>

</div>
    </section>
  );
}