import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Wrench, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { TOOLS, getToolBySlug } from "@/lib/tools-data";

import StreamDelayCalculator from "@/components/tools/StreamDelayCalculator";
import BitrateCalculator from "@/components/tools/BitrateCalculator";
import SafeAreaOverlay from "@/components/tools/SafeAreaOverlay";
import RtmpUrlBuilder from "@/components/tools/RtmpUrlBuilder";
import CountdownGenerator from "@/components/tools/CountdownGenerator";
import LowerThirdBuilder from "@/components/tools/LowerThirdBuilder";
import AudioDelayCalculator from "@/components/tools/AudioDelayCalculator";
import AspectRatioCalculator from "@/components/tools/AspectRatioCalculator";
import CableLengthEstimator from "@/components/tools/CableLengthEstimator";
import SpeakerCoverageCalculator from "@/components/tools/SpeakerCoverageCalculator";

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  "stream-delay-calculator": StreamDelayCalculator,
  "bitrate-calculator": BitrateCalculator,
  "safe-area-overlay": SafeAreaOverlay,
  "rtmp-url-builder": RtmpUrlBuilder,
  "countdown-generator": CountdownGenerator,
  "lower-third-builder": LowerThirdBuilder,
  "audio-delay-calculator": AudioDelayCalculator,
  "aspect-ratio-calculator": AspectRatioCalculator,
  "cable-length-estimator": CableLengthEstimator,
  "speaker-coverage-calculator": SpeakerCoverageCalculator,
};

export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | AV Toolbox`,
      description: tool.description,
      type: "website",
      siteName: "AV Toolbox",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | AV Toolbox`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = TOOL_COMPONENTS[slug];

  if (!ToolComponent) {
    notFound();
  }

  const Icon = tool.icon;

  // Get other tools for the "More tools" section, excluding the current one
  const otherTools = TOOLS.filter((t) => t.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e3e8ee]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#635bff]/10">
                <Wrench className="w-4 h-4 text-[#635bff]" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#0a2540] tracking-tight">
                  AV Toolbox
                </span>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-[#425466] hover:text-[#0a2540] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All tools
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-[#f6f9fc] border-b border-[#e3e8ee]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-[#425466]">
            <Link
              href="/"
              className="hover:text-[#0a2540] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#8792a2]" />
            <span className="text-[#8792a2]">Tools</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8792a2]" />
            <span className="text-[#0a2540] font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <section className="pt-10 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${tool.accentBg} ${tool.accentColor} shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#425466]">
                {tool.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0a2540] tracking-tight mt-1">
                {tool.name}
              </h1>
              <p className="mt-2 text-[#425466] max-w-2xl">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Component - Dark container to preserve existing tool styling */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="dark rounded-2xl bg-[#09090b] p-4 sm:p-6">
            <ToolComponent />
          </div>
        </div>
      </section>

      {/* SEO Content / Long Description */}
      <section className="pb-16 border-t border-[#e3e8ee]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
          <h2 className="text-xl font-bold text-[#0a2540] mb-4">
            About this tool
          </h2>
          <div className="text-[#425466] leading-relaxed space-y-4">
            {tool.longDescription.split(". ").reduce<string[][]>(
              (acc, sentence, i) => {
                const paragraphIndex = Math.floor(i / 3);
                if (!acc[paragraphIndex]) acc[paragraphIndex] = [];
                acc[paragraphIndex].push(sentence);
                return acc;
              },
              []
            ).map((sentences, i) => (
              <p key={i}>{sentences.join(". ")}{sentences[sentences.length - 1].endsWith(".") ? "" : "."}</p>
            ))}
          </div>

          {/* Keywords as tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {tool.keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f6f9fc] text-[#425466] border border-[#e3e8ee]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Other Tools */}
      <section className="pb-20 bg-[#f6f9fc] border-t border-[#e3e8ee]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0a2540]">More tools</h2>
            <Link
              href="/"
              className="flex items-center gap-1 text-sm font-medium text-[#635bff] hover:text-[#4b45c6] transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherTools.map((otherTool) => {
              const OtherIcon = otherTool.icon;
              return (
                <Link
                  key={otherTool.slug}
                  href={`/tools/${otherTool.slug}`}
                  className="group tool-directory-card block rounded-xl border border-[#e3e8ee] bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg ${otherTool.accentBg} ${otherTool.accentColor} shrink-0`}
                    >
                      <OtherIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                        {otherTool.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#425466] leading-relaxed line-clamp-2">
                        {otherTool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e3e8ee] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#635bff]/10">
                <Wrench className="w-3.5 h-3.5 text-[#635bff]" />
              </div>
              <span className="text-sm font-semibold text-[#0a2540]">
                AV Toolbox
              </span>
            </div>
            <p className="text-sm text-[#425466]">
              Free production tools for streaming & broadcast professionals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
