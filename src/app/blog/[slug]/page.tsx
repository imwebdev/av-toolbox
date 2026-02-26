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
        <Tag key={`list-${i}`} className={listType === 'ul' ? 'list-disc pl-6 mb-4 space-y-1' : 'list-decimal pl-6 mb-4 space-y-1'}>
          {listItems.map((item, idx) => (
            <li key={idx} className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{renderInline(item)}</li>
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
        return <strong key={idx} className="font-semibold text-zinc-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="text-sm px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={i} className="text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={i} className="text-xl font-semibold text-zinc-900 dark:text-white mt-8 mb-3">{line.slice(4)}</h3>);
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
          <div key={i} className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {rows[0].map((cell, ci) => (
                    <th key={ci} className="text-left text-sm font-semibold text-zinc-900 dark:text-white px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="text-sm text-zinc-600 dark:text-zinc-300 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">{cell}</td>
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
      elements.push(<p key={i} className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">{renderInline(line)}</p>);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 dark:text-white font-medium truncate">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-5 leading-[1.15]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
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
          <div className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              {Icon && (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${tool.color}15` }}>
                  <Icon className="w-6 h-6" style={{ color: tool.color }} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Try the {tool.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  {tool.tagline}
                </p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{ color: tool.color }}
                >
                  Open tool
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {tag}
            </span>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
        </div>
      </article>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <NewsletterSignup />
      </section>
    </>
  );
}
