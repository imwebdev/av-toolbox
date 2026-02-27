import { tools, categories } from '@/lib/tools-data';
import { getAllBlogPosts } from '@/lib/blog-data';
import { ToolCard } from '@/components/tool-card';
import { NewsletterSignup } from '@/components/newsletter-signup';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

      {/* Hero — 500designs-inspired: massive type, generous whitespace */}
      <section className="section-container pt-32 sm:pt-44 lg:pt-52 pb-28 sm:pb-36 lg:pb-44">
        <p className="text-sm text-[#8a8580] mb-8 tracking-wide font-light">
          / {tools.length} free tools
        </p>

        <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extralight text-[#e8e4df] leading-[1.05] tracking-[-0.02em] max-w-5xl">
          Production-grade tools
          <br />
          <span className="text-[#8a8580]">for AV professionals.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#6a6560] leading-relaxed max-w-lg mt-10">
          Free calculators and utilities for live streaming, broadcast, and audio-visual engineering. No signup required.
        </p>
      </section>

      {/* Tool Categories */}
      {categoryKeys.map((category, idx) => {
        const catTools = tools.filter(t => t.category === category);
        const catInfo = categories[category];
        const isLight = idx % 2 === 1;
        return (
          <section
            key={category}
            className={isLight ? 'bg-[#e8e4df]' : ''}
          >
            <div className="section-container py-24 sm:py-32 lg:py-40">
              <div className="mb-14 sm:mb-16">
                <p className={`text-[11px] uppercase tracking-[0.25em] mb-4 font-medium ${isLight ? 'text-[#9a9590]' : 'text-[#5a5550]'}`}>
                  {catInfo.label}
                </p>
                <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight leading-tight ${isLight ? 'text-[#141414]' : 'text-[#e8e4df]'}`}>
                  {catInfo.description}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {catTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} variant={isLight ? 'light' : 'dark'} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Newsletter */}
      <section className="section-container py-24 sm:py-32 lg:py-40">
        <NewsletterSignup />
      </section>

      {/* Recent Articles */}
      <section className="bg-[#1a1a1a]">
        <div className="section-container py-24 sm:py-32 lg:py-40">
          <div className="flex items-end justify-between mb-14 sm:mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#5a5550] mb-4 font-medium">
                Resources
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-[#e8e4df]">
                Guides and deep-dives for AV professionals
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm text-[#8a8580] hover:text-[#e8e4df] transition-colors duration-200"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="rounded-2xl border border-[#282828] bg-[#141414] p-8 sm:p-10 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-[#444] group-hover:bg-[#171717] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] text-[#5a5550] uppercase tracking-[0.2em] font-medium">
                      {post.category}
                    </span>
                    <span className="text-[#2a2a2a]">&middot;</span>
                    <span className="text-[11px] text-[#5a5550]">
                      {post.readTime} read
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#e8e4df] mb-3 leading-snug group-hover:text-white transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6a6560] leading-relaxed flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-8 text-sm font-medium text-[#5a5550] group-hover:text-[#e8e4df] transition-all duration-200">
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#8a8580]"
            >
              View all articles
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-container py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#5a5550] mb-4 font-medium">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-[#e8e4df] mb-10">
            Why AV Toolbox?
          </h2>
          <div className="space-y-6 text-sm text-[#8a8580] leading-[1.9]">
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
