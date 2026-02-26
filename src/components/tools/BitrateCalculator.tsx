"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Activity } from "lucide-react";

const RESOLUTIONS = [
  { label: "720p", width: 1280, height: 720 },
  { label: "1080p", width: 1920, height: 1080 },
  { label: "1440p", width: 2560, height: 1440 },
  { label: "4K", width: 3840, height: 2160 },
];

const FPS_OPTIONS = [24, 25, 30, 50, 60];

const CODECS = [
  { label: "H.264", factor: 1.0 },
  { label: "H.265/HEVC", factor: 0.6 },
  { label: "AV1", factor: 0.5 },
  { label: "VP9", factor: 0.65 },
];

const QUALITY_LEVELS = [
  { label: "Low", factor: 0.06 },
  { label: "Medium", factor: 0.1 },
  { label: "High", factor: 0.15 },
  { label: "Ultra", factor: 0.2 },
];

export default function BitrateCalculator() {
  const [resolution, setResolution] = useState(1);
  const [fps, setFps] = useState(4);
  const [codec, setCodec] = useState(0);
  const [quality, setQuality] = useState(2);

  const calculate = useCallback(() => {
    const res = RESOLUTIONS[resolution];
    const fpsVal = FPS_OPTIONS[fps];
    const codecFactor = CODECS[codec].factor;
    const qualityFactor = QUALITY_LEVELS[quality].factor;

    const rawBitrate = res.width * res.height * fpsVal * qualityFactor * codecFactor;
    const videoBitrate = rawBitrate / 1_000_000;
    const audioBitrate = 0.128;
    const totalBitrate = videoBitrate + audioBitrate;
    const uploadSpeed = totalBitrate * 1.3;

    return {
      videoBitrate: videoBitrate.toFixed(1),
      audioBitrate: "128",
      totalBitrate: totalBitrate.toFixed(1),
      uploadSpeed: uploadSpeed.toFixed(1),
    };
  }, [resolution, fps, codec, quality]);

  const result = calculate();

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Bitrate Calculator
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Recommended bitrate for resolution, FPS & codec
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Resolution</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {RESOLUTIONS.map((res, i) => (
                <button
                  key={res.label}
                  onClick={() => setResolution(i)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    resolution === i
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {res.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Frame Rate</Label>
            <div className="grid grid-cols-5 gap-1.5">
              {FPS_OPTIONS.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setFps(i)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    fps === i
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {f}fps
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Codec</Label>
              <div className="grid grid-cols-1 gap-1.5">
                {CODECS.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setCodec(i)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all text-left ${
                      codec === i
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                        : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Quality</Label>
              <div className="grid grid-cols-1 gap-1.5">
                {QUALITY_LEVELS.map((q, i) => (
                  <button
                    key={q.label}
                    onClick={() => setQuality(i)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all text-left ${
                      quality === i
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                        : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-violet-500/[0.06] border border-violet-500/10 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500">Video Bitrate</p>
              <p className="text-xl font-mono font-bold text-violet-400">
                {result.videoBitrate}
                <span className="text-sm font-normal text-zinc-500 ml-1">Mbps</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Audio Bitrate</p>
              <p className="text-xl font-mono font-bold text-violet-400">
                {result.audioBitrate}
                <span className="text-sm font-normal text-zinc-500 ml-1">kbps</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Total Bitrate</p>
              <p className="text-xl font-mono font-bold text-white">
                {result.totalBitrate}
                <span className="text-sm font-normal text-zinc-500 ml-1">Mbps</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Min Upload Speed</p>
              <p className="text-xl font-mono font-bold text-emerald-400">
                {result.uploadSpeed}
                <span className="text-sm font-normal text-zinc-500 ml-1">Mbps</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
