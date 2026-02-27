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
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div
        className={`rounded-2xl border p-7 sm:p-8 transition-all duration-300 h-full flex flex-col ${
          isDark
            ? 'border-[#282828] bg-[#1a1a1a] hover:border-[#383838] hover:bg-[#1e1e1e]'
            : 'border-[#d4d0cb] bg-white hover:border-[#b8b4af] hover:shadow-sm'
        }`}
      >
        {/* Icon */}
        <div className="mb-6">
          <Icon
            className="w-5 h-5"
            style={{ color: isDark ? '#6a6560' : '#5a5550' }}
            strokeWidth={1.5}
          />
        </div>

        {/* Category */}
        <span className={`text-[11px] tracking-[0.2em] uppercase font-medium mb-3 block ${isDark ? 'text-[#4a4540]' : 'text-[#9a9590]'}`}>
          {tool.categoryLabel}
        </span>

        {/* Title */}
        <h3 className={`text-[15px] font-medium mb-3 leading-snug ${isDark ? 'text-[#e8e4df]' : 'text-[#141414]'}`}>
          {tool.name}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 mb-6 flex-1 ${isDark ? 'text-[#6a6560]' : 'text-[#6a6560]'}`}>
          {tool.tagline}
        </p>

        {/* CTA */}
        <div className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
          isDark
            ? 'text-[#5a5550] group-hover:text-[#e8e4df]'
            : 'text-[#8a8580] group-hover:text-[#141414]'
        }`}>
          <span>Open tool</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
