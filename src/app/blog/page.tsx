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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#141414] to-[#141414]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-emerald-500/[0.04] via-teal-500/[0.02] to-transparent rounded-full blur-3xl" />

        <div className="relative section-container" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
          <div className="max-w-2xl">
            <div className="flex items-center" style={{ gap: '10px', marginBottom: '1.5rem' }}>
              <BookOpen className="text-emerald-500" style={{ width: '16px', height: '16px' }} />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#5a5550] font-semibold">
                {posts.length} articles
              </span>
            </div>
            <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold text-[#f0ece8] leading-[1.1] tracking-[-0.02em]" style={{ marginBottom: '1rem' }}>
              Resources & Guides
            </h1>
            <p className="text-base sm:text-lg text-[#7a756f] leading-relaxed">
              Practical guides, tutorials, and deep-dives for live streaming, broadcast, and AV professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-container" style={{ paddingTop: '0', paddingBottom: '5rem' }}>
        {/* Desktop: grid cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article
                className="relative overflow-hidden rounded-2xl border border-[#232323] bg-[#191919] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/40 group-hover:border-[#383838] h-full flex flex-col"
              >
                {/* Color accent */}
                <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:h-1.5" />

                <div className="flex flex-col flex-1" style={{ padding: '24px 24px 22px' }}>
                  <div className="flex items-center" style={{ gap: '10px', marginBottom: '16px' }}>
                    <span className="text-[11px] text-[#5a5550] uppercase tracking-[0.15em] font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[#2a2a2a]">&middot;</span>
                    <span className="text-[11px] text-[#4a4540]">
                      {post.readTime} read
                    </span>
                  </div>

                  <h2
                    className="font-semibold text-[#f0ece8] leading-snug group-hover:text-white transition-colors duration-200"
                    style={{ fontSize: '16px', marginBottom: '8px' }}
                  >
                    {post.title}
                  </h2>

                  <p className="text-[13px] text-[#7a756f] leading-relaxed flex-1 line-clamp-2" style={{ marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap" style={{ gap: '6px' }}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] rounded-full bg-[#1e1e1e] text-[#6a6560] font-medium"
                          style={{ padding: '2px 8px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      className="text-[#5a5550] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#e8e4df] flex-shrink-0"
                      style={{ width: '16px', height: '16px' }}
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile: clean list layout */}
        <div className="md:hidden" style={{ borderTop: '1px solid #1e1e1e' }}>
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
              style={{
                padding: '20px 0',
                borderBottom: idx < posts.length - 1 ? '1px solid #1e1e1e' : 'none',
              }}
            >
              <article className="flex flex-col" style={{ gap: '10px' }}>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                    {post.category}
                  </span>
                  <span className="text-[#2a2a2a]">&middot;</span>
                  <span className="text-xs text-[#4a4540]">
                    {post.readTime} read
                  </span>
                </div>

                <h2 className="text-[17px] font-semibold text-[#f0ece8] leading-snug group-active:text-white transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-[#7a756f] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between" style={{ paddingTop: '4px' }}>
                  <div className="flex flex-wrap" style={{ gap: '6px' }}>
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[11px] rounded-full bg-[#1e1e1e] text-[#6a6560] font-medium"
                        style={{ padding: '2px 8px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight
                    className="text-[#5a5550] flex-shrink-0 opacity-40 group-active:opacity-100 transition-opacity"
                    style={{ width: '16px', height: '16px' }}
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
