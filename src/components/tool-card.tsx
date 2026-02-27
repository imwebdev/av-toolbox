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
        className={`rounded-xl border p-5 sm:p-6 transition-all duration-300 h-full flex flex-col ${
          isDark
            ? 'border-[#2a2a2a] bg-[#1c1c1c] hover:border-[#3a3a3a] hover:bg-[#202020]'
            : 'border-[#d4d0cb] bg-white hover:border-[#b8b4af] hover:bg-[#f8f6f3]'
        }`}
      >
        {/* Icon + Category */}
        <div className="flex items-start justify-between mb-5">
          <Icon
            className="w-5 h-5"
            style={{ color: isDark ? '#8a8580' : '#5a5550' }}
          />
          <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-[#5a5550]' : 'text-[#8a8580]'}`}>
            {tool.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-base font-medium mb-2 ${isDark ? 'text-[#e8e4df]' : 'text-[#141414]'}`}>
          {tool.name}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-2 mb-5 flex-1 ${isDark ? 'text-[#8a8580]' : 'text-[#5a5550]'}`}>
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
