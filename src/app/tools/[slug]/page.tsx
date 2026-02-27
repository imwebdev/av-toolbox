import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { tools, getToolBySlug, getRelatedTools } from '@/lib/tools-data';
import { getBlogPostsByTool } from '@/lib/blog-data';
import { ToolCalculator } from '@/components/tool-calculators';
import { ToolCard } from '@/components/tool-card';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  const Icon = icons[iconName];
  return Icon || LucideIcons.Wrench;
}

export async function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} — Free Online ${tool.categoryLabel} Tool`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | AV Toolbox`,
      description: tool.tagline,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);
  const articles = getBlogPostsByTool(tool.slug);
  const Icon = getIcon(tool.icon);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `https://avtoolbox.aibuildmastery.com/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumbs */}
      <div className="section-container" style={{ paddingTop: '16px' }}>
        <nav className="flex items-center text-sm text-[#6a6560]" style={{ gap: '6px' }}>
          <Link href="/" className="hover:text-[#e8e4df] transition-colors">Home</Link>
          <ChevronRight style={{ width: '14px', height: '14px' }} />
          <span>Tools</span>
          <ChevronRight style={{ width: '14px', height: '14px' }} />
          <span className="text-[#e8e4df] font-medium">{tool.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${tool.color}15 0%, transparent 60%)` }} />

        <div className="relative section-container" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
          <div className="max-w-3xl">
            <div className="flex items-center" style={{ gap: '12px', marginBottom: '24px' }}>
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${tool.color}15`, width: '48px', height: '48px' }}
              >
                <Icon style={{ width: '24px', height: '24px', color: tool.color }} />
              </div>
              <span
                className="text-sm font-medium rounded-full bg-[#1e1e1e] text-[#8a8580]"
                style={{ padding: '4px 12px' }}
              >
                {tool.categoryLabel}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f0ece8] leading-[1.1]" style={{ marginBottom: '16px' }}>
              {tool.name}
            </h1>
            <p className="text-lg text-[#7a756f] leading-relaxed max-w-2xl">
              {tool.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-container" style={{ paddingBottom: '3rem' }}>
        <ToolCalculator slug={tool.slug} tool={tool} />
      </section>

      {/* Ad slot */}
      <div className="section-container" style={{ paddingBottom: '2rem' }}>
        <div
          className="rounded-xl border border-dashed border-[#2a2a2a] bg-[#191919] text-center text-xs text-[#4a4540]"
          style={{ padding: '16px' }}
        >
          Advertisement
        </div>
      </div>

      {/* How to Use */}
      <section className="section-container border-t border-[#1e1e1e]" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f0ece8]" style={{ marginBottom: '2.5rem' }}>
          How to Use the {tool.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
          {tool.howTo.map(step => (
            <div key={step.step} className="relative">
              <div className="text-5xl font-extrabold leading-none" style={{ color: `${tool.color}25`, marginBottom: '16px' }}>
                {String(step.step).padStart(2, '0')}
              </div>
              <h3 className="text-base font-bold text-[#f0ece8]" style={{ marginBottom: '8px' }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#7a756f] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Description */}
      <section className="section-container border-t border-[#1e1e1e]" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '48px' }}>
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0ece8]" style={{ marginBottom: '24px' }}>
              About This Tool
            </h2>
            <p className="text-[#7a756f] leading-relaxed" style={{ marginBottom: '24px' }}>
              {tool.description}
            </p>

            <h3 className="text-lg font-bold text-[#f0ece8]" style={{ marginBottom: '16px' }}>Key Features</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {tool.features.map((f, i) => (
                <li key={i} className="flex items-start text-[#7a756f]" style={{ gap: '12px' }}>
                  <div className="rounded-full flex-shrink-0" style={{ backgroundColor: tool.color, width: '6px', height: '6px', marginTop: '8px' }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-[#f0ece8]" style={{ marginBottom: '16px' }}>Use Cases</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tool.useCases.map((u, i) => (
                <li key={i} className="flex items-start text-[#7a756f]" style={{ gap: '12px' }}>
                  <div className="rounded-full bg-[#3a3a3a] flex-shrink-0" style={{ width: '6px', height: '6px', marginTop: '8px' }} />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords/Tags */}
          <div>
            <h3 className="text-lg font-bold text-[#f0ece8]" style={{ marginBottom: '16px' }}>Related Topics</h3>
            <div className="flex flex-wrap" style={{ gap: '8px' }}>
              {tool.keywords.map(kw => (
                <span
                  key={kw}
                  className="text-xs rounded-full bg-[#1e1e1e] text-[#6a6560]"
                  style={{ padding: '4px 12px' }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container border-t border-[#1e1e1e]" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f0ece8]" style={{ marginBottom: '2.5rem' }}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tool.faq.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#232323] bg-[#191919]"
              style={{ padding: '24px' }}
            >
              <h3 className="text-base font-bold text-[#f0ece8]" style={{ marginBottom: '10px' }}>
                {item.q}
              </h3>
              <p className="text-sm text-[#7a756f] leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {articles.length > 0 && (
        <section className="section-container border-t border-[#1e1e1e]" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0ece8]">
              Related Articles
            </h2>
            <Link href="/blog" className="flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors" style={{ gap: '6px' }}>
              View all
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
            {articles.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article
                  className="overflow-hidden rounded-2xl border border-[#232323] bg-[#191919] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/40 group-hover:border-[#383838] h-full flex flex-col"
                  style={{ padding: '24px' }}
                >
                  <div className="flex items-center" style={{ gap: '8px', marginBottom: '12px' }}>
                    <BookOpen className="text-emerald-500" style={{ width: '16px', height: '16px' }} />
                    <span className="text-xs text-[#5a5550]">{post.readTime} read</span>
                  </div>
                  <h3
                    className="font-semibold text-[#f0ece8] group-hover:text-white transition-colors leading-snug"
                    style={{ fontSize: '16px', marginBottom: '8px' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#7a756f] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div
                    className="flex items-center text-sm font-medium text-[#5a5550] group-hover:text-[#e8e4df] transition-colors"
                    style={{ marginTop: '16px', gap: '6px' }}
                  >
                    Read article
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: '14px', height: '14px' }} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="section-container" style={{ paddingTop: '3rem', paddingBottom: '3.5rem' }}>
        <NewsletterSignup />
      </section>

      {/* Related Tools */}
      {related.length > 0 && (
        <section className="section-container border-t border-[#1e1e1e]" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f0ece8]" style={{ marginBottom: '2rem' }}>
            Related Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
            {related.map(t => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
