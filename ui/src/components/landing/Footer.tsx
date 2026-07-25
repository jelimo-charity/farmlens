import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">

        <div>
          <h3 className="text-2xl font-bold">
            🌱 FarmLens
          </h3>

          <p className="mt-4 text-green-100">
            Helping farmers report climate impacts and enabling
            data-driven agricultural decisions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Platform</h4>

          <ul className="mt-4 space-y-2">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/report">Report</Link>
            </li>

          </ul>
        </div>

        <div>
          <h4 className="font-semibold">
            Resources
          </h4>

          <ul className="mt-4 space-y-2">
            <li>API</li>
            <li>Documentation</li>
            <li>GitHub</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">
            Contact
          </h4>

          <p className="mt-4">
            hello@farmlens.africa
          </p>
        </div>

      </div>

      <div className="border-t border-green-800 py-6 text-center text-sm text-green-200">
        © {new Date().getFullYear()} FarmLens. All rights reserved.
      </div>

    </footer>
  );
}