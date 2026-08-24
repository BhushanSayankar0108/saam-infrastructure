import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-700/30 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-[86px] max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center border border-orange-500 text-xs font-bold text-orange-500">
            LOGO
          </div>

          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              SAAM
            </div>

            <div className="text-xs font-medium tracking-[0.2em] text-slate-400">
              INFRASTRUCTURE
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  active
                    ? "text-orange-500"
                    : "text-slate-300 hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Quote Button */}
        <Link
          to="/contact"
          className="group hidden items-center gap-2 bg-orange-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600 lg:inline-flex"
        >
          Get a Quote

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-slate-800 py-4 text-sm font-medium ${
                    active
                      ? "text-orange-500"
                      : "text-slate-300 hover:text-orange-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-orange-500 px-5 py-3 text-sm font-bold text-white"
            >
              Get a Quote
              <ArrowUpRight size={17} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;