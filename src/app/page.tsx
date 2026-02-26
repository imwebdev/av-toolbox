"use client";

import { useState, useRef, useEffect } from "react";
import {
  Timer,
  Activity,
  Scan,
  Radio,
  Clock,
  Subtitles,
  AudioLines,
  RectangleHorizontal,
  Cable,
  Volume2,
  Wrench,
  ChevronUp,
} from "lucide-react";
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

const TOOLS = [
  { id: "stream-delay", label: "Stream Delay", icon: Timer, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "bitrate", label: "Bitrate", icon: Activity, color: "text-violet-400", bg: "bg-violet-500/10" },
  { id: "safe-area", label: "Safe Area", icon: Scan, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "rtmp", label: "RTMP Builder", icon: Radio, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: "countdown", label: "Countdown", icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" },
  { id: "lower-third", label: "Lower Third", icon: Subtitles, color: "text-pink-400", bg: "bg-pink-500/10" },
  { id: "audio-delay", label: "Audio Delay", icon: AudioLines, color: "text-orange-400", bg: "bg-orange-500/10" },
  { id: "aspect-ratio", label: "Aspect Ratio", icon: RectangleHorizontal, color: "text-sky-400", bg: "bg-sky-500/10" },
  { id: "cable-length", label: "Cable Length", icon: Cable, color: "text-lime-400", bg: "bg-lime-500/10" },
  { id: "speaker", label: "Speaker", icon: Volume2, color: "text-indigo-400", bg: "bg-indigo-500/10" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10">
                <Wrench className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight">
                  AV Toolbox
                </h1>
                <p className="text-[10px] text-zinc-500 -mt-0.5">
                  Production Calculator Suite
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-600">
              <span className="px-2 py-1 rounded bg-white/[0.03] border border-white/[0.04]">
                {TOOLS.length} tools
              </span>
            </div>
          </div>
        </div>

        {/* Tool Navigation */}
        <div className="border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeSection === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => scrollTo(tool.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? `${tool.bg} ${tool.color}`
                        : "text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-zinc-400">
              Free tools for AV & streaming professionals
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Production-Grade
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Calculator Suite
            </span>
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Bitrate, delay, safe areas, RTMP, countdowns, lower thirds, and more.
            Everything a live production engineer needs, all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {TOOLS.slice(0, 5).map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => scrollTo(tool.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${tool.bg} ${tool.color} border border-current/10 hover:border-current/20 transition-all text-sm`}
                >
                  <Icon className="w-4 h-4" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-6">
        {/* Tier 1: Core Streaming */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-1">
            Core Streaming Tools
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              id="stream-delay"
              ref={(el) => { sectionRefs.current["stream-delay"] = el; }}
            >
              <StreamDelayCalculator />
            </div>
            <div
              id="bitrate"
              ref={(el) => { sectionRefs.current["bitrate"] = el; }}
            >
              <BitrateCalculator />
            </div>
          </div>
        </div>

        {/* Tier 2: Production */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-1">
            Production & Broadcast
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              id="safe-area"
              ref={(el) => { sectionRefs.current["safe-area"] = el; }}
            >
              <SafeAreaOverlay />
            </div>
            <div
              id="rtmp"
              ref={(el) => { sectionRefs.current["rtmp"] = el; }}
            >
              <RtmpUrlBuilder />
            </div>
            <div
              id="countdown"
              ref={(el) => { sectionRefs.current["countdown"] = el; }}
            >
              <CountdownGenerator />
            </div>
            <div
              id="lower-third"
              ref={(el) => { sectionRefs.current["lower-third"] = el; }}
            >
              <LowerThirdBuilder />
            </div>
          </div>
        </div>

        {/* Tier 3: AV Engineering */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-zinc-600 uppercase tracking-wider px-1">
            AV Engineering
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              id="audio-delay"
              ref={(el) => { sectionRefs.current["audio-delay"] = el; }}
            >
              <AudioDelayCalculator />
            </div>
            <div
              id="aspect-ratio"
              ref={(el) => { sectionRefs.current["aspect-ratio"] = el; }}
            >
              <AspectRatioCalculator />
            </div>
            <div
              id="cable-length"
              ref={(el) => { sectionRefs.current["cable-length"] = el; }}
            >
              <CableLengthEstimator />
            </div>
            <div
              id="speaker"
              ref={(el) => { sectionRefs.current["speaker"] = el; }}
            >
              <SpeakerCoverageCalculator />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-zinc-600">
            AV Toolbox — Free production tools for streaming & broadcast professionals
          </p>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-all z-50 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronUp className="w-4 h-4" />
      </button>
    </div>
  );
}
