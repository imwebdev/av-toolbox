'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Tools' },
  { href: '/blog', label: 'Resources' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#141414]/90 backdrop-blur-xl border-b border-[#2a2a2a]">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e8e4df] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-[#141414]" />
            </div>
            <span className="text-[15px] font-semibold text-[#e8e4df] tracking-tight">
              AV Toolbox
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-[#e8e4df]'
                      : 'text-[#8a8580] hover:text-[#e8e4df]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#8a8580] hover:text-[#e8e4df] hover:bg-[#1c1c1c] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-[#2a2a2a] mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#e8e4df] bg-[#1c1c1c]'
                        : 'text-[#8a8580] hover:text-[#e8e4df] hover:bg-[#1c1c1c]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
