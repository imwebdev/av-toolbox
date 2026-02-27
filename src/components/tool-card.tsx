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

export function ToolCard({ tool, variant = 'dark' }: { tool: Tool; variant?: 'dark' | 'light' }) {
  const Icon = getIcon(tool.icon);
  const isDark = variant === 'dark';

  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <div
        className={`rounded-2xl border p-8 sm:p-10 transition-all duration-300 ease-out h-full flex flex-col
          group-hover:-translate-y-1.5 group-hover:shadow-2xl
          ${isDark
            ? 'border-[#282828] bg-[#1a1a1a] group-hover:border-[#444] group-hover:bg-[#1e1e1e] group-hover:shadow-black/30'
            : 'border-[#d4d0cb] bg-white group-hover:border-[#a8a4a0] group-hover:shadow-black/5'
          }`}
      >
        {/* Icon */}
        <div className={`mb-7 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
          isDark
            ? 'bg-[#222] group-hover:bg-[#2a2a2a]'
            : 'bg-[#f0ece8] group-hover:bg-[#e8e4df]'
        }`}>
          <Icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isDark ? '#8a8580' : '#5a5550' }}
            strokeWidth={1.5}
          />
        </div>

        {/* Category */}
        <span className={`text-[11px] tracking-[0.2em] uppercase font-medium mb-4 block ${isDark ? 'text-[#4a4540]' : 'text-[#9a9590]'}`}>
          {tool.categoryLabel}
        </span>

        {/* Title */}
        <h3 className={`text-base font-medium mb-3 leading-snug transition-colors duration-200 ${
          isDark
            ? 'text-[#e8e4df] group-hover:text-white'
            : 'text-[#141414]'
        }`}>
          {tool.name}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 mb-8 flex-1 ${isDark ? 'text-[#6a6560]' : 'text-[#6a6560]'}`}>
          {tool.tagline}
        </p>

        {/* CTA */}
        <div className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
          isDark
            ? 'text-[#5a5550] group-hover:text-[#e8e4df]'
            : 'text-[#8a8580] group-hover:text-[#141414]'
        }`}>
          <span>Open tool</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
