import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Tool } from '@/lib/tools-data';

function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  const Icon = icons[iconName];
  return Icon || LucideIcons.Wrench;
}

export function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const Icon = getIcon(tool.icon);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-zinc-900/50 ${featured ? 'p-8 sm:p-10' : 'p-6 sm:p-8'}`}>
        {/* Gradient accent on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${tool.color}08 0%, transparent 50%)` }} />

        <div className="relative">
          {/* Icon + Category */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`${featured ? 'w-14 h-14' : 'w-12 h-12'} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              style={{ backgroundColor: `${tool.color}15` }}
            >
              <Icon className={`${featured ? 'w-7 h-7' : 'w-6 h-6'}`} style={{ color: tool.color }} />
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {tool.categoryLabel}
            </span>
          </div>

          {/* Content */}
          <h3 className={`font-bold text-zinc-900 dark:text-white mb-2 ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
            {tool.name}
          </h3>
          <p className={`text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 ${featured ? 'text-base' : 'text-sm'}`}>
            {tool.tagline}
          </p>

          {/* Features (only on featured cards) */}
          {featured && (
            <ul className="space-y-2 mb-6">
              {tool.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: tool.color }} />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: tool.color }}>
            <span>Open tool</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
