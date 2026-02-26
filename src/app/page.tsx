import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORIES, getToolsByCategory } from "@/lib/tools-data";

export default function Home() {
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
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs text-[#425466]">
                {TOOLS.length} free tools
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f9fc] via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-indigo-100/40 via-purple-100/30 to-pink-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0a2540] leading-[1.1]">
            Production-Grade{" "}
            <span className="gradient-text">AV Tools</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#425466] max-w-2xl mx-auto leading-relaxed">
            Free calculators and utilities for live streaming, broadcast, and AV
            professionals.
          </p>

          {/* Stats Banner */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3 rounded-full bg-[#f6f9fc] border border-[#e3e8ee]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#0a2540]">
                {TOOLS.length} free tools
              </span>
            </div>
            <div className="w-px h-4 bg-[#e3e8ee] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#425466]">
                Used by broadcast professionals
              </span>
            </div>
            <div className="w-px h-4 bg-[#e3e8ee] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#425466]">
                No sign-up required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Directory */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {CATEGORIES.map((category) => {
          const categoryTools = getToolsByCategory(category);
          return (
            <section key={category} className="mb-16">
              <div className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#425466]">
                  {category}
                </h2>
                <div className="mt-2 h-px bg-[#e3e8ee]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group tool-directory-card block rounded-xl border border-[#e3e8ee] bg-white p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg ${tool.accentBg} ${tool.accentColor} shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-semibold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                            {tool.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#425466] leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#635bff] opacity-0 group-hover:opacity-100 transition-opacity">
                        Open tool
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e3e8ee] bg-[#f6f9fc]">
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
