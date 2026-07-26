import { Link } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/90 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-green-600
              text-white
              font-bold
            "
          >
            🌿
          </div>

          <span className="text-xl font-bold text-green-700 sm:text-2xl">
            FarmLens
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="/"
            className="text-gray-700 transition hover:text-green-700"
          >
            Home
          </a>

          <a
            href="#why-farmlens"
            className="text-gray-700 transition hover:text-green-700"
          >
            About
          </a>

          <a
            href="#how-it-works"
            className="text-gray-700 transition hover:text-green-700"
          >
            How it Works
          </a>

          <a
            href="#features"
            className="text-gray-700 transition hover:text-green-700"
          >
            Features
          </a>

        </nav>



        <div className="flex items-center gap-3">

          {/* Desktop button */}
          <Link
            to="/dashboard"
            className="
              hidden
              rounded-lg
              bg-green-700
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-green-800
              md:block
            "
          >
            Get Started
          </Link>


          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X
                size={28}
                className="text-green-700"
              />
            ) : (
              <List
                size={28}
                className="text-green-700"
              />
            )}
          </button>

        </div>

      </div>



      {/* Mobile Navigation */}
      {open && (
        <nav
          className="
            flex
            flex-col
            gap-4
            border-t
            bg-white
            px-5
            py-6
            md:hidden
          "
        >

          <a
            href="/"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-700"
          >
            Home
          </a>


          <a
            href="#why-farmlens"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-700"
          >
            About
          </a>


          <a
            href="#how-it-works"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-700"
          >
            How it Works
          </a>


          <a
            href="#features"
            onClick={closeMenu}
            className="text-gray-700 hover:text-green-700"
          >
            Features
          </a>


          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="
              mt-2
              rounded-lg
              bg-green-700
              px-4
              py-3
              text-center
              font-medium
              text-white
              hover:bg-green-800
            "
          >
            Get Started
          </Link>

        </nav>
      )}

    </header>
  );
}