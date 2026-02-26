import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog-data';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — AV Production Resources & Guides',
  description: 'Guides, tutorials, and deep-dives on live streaming, broadcast production, and AV engineering. Learn from industry professionals.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'AV Toolbox Blog',
            description: 'Guides, tutorials, and deep-dives on live streaming, broadcast production, and AV engineering.',
            url: 'https://avtoolbox.aibuildmastery.com/blog',
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-24 pb-8 sm:pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-700 dark:text-blue-300 mb-4 sm:mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              {posts.length} articles
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3 sm:mb-4 leading-[1.1]">
              Resources & Guides
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Practical guides, tutorials, and deep-dives for live streaming, broadcast, and AV professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Posts list */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-12 sm:py-16">
        {/* Mobile: stacked list with dividers | Desktop: grid cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {post.readTime} read
                  </span>
                </div>

                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-500 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile: clean list layout */}
        <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-5 first:pt-0">
              <article className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {post.readTime} read
                  </span>
                </div>

                <h2 className="text-[17px] font-bold text-zinc-900 dark:text-white leading-snug group-active:text-blue-600 dark:group-active:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 opacity-40 group-active:opacity-100 transition-opacity" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
