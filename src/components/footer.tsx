import Link from 'next/link';
import { Wrench, Github, Twitter, Youtube } from 'lucide-react';
import { tools, categories } from '@/lib/tools-data';

export function Footer() {
  const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                AV Toolbox
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 max-w-xs">
              Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/imwebdev/av-toolbox" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tool categories */}
          {categoryKeys.map(key => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
                {categories[key].label}
              </h3>
              <ul className="space-y-2.5">
                {tools
                  .filter(t => t.category === key)
                  .map(tool => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} AV Toolbox. Free tools for AV professionals.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              Blog
            </Link>
            <Link href="/" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              All Tools
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
