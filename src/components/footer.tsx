import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { tools, categories } from '@/lib/tools-data';

export function Footer() {
  const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];

  return (
    <footer className="border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#e8e4df] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-[#141414]" />
              </div>
              <span className="text-[15px] font-semibold text-[#e8e4df] tracking-tight">
                AV Toolbox
              </span>
            </Link>
            <p className="text-sm text-[#8a8580] leading-relaxed max-w-xs">
              Free production-grade calculators and utilities for AV professionals.
            </p>
          </div>

          {/* Tool categories */}
          {categoryKeys.map(key => (
            <div key={key}>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#5a5550] mb-4">
                {categories[key].label}
              </h3>
              <ul className="space-y-2.5">
                {tools
                  .filter(t => t.category === key)
                  .map(tool => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-[#8a8580] hover:text-[#e8e4df] transition-colors duration-200"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#5a5550]">
            &copy; {new Date().getFullYear()} AV Toolbox
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs text-[#5a5550] hover:text-[#8a8580] transition-colors duration-200">
              Blog
            </Link>
            <Link href="/" className="text-xs text-[#5a5550] hover:text-[#8a8580] transition-colors duration-200">
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
