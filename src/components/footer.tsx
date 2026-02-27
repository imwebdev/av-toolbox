import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { tools, categories } from '@/lib/tools-data';

export function Footer() {
  const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];

  return (
    <footer className="border-t border-[#1e1e1e]">
      <div className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '40px' }}>
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center" style={{ gap: '12px', marginBottom: '20px' }}>
              <div className="rounded-lg bg-[#e8e4df] flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
                <Wrench className="text-[#141414]" style={{ width: '16px', height: '16px' }} />
              </div>
              <span className="text-[15px] font-semibold text-[#e8e4df] tracking-tight">
                AV Toolbox
              </span>
            </Link>
            <p className="text-sm text-[#6a6560] leading-relaxed max-w-xs">
              Free production-grade calculators and utilities for AV professionals.
            </p>
          </div>

          {/* Tool categories */}
          {categoryKeys.map(key => (
            <div key={key}>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#4a4540] font-medium" style={{ marginBottom: '20px' }}>
                {categories[key].label}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tools
                  .filter(t => t.category === key)
                  .map(tool => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-[#6a6560] hover:text-[#e8e4df] transition-colors duration-200"
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
        <div className="border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center" style={{ marginTop: '3.5rem', paddingTop: '2rem', gap: '16px' }}>
          <p className="text-xs text-[#4a4540]">
            &copy; {new Date().getFullYear()} AV Toolbox
          </p>
          <div className="flex items-center" style={{ gap: '2rem' }}>
            <Link href="/blog" className="text-xs text-[#4a4540] hover:text-[#8a8580] transition-colors duration-200">
              Blog
            </Link>
            <Link href="/" className="text-xs text-[#4a4540] hover:text-[#8a8580] transition-colors duration-200">
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
