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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Tools</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 dark:text-white font-medium">{tool.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{ background: `linear-gradient(135deg, ${tool.color}15 0%, transparent 60%)` }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${tool.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: tool.color }} />
              </div>
              <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {tool.categoryLabel}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]">
              {tool.name}
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {tool.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <ToolCalculator slug={tool.slug} tool={tool} />
      </section>

      {/* Ad slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Advertisement
        </div>
      </div>

      {/* How to Use */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-10">
          How to Use the {tool.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tool.howTo.map(step => (
            <div key={step.step} className="relative">
              <div className="text-5xl font-extrabold mb-4 leading-none" style={{ color: `${tool.color}25` }}>
                {String(step.step).padStart(2, '0')}
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
              About This Tool
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              {tool.description}
            </p>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              {tool.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-500 dark:text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: tool.color }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Use Cases</h3>
            <ul className="space-y-3">
              {tool.useCases.map((u, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-500 dark:text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-zinc-300 dark:bg-zinc-600" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords/Tags */}
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {tool.keywords.map(kw => (
                <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl space-y-6">
          {tool.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3">
                {item.q}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Related Articles
            </h2>
            <Link href="/blog" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">{post.readTime} read</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <NewsletterSignup />
      </section>

      {/* Related Tools */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-8">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map(t => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
