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
          group-hover:-translate-y-1.5 group-hover:shadow-2xl
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

        <div className="flex flex-col flex-1" style={{ padding: '24px 24px 22px' }}>
          {/* Icon with colored background */}
          <div
            className="rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${tool.color}12`,
              width: '44px',
              height: '44px',
              marginBottom: '20px',
            }}
          >
            <Icon
              style={{ color: tool.color, width: '20px', height: '20px' }}
              strokeWidth={1.75}
            />
          </div>

          {/* Title */}
          <h3
            className={`font-semibold leading-snug transition-colors duration-200 ${
              isDark
                ? 'text-[#f0ece8] group-hover:text-white'
                : 'text-[#141414]'
            }`}
            style={{ fontSize: '15px', marginBottom: '8px' }}
          >
            {tool.name}
          </h3>

          {/* Description */}
          <p
            className={`leading-relaxed line-clamp-2 flex-1 ${
              isDark ? 'text-[#7a756f]' : 'text-[#6a6560]'
            }`}
            style={{ fontSize: '13px', marginBottom: '24px' }}
          >
            {tool.tagline}
          </p>

          {/* CTA */}
          <div
            className={`flex items-center font-medium transition-all duration-300 ${
              isDark
                ? 'text-[#5a5550] group-hover:text-[#e8e4df]'
                : 'text-[#8a8580] group-hover:text-[#141414]'
            }`}
            style={{ fontSize: '13px', gap: '6px' }}
          >
            <span>Open tool</span>
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ width: '14px', height: '14px' }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
