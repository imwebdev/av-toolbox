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
        className={`relative overflow-hidden rounded-2xl border h-full flex flex-col transition-all duration-500 ease-out
          group-hover:-translate-y-2 group-hover:shadow-2xl
          ${isDark
            ? 'border-[#232323] bg-[#191919] group-hover:border-[#383838] group-hover:shadow-black/40'
            : 'border-[#d4d0cb] bg-white group-hover:border-[#b0aca8] group-hover:shadow-black/8'
          }`}
      >
        {/* Color accent bar at top */}
        <div
          className="h-1 w-full transition-all duration-500 group-hover:h-1.5"
          style={{ backgroundColor: tool.color }}
        />

        <div className="p-6 sm:p-7 flex flex-col flex-1">
          {/* Icon with colored background */}
          <div
            className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${tool.color}15`,
            }}
          >
            <Icon
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: tool.color }}
              strokeWidth={1.75}
            />
          </div>

          {/* Title */}
          <h3 className={`text-[15px] font-semibold mb-2 leading-snug transition-colors duration-200 ${
            isDark
              ? 'text-[#f0ece8] group-hover:text-white'
              : 'text-[#141414]'
          }`}>
            {tool.name}
          </h3>

          {/* Description */}
          <p className={`text-[13px] leading-relaxed line-clamp-2 mb-6 flex-1 ${
            isDark ? 'text-[#7a756f]' : 'text-[#6a6560]'
          }`}>
            {tool.tagline}
          </p>

          {/* CTA */}
          <div className={`flex items-center gap-2 text-[13px] font-medium transition-all duration-300 ${
            isDark
              ? 'text-[#5a5550] group-hover:text-[#e8e4df]'
              : 'text-[#8a8580] group-hover:text-[#141414]'
          }`}>
            <span>Open tool</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
