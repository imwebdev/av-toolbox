import { tools, categories } from '@/lib/tools-data';
import { getAllBlogPosts } from '@/lib/blog-data';
import { ToolCard } from '@/components/tool-card';
import { NewsletterSignup } from '@/components/newsletter-signup';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Home() {
  const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];
  const recentPosts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AV Toolbox',
            url: 'https://avtoolbox.aibuildmastery.com',
            description: 'Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://avtoolbox.aibuildmastery.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#141414] to-[#141414]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-500/[0.03] via-purple-500/[0.02] to-transparent rounded-full blur-3xl" />

        <div className="relative section-container" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div className="flex items-center" style={{ gap: '8px', marginBottom: '2rem' }}>
            <div className="h-px bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '32px' }} />
            <span className="text-xs text-[#8a8580] tracking-widest uppercase font-medium">
              {tools.length} free tools
            </span>
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-bold text-[#f0ece8] leading-[1.08] tracking-[-0.03em] max-w-4xl">
            Production-grade tools
            <br />
            <span className="bg-gradient-to-r from-[#8a8580] to-[#6a6560] bg-clip-text text-transparent">
              for AV professionals.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#7a756f] leading-relaxed max-w-lg" style={{ marginTop: '2rem' }}>
            Free calculators and utilities for live streaming, broadcast, and audio-visual engineering. No signup required.
          </p>

          {/* Quick stats */}
          <div className="flex items-center" style={{ gap: '2rem', marginTop: '3rem' }}>
            <div className="flex items-center" style={{ gap: '10px' }}>
              <Zap className="text-amber-500" style={{ width: '16px', height: '16px' }} />
              <span className="text-sm text-[#8a8580]">Instant results</span>
            </div>
            <div className="flex items-center" style={{ gap: '10px' }}>
              <Shield className="text-emerald-500" style={{ width: '16px', height: '16px' }} />
              <span className="text-sm text-[#8a8580]">No data collected</span>
            </div>
            <div className="hidden sm:flex items-center" style={{ gap: '10px' }}>
              <Globe className="text-blue-500" style={{ width: '16px', height: '16px' }} />
              <span className="text-sm text-[#8a8580]">Works offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      {categoryKeys.map((category, idx) => {
        const catTools = tools.filter(t => t.category === category);
        const catInfo = categories[category];
        const isLight = idx % 2 === 1;

        return (
          <section
            key={category}
            className={isLight ? 'bg-[#f0ece8]' : ''}
          >
            <div className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
              <div className="flex items-end justify-between" style={{ marginBottom: '3rem' }}>
                <div>
                  <div className="flex items-center" style={{ gap: '10px', marginBottom: '12px' }}>
                    <div
                      className="rounded-full"
                      style={{
                        backgroundColor: catTools[0]?.color || '#8a8580',
                        width: '6px',
                        height: '6px',
                      }}
                    />
                    <p className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                      isLight ? 'text-[#9a9590]' : 'text-[#5a5550]'
                    }`}>
                      {catInfo.label}
                    </p>
                  </div>
                  <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight ${
                    isLight ? 'text-[#1a1a1a]' : 'text-[#f0ece8]'
                  }`}>
                    {catInfo.description}
                  </h2>
                </div>
                <span className={`hidden sm:block text-sm tabular-nums ${
                  isLight ? 'text-[#b0aca8]' : 'text-[#3a3a3a]'
                }`}>
                  {catTools.length} tool{catTools.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
                {catTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} variant={isLight ? 'light' : 'dark'} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Newsletter */}
      <section className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <NewsletterSignup />
      </section>

      {/* Recent Articles */}
      <section className="bg-[#191919]">
        <div className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="flex items-end justify-between" style={{ marginBottom: '3rem' }}>
            <div>
              <div className="flex items-center" style={{ gap: '10px', marginBottom: '12px' }}>
                <div className="rounded-full bg-emerald-500" style={{ width: '6px', height: '6px' }} />
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#5a5550] font-semibold">
                  Resources
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#f0ece8]">
                Guides and deep-dives for AV professionals
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center text-sm text-[#5a5550] hover:text-[#e8e4df] transition-colors duration-200"
              style={{ gap: '8px' }}
            >
              View all
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
            {recentPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="relative overflow-hidden rounded-2xl border border-[#232323] bg-[#141414] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/40 group-hover:border-[#383838] h-full flex flex-col">
                  {/* Color accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:h-1.5" />

                  <div className="flex flex-col flex-1" style={{ padding: '24px 24px 22px' }}>
                    <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                      <span className="text-[11px] text-[#5a5550] uppercase tracking-[0.15em] font-semibold">
                        {post.category}
                      </span>
                      <span className="text-[#2a2a2a]">&middot;</span>
                      <span className="text-[11px] text-[#4a4540]">
                        {post.readTime} read
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-[#f0ece8] leading-snug group-hover:text-white transition-colors duration-200"
                      style={{ fontSize: '15px', marginBottom: '8px' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-[#7a756f] leading-relaxed flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center text-[13px] font-medium text-[#5a5550] group-hover:text-[#e8e4df] transition-all duration-300"
                      style={{ marginTop: '24px', gap: '6px' }}
                    >
                      <span>Read more</span>
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ width: '14px', height: '14px' }} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="sm:hidden text-center" style={{ marginTop: '2rem' }}>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-[#8a8580]"
              style={{ gap: '8px' }}
            >
              View all articles
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="max-w-2xl">
          <div className="flex items-center" style={{ gap: '10px', marginBottom: '12px' }}>
            <div className="rounded-full bg-[#5a5550]" style={{ width: '6px', height: '6px' }} />
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#5a5550] font-semibold">
              About
            </p>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#f0ece8]" style={{ marginBottom: '2rem' }}>
            Why AV Toolbox?
          </h2>
          <div className="text-sm text-[#8a8580] leading-[1.85]" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              AV Toolbox provides free, production-grade calculators and utilities built specifically for live streaming, broadcast, and audio-visual professionals. Every tool is designed to solve real problems that engineers face daily.
            </p>
            <p>
              Unlike generic online calculators, our tools are built with industry knowledge. The Bitrate Calculator accounts for actual codec efficiency differences. The Stream Delay Calculator models real-world pipeline stages. The Cable Length Estimator uses manufacturer specifications for accurate distance ratings.
            </p>
            <p>
              All tools run entirely in your browser with no data collection, no signup requirements, and no usage limits.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
