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

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 sm:pt-36 pb-24 sm:pb-32">
        <p className="text-sm text-[#8a8580] mb-6 tracking-wide">
          / {tools.length} free tools
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-[#e8e4df] leading-[1.1] tracking-tight max-w-4xl mb-8">
          Production-grade tools for AV professionals.
        </h1>

        <p className="text-base sm:text-lg text-[#8a8580] leading-relaxed max-w-xl">
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
            className={`${isLight ? 'bg-[#e8e4df]' : ''}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 sm:py-28">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${isLight ? 'text-[#8a8580]' : 'text-[#5a5550]'}`}>
                    {catInfo.label}
                  </p>
                  <h2 className={`text-2xl sm:text-3xl font-light tracking-tight ${isLight ? 'text-[#141414]' : 'text-[#e8e4df]'}`}>
                    {catInfo.description}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {catTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} variant={isLight ? 'light' : 'dark'} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 sm:py-28">
        <NewsletterSignup />
      </section>

      {/* Recent Articles */}
      <section className="bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5a5550] mb-3">
                Resources
              </p>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#e8e4df]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {recentPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-6 sm:p-7 transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#181818] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-[#5a5550] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[#2a2a2a]">&middot;</span>
                    <span className="text-xs text-[#5a5550]">
                      {post.readTime} read
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#e8e4df] mb-3 group-hover:text-white transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#8a8580] leading-relaxed flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-5 text-sm text-[#5a5550] group-hover:text-[#8a8580] transition-colors duration-200">
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
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
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a5550] mb-3">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#e8e4df] mb-8">
            Why AV Toolbox?
          </h2>
          <div className="space-y-5 text-sm text-[#8a8580] leading-[1.8]">
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
