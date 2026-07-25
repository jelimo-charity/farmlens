import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">
            🌿
          </div>

          <span className="text-2xl font-bold text-green-700">
            FarmLens
          </span>
        </Link>

        <nav className="hidden gap-10 md:flex">
          <a href="/">Home</a>
          <a href="#why-farmlens">About</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#features">Features</a>
        </nav>

        <Link
          to="/dashboard"
          className="rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          Get started
        </Link>

      </div>
    </header>
  );
}