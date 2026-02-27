import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getBlogPostBySlug } from '@/lib/blog-data';
import { getToolBySlug } from '@/lib/tools-data';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ChevronRight, ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

function getIcon(iconName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  const Icon = icons[iconName];
  return Icon || LucideIcons.Wrench;
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  function flushList() {
    if (listItems.length > 0 && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={`list-${i}`} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' }} className={listType === 'ul' ? 'list-disc' : 'list-decimal'}>
          {listItems.map((item, idx) => (
            <li key={idx} className="text-[#b0aca8] leading-relaxed">{renderInline(item)}</li>
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-semibold text-[#f0ece8]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="text-sm rounded bg-[#1e1e1e] text-[#b0aca8] font-mono" style={{ padding: '2px 6px' }}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={i} className="text-2xl font-bold text-[#f0ece8]" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={i} className="text-xl font-semibold text-[#f0ece8]" style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>{line.slice(4)}</h3>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType !== 'ul') flushList();
      listType = 'ul';
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') flushList();
      listType = 'ol';
      listItems.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.startsWith('| ') && lines[i + 1]?.startsWith('|')) {
      flushList();
      // Simple table rendering
      const rows: string[][] = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith('|')) {
        const cells = lines[j].split('|').filter(c => c.trim()).map(c => c.trim());
        if (!lines[j].includes('---')) {
          rows.push(cells);
        }
        j++;
      }
      if (rows.length > 0) {
        elements.push(
          <div key={i} className="overflow-x-auto" style={{ marginBottom: '1.5rem' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {rows[0].map((cell, ci) => (
                    <th key={ci} className="text-left text-sm font-semibold text-[#f0ece8] border-b border-[#2a2a2a]" style={{ padding: '12px 16px' }}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="text-sm text-[#8a8580] border-b border-[#1e1e1e]" style={{ padding: '12px 16px' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      i = j - 1;
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      elements.push(<p key={i} className="text-[#b0aca8] leading-relaxed" style={{ marginBottom: '1rem' }}>{renderInline(line)}</p>);
    }
    i++;
  }
  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const tool = getToolBySlug(post.toolSlug);
  const Icon = tool ? getIcon(tool.icon) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'AV Toolbox' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto" style={{ paddingTop: '16px', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <nav className="flex items-center text-sm text-[#6a6560]" style={{ gap: '6px' }}>
          <Link href="/" className="hover:text-[#e8e4df] transition-colors">Home</Link>
          <ChevronRight style={{ width: '14px', height: '14px' }} />
          <Link href="/blog" className="hover:text-[#e8e4df] transition-colors">Blog</Link>
          <ChevronRight style={{ width: '14px', height: '14px' }} />
          <span className="text-[#e8e4df] font-medium truncate">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto" style={{ padding: '2rem 2rem 3rem' }}>
        {/* Header */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div className="flex items-center" style={{ gap: '8px', marginBottom: '20px' }}>
            <span
              className="text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400"
              style={{ padding: '4px 12px' }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f0ece8] leading-[1.15]" style={{ marginBottom: '20px' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-[#6a6560]" style={{ gap: '16px' }}>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <User style={{ width: '14px', height: '14px' }} />
              {post.author}
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <Calendar style={{ width: '14px', height: '14px' }} />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <Clock style={{ width: '14px', height: '14px' }} />
              {post.readTime} read
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-none">
          {renderMarkdown(post.content)}
        </div>

        {/* Related tool CTA */}
        {tool && (
          <div
            className="rounded-2xl border border-[#232323] bg-[#191919]"
            style={{ marginTop: '3rem', padding: '24px 28px' }}
          >
            <div className="flex items-start" style={{ gap: '16px' }}>
              {Icon && (
                <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tool.color}15`, width: '48px', height: '48px' }}>
                  <Icon style={{ width: '24px', height: '24px', color: tool.color }} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#f0ece8]" style={{ marginBottom: '4px' }}>
                  Try the {tool.name}
                </h3>
                <p className="text-sm text-[#7a756f]" style={{ marginBottom: '16px' }}>
                  {tool.tagline}
                </p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center text-sm font-medium transition-colors"
                  style={{ color: tool.color, gap: '6px' }}
                >
                  Open tool
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap" style={{ marginTop: '2rem', gap: '8px' }}>
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs rounded-full bg-[#1e1e1e] text-[#6a6560]"
              style={{ padding: '4px 12px' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Navigation */}
        <div className="border-t border-[#1e1e1e] flex justify-between" style={{ marginTop: '3rem', paddingTop: '2rem' }}>
          <Link href="/blog" className="flex items-center text-sm font-medium text-[#6a6560] hover:text-[#e8e4df] transition-colors" style={{ gap: '6px' }}>
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            All articles
          </Link>
        </div>
      </article>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto" style={{ padding: '0 2rem 3.5rem' }}>
        <NewsletterSignup />
      </section>
    </>
  );
}
