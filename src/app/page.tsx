import { tools, categories } from '@/lib/tools-data';
import { getAllBlogPosts } from '@/lib/blog-data';
import { ToolCard } from '@/components/tool-card';
import { NewsletterSignup } from '@/components/newsletter-signup';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';

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
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8">
              <Zap className="w-3.5 h-3.5" />
              {tools.length} free tools — no signup required
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
              Production-Grade{' '}
              <span className="gradient-text">AV Tools</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Free calculators and utilities for live streaming, broadcast, and audio-visual professionals. Used by engineers at studios and venues worldwide.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Always free</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>No data collection</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      {categoryKeys.map(category => {
        const catTools = tools.filter(t => t.category === category);
        const catInfo = categories[category];
        return (
          <section key={category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                {catInfo.label}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                {catInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {catTools.map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} featured={i < 2} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <NewsletterSignup />
      </section>

      {/* Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Latest Resources
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Guides, tutorials, and deep-dives for AV professionals
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {post.readTime} read
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  <span>Read more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
            Why AV Toolbox?
          </h2>
          <div className="space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
            <p>
              AV Toolbox provides free, production-grade calculators and utilities built specifically for live streaming, broadcast, and audio-visual professionals. Every tool is designed to solve real problems that engineers face daily — from calculating optimal bitrates to planning speaker coverage for a venue.
            </p>
            <p>
              Unlike generic online calculators, our tools are built with industry knowledge. The Bitrate Calculator accounts for actual codec efficiency differences. The Stream Delay Calculator models real-world pipeline stages. The Cable Length Estimator uses manufacturer specifications for accurate distance ratings.
            </p>
            <p>
              All tools run entirely in your browser with no data collection, no signup requirements, and no usage limits. They are free to use for personal and professional projects alike.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
