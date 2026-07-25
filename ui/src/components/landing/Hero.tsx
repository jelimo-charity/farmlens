import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
        alt="Farm"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">

        <div className="max-w-3xl">

          <span className="inline-flex rounded-md bg-green-600/20 px-5 py-1 text-sm font-medium text-green-200 backdrop-blur">
            Climate Intelligence for Agriculture
          </span>
          


          <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-200">
            Report climate impacts from your farm, visualize trends
            across Kenya, and empower organizations with reliable,
            real-time agricultural insights.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/report"
              className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-700"
            >
              Report Climate Event
            </Link>

            <Link
              to="/dashboard"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Dashboard
            </Link>

          </div>

        </div>

      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-8 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-6">

        {/* <div className="grid grid-cols-2 gap-5 rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-green-700">47</h2>
            <p className="text-gray-600">Counties Covered</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-700">2,540</h2>
            <p className="text-gray-600">Reports Submitted</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-700">18,200</h2>
            <p className="text-gray-600">Acres Affected</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-700">95%</h2>
            <p className="text-gray-600">Verified Reports</p>
          </div>

        </div> */}

      </div>

      {/* Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 160"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,96L120,106.7C240,117,480,139,720,133.3C960,128,1200,96,1320,80L1440,64L1440,160L1320,160C1200,160,960,160,720,160C480,160,240,160,120,160L0,160Z"
          />
        </svg>
      </div>

    </section>
  );
}